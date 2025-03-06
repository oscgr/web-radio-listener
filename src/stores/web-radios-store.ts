import { acceptHMRUpdate, defineStore } from "pinia";
import { isBoolean, max } from "lodash-es";
import { useLocalStorage } from "@vueuse/core";

export interface Radio {
  name: string;
  url: string;
  tags: string[];
  favorite: boolean;
  category?: string | undefined;
  imageUrl?: string | undefined;
}

export interface SavedRadio extends Radio {
  id: number;
}

export interface PatchRadio extends Partial<Radio> {
  resetImageUrl?: boolean;
  resetCategory?: boolean;
}

export const useWebRadiosStore = defineStore("web-radios", {
  state: () => ({
    radios: useLocalStorage<SavedRadio[]>("web-radios", []),
    currentlyPlayingId: null as number | null,
  }),

  getters: {
    getRadios: (state) =>
      state.radios.sort((a, b) =>
        new Intl.Collator(navigator.languages).compare(a.name, b.name),
      ),
    filterRadios() {
      return (filter: { name?: string; favorite?: boolean }) =>
        this.getRadios.filter((r) => {
          let match = true;
          if (filter.name) match = contains(r.name, filter.name);

          return (
            match &&
            (isBoolean(filter.favorite) ? r.favorite === filter.favorite : true)
          );
        });
    },
    getCurrentlyPlayingRadio: (state) =>
      state.radios.find((r) => r.id === state.currentlyPlayingId),
    getRadioById: (state) => {
      return (id: number) =>
        state.radios.find((r) => r.id === id) as SavedRadio;
    },
  },

  actions: {
    setCurrentlyPlaying(id: number | null) {
      this.currentlyPlayingId = id;
    },
    addRadio(radio: Radio) {
      this.radios.push({
        ...radio,
        id: (max(this.radios.map(({ id }) => id)) || 0) + 1,
      });
    },
    editRadio(id: number, patchRadio: PatchRadio) {
      if (this.radios.every((r) => r.id !== id))
        throw new Error(`${id} is not a valid value`);
      this.radios = this.radios.map((r) => {
        if (r.id === id) {
          return {
            id,
            name: patchRadio.name || r.name,
            url: patchRadio.url || r.url,
            favorite: isBoolean(patchRadio.favorite)
              ? patchRadio.favorite
              : r.favorite,
            tags: patchRadio.tags || r.tags,
            imageUrl: patchRadio.resetImageUrl
              ? undefined
              : patchRadio.imageUrl || r.imageUrl,
            category: patchRadio.resetCategory
              ? undefined
              : patchRadio.category || r.category,
          } satisfies SavedRadio;
        } else {
          return r;
        }
      });
    },
    deleteRadio(id: number) {
      if (this.radios.every((r) => r.id !== id))
        throw new Error(`${id} is not a valid value`);

      this.radios = this.radios.filter((r) => r.id !== id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWebRadiosStore, import.meta.hot));
}

function contains(string: string, substring: string) {
  if (substring.length === 0) {
    return true;
  }
  string = string.normalize("NFC");
  substring = substring.normalize("NFC");
  let scan = 0;
  for (; scan + substring.length <= string.length; scan += 1) {
    const slice = string.slice(scan, scan + substring.length);
    if (
      new Intl.Collator(navigator.languages, {
        sensitivity: "base",
        usage: "search",
      }).compare(substring, slice) === 0
    ) {
      return true;
    }
  }
  return false;
}

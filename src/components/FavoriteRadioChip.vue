<template>
  <q-chip
    color="primary"
    text-color="white"
    :key="radio.id"
    @click="togglePlay()"
    clickable
  >
    <div v-text="radio.name"></div>
    <q-icon
      class="q-ml-sm"
      :name="isCurrentlyPlaying ? 'stop' : 'play_arrow'"
    ></q-icon>
  </q-chip>
</template>
<script lang="ts" setup>
import { useWebRadiosStore } from "stores/web-radios-store";
import { computed } from "vue";

const { id } = defineProps<{ id: number }>();

const webRadioStore = useWebRadiosStore();

const radio = computed(() => webRadioStore.getRadioById(id));

const togglePlay = () => {
  if (isCurrentlyPlaying.value) webRadioStore.setCurrentlyPlaying(null);
  else webRadioStore.setCurrentlyPlaying(id);
};

const isCurrentlyPlaying = computed(
  () => webRadioStore.currentlyPlayingId === id,
);
</script>

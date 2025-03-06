<template>
  <q-page class="row justify-evenly q-mt-lg">
    <div class="col-4 offset-4">
      <q-input
        v-model="search"
        debounce="200"
        rounded
        outlined
        placeholder="Search"
        :disable="nbAllRadios === 0"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="col-4" v-show="nbAllRadios > 0">
      <div class="q-pl-lg">
        <q-btn
          outline
          disable
          rounded
          color="primary"
          :label="t('views.home.searchWebRadios')"
          class="q-mr-sm"
        />
        <q-btn
          outline
          rounded
          disable
          color="primary"
          class="q-ml-sm"
          :label="t('views.home.addCustomWebRadio')"
        />
      </div>
    </div>
    <div class="col-4 offset-4" v-show="favoriteRadios.length > 0">
      <FavoriteRadioChip
        :id="favoriteRadio.id"
        :key="favoriteRadio.id"
        v-for="favoriteRadio in favoriteRadios"
      />
    </div>
    <div class="col-4" />

    <div class="col-3" v-for="radio in radios" :key="radio.id">
      <radio-card :id="radio.id" />
    </div>
    <div class="col-12 text-center" v-show="nbAllRadios === 0">
      <div class="text-subtitle1 q-mb-lg" v-text="t('views.home.noRadio')" />
    </div>
    <div class="col-12 text-center" v-show="nbFilteredRadios === 0">
      <div
        class="text-subtitle1 q-mb-lg"
        v-text="t('views.home.noFilteredRadio')"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import RadioCard from "components/RadioCard.vue";
import { useWebRadiosStore } from "stores/web-radios-store";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { trim } from "lodash-es";
import FavoriteRadioChip from "components/FavoriteRadioChip.vue";
const { t } = useI18n();

const search = ref("");
const webRadioStore = useWebRadiosStore();

const radios = computed(() =>
  !!trim(search.value) && trim(search.value) !== ""
    ? webRadioStore.filterRadios({ name: trim(search.value) })
    : webRadioStore.getRadios,
);

const favoriteRadios = computed(() =>
  webRadioStore.filterRadios({ favorite: true }),
);

const nbAllRadios = computed(() => webRadioStore.getRadios.length);
const nbFilteredRadios = computed(() => radios.value.length);
</script>

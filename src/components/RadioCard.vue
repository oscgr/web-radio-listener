<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6" v-text="webRadio.name" />
    </q-card-section>

    <q-separator />

    <q-card-actions align="center">
      <q-btn round flat icon="play_arrow" />
      <q-btn
        :color="webRadio.favorite ? 'red' : ''"
        round
        flat
        :icon="webRadio.favorite ? 'favorite' : 'favorite_border'"
        @click="webRadiosStore.editRadio(id, { favorite: !webRadio.favorite })"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useWebRadiosStore } from "stores/web-radios-store";

const webRadiosStore = useWebRadiosStore();
const { id } = defineProps<{ id: number }>();

const webRadio = computed(() => webRadiosStore.getRadioById(id));
</script>

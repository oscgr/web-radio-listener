<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title> Web Radio Listener </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      :width="400"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        <q-list>
          <q-item v-for="(item, i) in list" :key="i" clickable v-bind="item">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label><span v-text="item.title"></span></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
      <div class="row">Player</div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QItem } from "quasar";

const list: (QItem["$props"] & {
  title: string;
  icon: string;
  link: string;
})[] = [
  {
    title: "Home",
    icon: "school",
    link: "Home",
  },
  {
    title: "About",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
];

const drawer = ref(false);
const miniState = ref(true);
</script>

<template>
  <v-theme-provider>
    <v-app class="app-wrapper">
      <v-container class="container pt-md-9 pt-6 px-lg-0 px-md-10 px-sm-8 px-5 mx-auto">
        <v-row class="mb-9">
          <GalleryHeader />
        </v-row>

        <v-row class="filters-wrapper mb-11">
          <GalleryFilters />
        </v-row>

        <v-row class="mb-10">
          <GalleryGrid />
        </v-row>

        <v-row>
          <GalleryFooter />
        </v-row>
      </v-container>
    </v-app>
  </v-theme-provider>
</template>

<script setup lang="ts">
import GalleryHeader from '@/components/GalleryHeader.vue';
import GalleryFooter from '@/components/GalleryFooter.vue';
import GalleryFilters from '@/components/GalleryFilters/index.vue';
import GalleryGrid from '@/components/GalleryGrid.vue';
import { useStore } from '@/store';
import { throttle } from '@/ts/utils';
const store = useStore();

const fetchPageThrottled = throttle(store.fetchCurrentPage, 1500);

store.fetchCurrentPage();
store.fetchAuthors();
store.fetchLocations();
</script>

<style lang="scss" scoped>
.app-wrapper {
  min-width: 100dvw;
  min-height: 100dvh;

  min-width: 100svw;
  min-height: 100svh;

  .v-container {
    padding: 0px;
    margin: 0px;
  }

  .container {
    max-width: 1120px;
    min-height: 100%;

    > .v-row {
      padding: 0;
      margin: 0;
    }
  }
}
</style>

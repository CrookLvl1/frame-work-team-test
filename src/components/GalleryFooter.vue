<template>
  <v-container fluid tag="footer">
    <v-pagination
      @update:model-value="pageIndexUpdated"
      :model-value="currentPageIndex"
      v-if="getPaintingsQuantity > 0"
      :length="Math.ceil(getPaintingsQuantity / getPaintingsPerPage)"
      show-first-last-page
    ></v-pagination>
  </v-container>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { computed } from 'vue';
const store = useStore();

const pageIndexUpdated = (pageIndex: number) => store.setFilter('_page', pageIndex);

const getPaintingsQuantity = computed(() => store.getPaintingsQuantity);
const getPaintingsPerPage = computed(() => store.getPaintingsPerPage);
const currentPageIndex = computed(() => store.getCurrentPageIndex);
</script>

<style lang="scss" scoped></style>

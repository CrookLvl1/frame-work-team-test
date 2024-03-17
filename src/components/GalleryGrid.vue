<template>
  <v-container fluid>
    <template v-if="paintings && paintings.length > 0">
      <v-row tag="ul" class="w-100 ga-5 align-center justify-center pa-0 ma-0">
        <v-col tag="li"
          class="column d-flex pa-0 justify-center align-center flex-grow-1 flex-shrink-1"
          v-for="painting in paintings"
          :key="painting.id"
        >
          <PaintingComp :painting="painting" />
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-sheet class="d-flex justify-center pa-10">
        <p v-if="paintings?.length === 0">Картин не найдено :(</p>
        <v-progress-circular v-else indeterminate></v-progress-circular>
      </v-sheet>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { computed } from 'vue';
import PaintingComp from '@/components/PaintingComp.vue';

const store = useStore();

const paintings = computed(() => store.getPaintings);
</script>
<style lang="scss" scoped>
.column {
  max-width: 360px;
  min-width: 280px;
  flex-basis: 280px;
}
</style>

<template>
  <v-container fluid>
    <v-row tag="ul" class="filters ma-0 pa-0 gc-5 gr-4 w-100">
      <v-col tag="li" cols="12" sm="3" class="name-field">
        <v-text-field
          center-affix
          variant="underlined"
          counter="30"
          maxLength="30"
          label="Name"
          @update:model-value="filterChangeHandler('q', $event)"
        ></v-text-field>
      </v-col>

      <v-col tag="li" cols="12" sm="3">
        <GalleryFilterSelect
          :label="'Author'"
          :items="authors"
          @update:model-value="filterChangeHandler('authorId', $event)"
        />
      </v-col>

      <v-col tag="li" cols="12" sm="3">
        <GalleryFilterSelect
          :label="'Location'"
          :items="locations"
          @update:model-value="filterChangeHandler('locationId', $event)"
        />
      </v-col>

      <v-col tag="li" cols="12" sm="3">
        <GalleryDatePanel @date-updated="filterChangeHandler" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { AuthorsOptionArr, FilterKey, FilterTypeFromKey, LocationsOptionArr } from '@/ts/Types';
import { computed } from 'vue';
import GalleryFilterSelect from '@/components/GalleryFilters/GalleryFilterSelect.vue';
import GalleryDatePanel from '@/components/GalleryFilters/GalleryDatePanel.vue';

const store = useStore();

const isKeyThrottled = (key: FilterKey): boolean => key === 'q' || key === 'created_gte' || key === 'created_lte';

const filterChangeHandler = <Key extends FilterKey>(filterKey: Key, value: FilterTypeFromKey<Key> | null) => {
  console.log('handler', filterKey, value);

  store.setFilter(filterKey, value || undefined);

  //if (!(filterKey === '_page'))
  store.setFilter('_page', 1);

  isKeyThrottled(filterKey) ? store.fetchCurrentPageThrottled() : store.fetchCurrentPage();
};

//computed Options arrays
const authors = computed<AuthorsOptionArr>(() =>
  store.getAuthors.map((author) => {
    return { title: author.name, value: author.id };
  }),
);

const locations = computed<LocationsOptionArr>(() =>
  store.getLocations.map((location) => {
    return { title: location.location, value: location.id };
  }),
);
</script>

<style lang="scss" scoped>
ul.filters {
  list-style: none;
  > li {
    min-width: 160px;
    // flex: 1 0 160px;
    // max-height: 45px;
    position: relative;
    padding: 0;
    margin: 0;
  }
}
</style>

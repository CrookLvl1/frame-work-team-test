<template>
  <label>
    <v-select
      @update:model-value="updateModelValue"
      class="custom-select new-styles"
      :menu-props="{ maxWidth: '100%' }"
      :items="items"
      :label="label"
      hide-details
    >
      <template #label="{ label, props }">
        <v-label :props class="custom-select__label">{{ label }} </v-label>
      </template>
      <template #item="{ item, props }">
        <v-list-item class="custom-select__item" :="props"> {{ item.title }}</v-list-item>
      </template>
    </v-select>
  </label>
</template>

<script setup lang="ts" generic="T">
import { PropType } from 'vue';
const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  items: {
    required: true,
    type: Array as PropType<Array<{ title: string; value: T }>>,
  },
});

const emit = defineEmits<{
  'update:model-value': [id: T];
}>();

const updateModelValue = (value: T) => emit('update:model-value', value);
</script>

<style lang="scss" scoped>
.custom-select {
  &__item {
  }
  &__label {
    position: absolute;
  }
}
:global([class*='v-select__content']) {
  border: 1px solid rgb(var(--v-theme-selectBorder));
}
</style>

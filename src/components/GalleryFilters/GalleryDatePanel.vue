<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title expand-icon="mdi-menu-down" collapse-icon="mid-menu-up">Created</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col v-for="key in keys" :key="key">
            <v-text-field
              @keypress="validateInput"
              @update:model-value="dateUpdatedHandler(key, +$event)"
              maxLength="4"
              counter="4"
              center-affix
              variant="underlined"
              hide-spin-buttons
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import { CreatedKeys } from '@/ts/Types';

//initial
const emit = defineEmits<{
  dateUpdated: [CreatedKeys, number | null];
}>();

const numbersRegExp = new RegExp('^[0-9]+$');
const keys: Array<CreatedKeys> = ['created_gte', 'created_lte'];

//function
const validateInput = (ev: KeyboardEvent) => {
  if (!numbersRegExp.test(ev.key)) ev.preventDefault();
};

const dateUpdatedHandler = (key: CreatedKeys, value: number | null) => emit('dateUpdated', key, value);
</script>
<style lang="scss" scoped></style>

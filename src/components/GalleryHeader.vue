<template>
  <v-container fluid tag="header" class="d-flex align-center justify-space-between pa-0 ma-0">
    <img src="@/assets/logo.svg" width="64" height="64" alt="logo" />
    <button class="d-flex justify-center align-center rounded-circle" @click="changeTheme">
      <img src="@/assets/theme.svg" alt="Change theme" :class="[svgClass]" />
    </button>
  </v-container>
  <div></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const svgClass = ref<'svg-light' | 'svg-dark'>('svg-dark');

const changeTheme = () => {
  if (theme.global.current.value.dark) {
    theme.global.name.value = 'light';
    svgClass.value = 'svg-dark';
  } else {
    theme.global.name.value = 'dark';
    svgClass.value = 'svg-light';
  }
};
</script>

<style lang="scss" scoped>
.svg-light {
  filter: invert(0%) sepia(2%) saturate(0%) hue-rotate(179deg) brightness(100%) contrast(102%);
}

.svg-dark {
  filter: invert(99%) sepia(1%) saturate(7496%) hue-rotate(212deg) brightness(117%) contrast(96%);
}

header {
  button {
    min-height: 40px;
    min-width: 40px;
    transition: box-shadow 150ms ease-out;

    img {
      transition: opacity 500ms ease-out;
    }

    &:hover {
      box-shadow: 0 0 15px 1px rgb(var(--v-theme-primary));

      img {
        opacity: 55%;
      }
    }
  }
}
</style>

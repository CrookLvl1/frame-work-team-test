<template>
  <v-img :src="url" cover class="painting w-100 h-100">
    <template v-slot:placeholder>
      <v-sheet class="d-flex h-100 align-center justify-center">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </v-sheet>
    </template>

    <v-sheet class="info w-100 px-4">
      <span class="text-static"> 12312412401240 12941924912941 9249124 </span>
    </v-sheet>
  </v-img>
</template>

<script setup lang="ts">
import { Painting } from '@/ts/Types';
import { PropType } from 'vue';
import baseURL from '@/ts/baseURL';

const props = defineProps({
  painting: {
    type: Object as PropType<Painting>,
    required: true,
  },
});

const url = baseURL.slice(0, -1) + props.painting.imageUrl;
console.log(url);
</script>

<style langs="scss" scoped>
.v-img {
  aspect-ratio: 360/275;
  @media (max-width: 768.75px) {
    aspect-ratio: 340/249;
  }
}
.painting {
  border-radius: 20px;
  cursor: pointer;

  .info {
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    bottom: 0;
    /* transform: translateY(80%); */
    height: 30px;
    transition: height 250ms ease-out;

    span {
      display: block;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      /* box-sizing: border-box; */
    }
  }

  &:hover {
    .info {
      /* transform: translateY(0%); */
      height: calc(145 / 275 * 100%);

      span {
        text-wrap: wrap;
      }
    }
  }
}
</style>

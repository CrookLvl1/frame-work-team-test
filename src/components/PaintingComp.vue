<template>
  <v-img :src="url" cover class="painting w-100 h-100 painting-responsive-img">
    <template v-slot:placeholder>
      <v-sheet class="d-flex h-100 align-center justify-center">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </v-sheet>
    </template>

    <div class="info w-100">
      <p class="static-text">{{ painting.name }}</p>
      <ul class="desc">
        <li class="desc-text">
          <span>Author: </span>
          <span>{{ author }}</span>
        </li>
        <li class="desc-text">
          <span>Created: </span>
          <span>{{ painting.created }}</span>
        </li>
        <li class="desc-text">
          <span>Location: </span>
          <span>{{ location }}</span>
        </li>
      </ul>
    </div>
  </v-img>
</template>

<script setup lang="ts">
import { Painting } from '@/ts/Types';
import { PropType, computed } from 'vue';
import baseURL from '@/ts/baseURL';
import { useStore } from '@/store';
const store = useStore();

const props = defineProps({
  painting: {
    type: Object as PropType<Painting>,
    required: true,
  },
});

const author = computed(
  () => store.getAuthors.find((author) => author.id === props.painting.authorId)?.name || 'undefined',
);
const location = computed(
  () => store.getLocations.find((location) => location.id === props.painting.locationId)?.location || 'undefined',
);

const url = baseURL.slice(0, -1) + props.painting.imageUrl;
</script>

<style langs="scss" scoped>
.painting {
  cursor: pointer;

  border-radius: 20px;

  .info {
    position: absolute;
    bottom: 0;

    height: calc(145 / 275 * 100%);
    padding: 0 15px;

    transition: transform 250ms ease-out;
    transform: translateY(80%);

    background-color: rgba(255, 255, 255, 0.8);

    p {
      overflow: hidden;

      box-sizing: border-box;
      max-width: 100%;
      padding: 5px 0 6px;

      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .desc {
      display: flex;
      flex-direction: column;

      list-style: none;

      gap: 6px 0;

      > li span:first-child {
        font-weight: 700;
      }
    }
  }

  &:hover {
    .info {
      overflow-y: auto;

      transform: translateY(0%);

      li {
        text-wrap: wrap;
      }
    }
  }
}
</style>

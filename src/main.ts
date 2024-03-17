import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';

import '@/main.scss';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// import theme from './vuetifyThemes.ts';

const pinia = createPinia();

const vuetify = createVuetify(
  {
    display: {
      thresholds: {
        xs: 469,
        sm: 769,
        md: 1025,
        lg: 1367,
      },
    },
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#000000',
            background: '#FFFFFF',
            border: '#FFFFFF',
            pageSelectBorder: '#000000',
            selectBorder: '#000000',
            selectBorderHovered: '#B3B3B3',

          },
          variables: {
            primary: '#000000',
            pageHovered: '#EDEDED',
            pageDisabled: '#B3B3B3',
            border: '#FFFFFF',
            pageSelectBorder: '#000000',
            selectBorder: '#000000',
            selectBorderHovered: '#B3B3B3',
          },
        },






        dark: {
          dark: true,
          colors: {
            primary: '#FFFFFF',
            background: '#000000',
            border: '#B3B3B3',
            pageSelectBorder: '#4C4C4C',
            selectBorder: '#FFFFFF',
            selectBorderHovered: '#545454',
          },
          variables: {
            primary: '#FFFFFF',
            background: '#000000',
            border: '#B3B3B3',
            pageSelectBorder: '#4C4C4C',

            selectBorder: '#FFFFFF',
            selectBorderHovered: '#545454',
          },
        },
      },
    },
  }
);

createApp(App)
  .use(pinia)
  .use(vuetify)
  .mount('#app');

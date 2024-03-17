import type { Author, Filter, Location, FilterKey, FilterTypeFromKey, Painting, PaintingRequestParams } from '@/ts/Types';
import axiosBase from '@/ts/axiosBase';
import { throttle } from '@/ts/utils';
import { defineStore } from 'pinia';
import { computed, reactive, ref, shallowRef } from 'vue';

export const useStore = defineStore('main', () => {
    //initial values
    const cache = new Map();
    const paintingsPerPage = 12;

    const filter = reactive<Filter>({
        _page: 1,
    })

    const paintings = shallowRef<null | Array<Painting>>(null);
    const paintingsQuantity = ref<number>(0);

    const authors = shallowRef<Array<Author>>([]);
    const locations = shallowRef<Array<Location>>([]);



    //getters
    const getPaintingsPerPage = computed(() => paintingsPerPage);

    const getPaintings = computed(() => paintings.value);
    const getPaintingsQuantity = computed(() => paintingsQuantity.value);

    const getAuthors = computed(() => authors.value);
    const getLocations = computed(() => locations.value);




    //functions
    const setFilter = <Key extends FilterKey>(filterKey: Key, filterValue: FilterTypeFromKey<Key>) =>
        filter[filterKey] = filterValue;

    const getCurrentPageIndex = computed(() => filter._page);
    

    const getFromCache = (key: any) =>
        cache.has(key) && cache.get(key) || localStorage.getItem(key) || null;

    const saveToCache = (key: any, value: any) => {
        cache.set(key, value);
        localStorage.setItem(key, JSON.stringify(value));
    }



    //requests
    const fetchCurrentPage = async () => {
        const filterStringified = JSON.stringify(filter)
        const pageKey = `page-${filter._page}-${filterStringified}`;
        const quantityKey = `pages-quantity-${filterStringified}`;

        const pageCached = getFromCache(pageKey);

        if (!pageCached) {
            const params: PaintingRequestParams = {
                _limit: paintingsPerPage,
                ...filter
            };

            const response = await axiosBase.get('paintings/', { params });
            const responsePaintingsQuantity = +response.headers['x-total-count'];
            const data = response.data;


            paintingsQuantity.value = responsePaintingsQuantity;
            paintings.value = data;

            saveToCache(quantityKey, responsePaintingsQuantity);
            saveToCache(pageKey, data);

        } else {
            console.log(pageCached);
            paintings.value = pageCached && typeof pageCached !== 'object' ? JSON.parse(pageCached) : pageCached;
            paintingsQuantity.value = JSON.parse(getFromCache(quantityKey));
        }


    };

    const fetchCurrentPageThrottled = throttle(fetchCurrentPage, 1500);

    const fetchAuthors = async () => {
        const key = `authors`;

        const authorsCached = getFromCache(key);
        if (!authorsCached) {
            const response = await axiosBase.get('authors/');
            const data = response.data;

            authors.value = data as Array<Author>;
            saveToCache(key, data)
        } else {
            authors.value = JSON.parse(authorsCached);
        }


    }

    const fetchLocations = async () => {
        const key = 'locations';

        const locationsCached = getFromCache(key);
        if (!locationsCached) {
            const response = await axiosBase.get('locations/');
            const data = response.data;

            locations.value = data as Array<Location>;
            saveToCache(key, data);
        } else {
            locations.value = JSON.parse(locationsCached);
        }
    }


    return {
        getPaintings,
        getPaintingsQuantity,
        getAuthors,
        getLocations,
        getPaintingsPerPage,
        getCurrentPageIndex,


        setFilter,


        fetchCurrentPage,
        fetchCurrentPageThrottled,
        fetchAuthors,
        fetchLocations
    };
});

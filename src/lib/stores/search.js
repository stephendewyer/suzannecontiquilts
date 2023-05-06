import { writable } from "svelte/store";

export const createSearchStore = (data) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: '',
    })
    return {
        subscribe,
        set,
        update,
    }
}

export const searchHandler = (store) => { 
    const search_term = store.search.toLowerCase() || "";
    store.filtered = store.data.filter((item) => {
        return item.search_terms.toLowerCase().includes(search_term);
    });
}
import { writable } from "svelte/store";

export const createSearchStore = (data) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: {
            name: "",
            patterns: [],
            techniques: []
        },
    });
    return {
        subscribe,
        set,
        update,
    };
}

export const searchHandler = (store) => { 

    const searchQuiltName = store.search.name.toLowerCase() || "";
    const searchQuiltPatterns = store.search.patterns;
    const searchQuiltTechniques = store.search.techniques;
    // console.log("quilt name: ", searchQuiltName);
    // console.log("quilt patterns: ", searchQuiltPatterns);
    // console.log("quilt search techniques: ", searchQuiltTechniques);

    store.filtered = store.data.filter((item) => {
        // apply quilt name filter first

        // if search quilt by name value is empty, continue to apply patterns and techniques filters
        // else if search quilt searchTerm.name value includes seach by name input value, continue to apply patterns and techniques filters, 
        if (searchQuiltName === "") {

            if (searchQuiltPatterns.length === 0) {

                if (searchQuiltTechniques.length === 0) {
                    
                    return item;

                } else if (searchQuiltTechniques.length > 0) {
                    // assuming search quilt name input is empty and searchQuiltPatterns is empty
                    // create an array of patterns shared between searchQuiltTechniques and item techniques
                    let matchingTechniques = [];
                    item.searchTerms.techniques.forEach((technique) => {
                        searchQuiltTechniques.forEach((searchedTechnique) => {
                            if (technique.toLowerCase() === searchedTechnique.toLowerCase()) {
                                matchingTechniques = [...matchingTechniques, searchedTechnique];
                            };
                        });
                    });
                    // if matching techniques array is same length as searchQuiltTechniques array, return item
                    if (matchingTechniques.length === searchQuiltTechniques.length) {
                        return item;
                    };
                };

            } else {
                // assuming search quilt name input is empty and searchQuiltPatterns is not empty
                // create an array of patterns shared between searchQuiltPatterns and item patterns
                let matchingPatterns = [];
                item.searchTerms.patterns.forEach((pattern) => {
                    searchQuiltPatterns.forEach((searchedPattern) => {
                        if (pattern.toLowerCase() === searchedPattern.toLowerCase()) {
                            matchingPatterns = [...matchingPatterns, searchedPattern];
                        };
                    });
                });
                // if matching patterns array is the same length as search patterns length, continue to apply techniques filter
                if (matchingPatterns.length === searchQuiltPatterns.length) {

                    let matchingTechniques = [];
                    item.searchTerms.techniques.forEach((technique) => {
                        searchQuiltTechniques.forEach((searchedTechnique) => {
                            if (technique.toLowerCase() === searchedTechnique.toLowerCase()) {
                                matchingTechniques = [...matchingTechniques, searchedTechnique];
                            };
                        });
                    });

                    if (matchingTechniques.length === searchQuiltTechniques.length) {
                        return item;
                    };

                } else {

                    return;

                };
            };
        
        } else if (item.searchTerms.name.toLowerCase().includes(searchQuiltName)) {
            if (searchQuiltPatterns.length === 0) {

                if (searchQuiltTechniques.length === 0) {
                    
                    return item;

                } else if (searchQuiltTechniques.length > 0) {
                    // assuming search quilt name input is not empty and searchQuiltPatterns is empty
                    // create an array of patterns shared between searchQuiltTechniques and item techniques
                    let matchingTechniques = [];
                    item.searchTerms.techniques.forEach((technique) => {
                        searchQuiltTechniques.forEach((searchedTechnique) => {
                            if (technique.toLowerCase() === searchedTechnique.toLowerCase()) {
                                matchingTechniques = [...matchingTechniques, searchedTechnique];
                            };
                        });
                    });
                    // if matching techniques array is same length as searchQuiltTechniques array, return item
                    if (matchingTechniques.length === searchQuiltTechniques.length) {
                        return item;
                    };
                };

            } else {
                // assuming search quilt name input is not empty and searchQuiltPatterns is not empty
                // create an array of patterns shared between searchQuiltPatterns and item patterns
                let matchingPatterns = [];
                item.searchTerms.patterns.forEach((pattern) => {
                    searchQuiltPatterns.forEach((searchedPattern) => {
                        if (pattern.toLowerCase() === searchedPattern.toLowerCase()) {
                            matchingPatterns = [...matchingPatterns, searchedPattern];
                        };
                    });
                });
                // if matching patterns array is the same length as search patterns length, continue to apply techniques filter
                if (matchingPatterns.length === searchQuiltPatterns.length) {

                    let matchingTechniques = [];
                    item.searchTerms.techniques.forEach((technique) => {
                        searchQuiltTechniques.forEach((searchedTechnique) => {
                            if (technique.toLowerCase() === searchedTechnique.toLowerCase()) {
                                matchingTechniques = [...matchingTechniques, searchedTechnique];
                            };
                        });
                    });

                    if (matchingTechniques.length === searchQuiltTechniques.length) {
                        return item;
                    };

                } else {

                    return;

                };
            };
        } else {

            return;

        };

    });
}
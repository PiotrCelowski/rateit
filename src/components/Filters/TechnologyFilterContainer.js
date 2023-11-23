import React, { useCallback, useEffect, useState } from "react";
import TechnologyFilter from './TechnologyFilter';
import { useRefinementList } from 'react-instantsearch-hooks-web';

const TechnologyFilterContainer = () => {
    const { items, refine, searchForItems } = useRefinementList({
        attribute: "technologies",
        operator: "and",
        searchable: true,
        limit: 5,
        showMore: true,
        showMoreLimit: 10
    });

    const [savedItems, setSavedItems] = useState({});
    const [itemsSearcher, setItemsSearcher] = useState('');

    const areFacetsNarrowed = useCallback((items, savedItems) => {
        if (items.length !== Object.keys(savedItems).length) {
            return haveDifferentElements(items, savedItems);
        }
        return false;
    }, []);

    const haveDifferentElements = (refinedItems, savedItems) => {
        var haveSameElements = false;
        refinedItems.forEach(item => {
            if (Object.entries(savedItems).length === 0 && refinedItems.length !== 0) {
                haveSameElements = true;
            };
            Object.entries(savedItems).forEach(function (savedItem, isRefined) {
                if (item.value !== savedItem) {
                    haveSameElements = true;
                }
            })
        });
        return haveSameElements;
    }

    const isFilterRefined = useCallback((items, savedItems) => {
        var isRefined = false;
        items.forEach(item => {
            if (Object.keys(savedItems).includes(item.value)) {
                if (savedItems[item.value] !== item.isRefined) {
                    isRefined = true;
                }
            }
        })
        return isRefined;
    }, []);


    useEffect(() => {
        searchForItems(itemsSearcher);

        if (areFacetsNarrowed(items, savedItems) || isFilterRefined(items, savedItems)) {
            const updateFiltersAndRefine = setTimeout(() => {

                setSavedItems(previousItems => {
                    const newItems = {};
                    items.forEach((item) => {
                        newItems[item.value] = item.isRefined;
                    });
                    return newItems;
                })
            }, 100);

            return () => clearTimeout(updateFiltersAndRefine);
        }


    }, [items, savedItems, areFacetsNarrowed, setSavedItems, isFilterRefined, itemsSearcher, searchForItems]);

    const checkItem = useCallback((event) => {
        setSavedItems(previousItems => {
            const newItems = { ...previousItems };
            newItems[event.target.name] = !previousItems[event.target.name]
            return newItems;
        });
        refine(event.target.name);
    }, [refine])

    return (
        <TechnologyFilter items={savedItems} checkItem={checkItem} setItemsSearcher={setItemsSearcher} />
    )
}

export default TechnologyFilterContainer;
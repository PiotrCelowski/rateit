import React, { useCallback, useEffect, useState } from "react";
import { useRefinementList } from 'react-instantsearch-hooks-web';
import LevelFilter from "./LevelFilter";

const TechnologyFilterContainer = () => {
    const { items, refine } = useRefinementList({
        attribute: "level",
        operator: "and",
    });

    const [savedItems, setSavedItems] = useState({});

    const checkItems = useCallback((items) => {
        for (const item of items) {
          if (!savedItems.hasOwnProperty(item.value)) {
            return true;
          }
        }
        return false;
      }, [savedItems]);

    useEffect(() => {
        if (checkItems(items)) {
            setSavedItems(previousItems => {
                const newItems = { ...previousItems };
                items.forEach((item) => {
                    newItems[item.value] = false;
                });
                return newItems;
            });
        }
    }, [items, savedItems, checkItems]);

    const checkItem = useCallback((event) => {
        setSavedItems(previousItems => {
            const newItems = { ...previousItems };
            newItems[event.target.name] = !previousItems[event.target.name]
            return newItems;
        });
        refine(event.target.name);
    }, [refine])

    return (
        <LevelFilter items={savedItems} checkItem={checkItem} />
    )
}

export default TechnologyFilterContainer;
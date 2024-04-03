import React from "react";
import { RouterProvider} from "react-router-dom";
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { searchClient } from "./configuration/algolia/algolia-config";
import { router } from "./router";

function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="courses">
      <RouterProvider router={router} />
    </InstantSearch>
  );
}

export default App;

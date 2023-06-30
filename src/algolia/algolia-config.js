import algoliasearch from 'algoliasearch/lite';

export const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_API_KEY);

import { useConnector } from 'react-instantsearch-hooks-web';
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';

export function useAutocomplete(props) {
  return useConnector(connectAutocomplete, props);
}
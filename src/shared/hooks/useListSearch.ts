import { useEffect, useState } from "react";

/**
 * Search box state for the paginated admin lists (clients, users, orders),
 * which filter server-side through the API's `?search=` param.
 *
 * - `search`: what's in the input (updates on every keystroke).
 * - `searchParam`: `&search=...` to append to the SWR key, debounced so the
 *   API is hit once the user stops typing; "" when the box is empty.
 * - `onSearchChange(value)` also calls `onReset` (e.g. back to page 1).
 */
export const useListSearch = (onReset?: () => void, delay = 300) => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebounced(search.trim()), delay);
    return () => clearTimeout(id);
  }, [search, delay]);

  const onSearchChange = (value: string) => {
    setSearch(value);
    onReset?.();
  };

  return {
    search,
    onSearchChange,
    /** Trimmed, debounced term actually sent to the API. */
    activeSearch: debounced,
    searchParam: debounced ? `&search=${encodeURIComponent(debounced)}` : "",
  };
};

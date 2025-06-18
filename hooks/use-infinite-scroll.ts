import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Store<T> = {
  items: T[];
  page: number;
  has_more: boolean;
  loading: boolean;
  last_query: string;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setLoading: (loading: boolean) => void;
  setLastQuery: (query: string) => void;
  fetch: (query: string, page: number) => Promise<number>; // returns count
};

type UseInfiniteScrollProps<T> = {
  searchQuery: string;
  storeHook: (selector: (state: any) => Store<T>) => Store<T>;
};

export function useInfiniteScroll<T>({
  searchQuery,
  storeHook,
}: UseInfiniteScrollProps<T>) {
  const {
    items,
    page,
    has_more,
    loading,
    last_query,
    setPage,
    setHasMore,
    setLoading,
    fetch,
    setLastQuery,
  } = storeHook((state) => state);

  const { ref, inView } = useInView();

  // Initial load or search change
  useEffect(() => {
    if (items.length === 0 || searchQuery !== last_query) {
      const loadInitial = async () => {
        setLoading(true);
        setPage(1);
        const count = await fetch(searchQuery, 1);
        setHasMore(count > 20);
        setLastQuery(searchQuery);
        setLoading(false);
      };
      loadInitial();
    }
  }, [searchQuery]);

  // Infinite scroll
  useEffect(() => {
    if (inView && has_more && items.length > 0 && !loading) {
      const loadMore = async () => {
        setLoading(true);
        const nextPage = page + 1;
        const count = await fetch(searchQuery, nextPage);
        setPage(nextPage);
        setHasMore(count > 20);
        setLoading(false);
      };
      loadMore();
    }
  }, [inView, has_more, items.length, loading, page, searchQuery]);

  return { ref, loading, items };
}

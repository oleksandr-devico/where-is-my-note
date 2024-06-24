import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNotes } from '../api/api';

export const useNotes = (limit: number) => {
    return useInfiniteQuery({
      queryKey: ['notes', limit],
      queryFn: ({ pageParam = 1 }) => fetchNotes(pageParam, limit),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === limit ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });
  };
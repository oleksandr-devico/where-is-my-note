import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../api/api';
import { Note, PaginatedNotes } from '../types/note';
import toast from 'react-hot-toast';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: deleteNote,
    onSuccess: (id) => {
      toast('Note is deleted!');

      // The queryClient.setQueryData can be removed when connected to the real api and replaced with invalidations below
      queryClient.setQueryData(['notes'], (oldData: PaginatedNotes) => {
        console.log('Old Data:', oldData); // Log the old data to debug
        const newData = {
          ...oldData,
          pages: oldData.pages.map((page: Note[]) =>
            page.filter((note: Note) => note.id !== id),
          ),
        };
        console.log('New Data:', newData); // Log the new data to verify changes
        return newData;
      });
      // queryClient.removeQueries(['note', id]);
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
      // queryClient.invalidateQueries({ queryKey: ['note'] });
    },
    onError: () => {
      toast.error('Failed to delete note!');
    },
  });
};

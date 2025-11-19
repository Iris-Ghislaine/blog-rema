'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/context/ToastContext';

async function toggleLike(postId: string): Promise<{ liked: boolean }> {
  const res = await fetch('/api/likes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postId }),
  });
  if (!res.ok) throw new Error('Failed to toggle like');
  return res.json();
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
    onError: () => {
      toast.error('Failed to like post');
    },
  });
}

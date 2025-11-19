'use client';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Comment } from '@/types';
import { useToast } from '@/context/ToastContext';

async function fetchComments(postId: string): Promise<Comment[]> {
  const res = await fetch(`/api/comments?postId=${postId}`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

async function createComment(data: {
  postId: string;
  content: string;
  parentId?: string;
}): Promise<Comment> {
  const res = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create comment');
  return res.json();
}

async function deleteComment(id: string): Promise<void> {
  const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete comment');
}

export function useComments(postId: string) {
  return useQuery(['comments', postId], () => fetchComments(postId), {
    enabled: !!postId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(createComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comments', data.postId]);
      toast.success('Comment added!');
    },
    onError: () => {
      toast.error('Failed to add comment');
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      toast.success('Comment deleted!');
    },
    onError: () => {
      toast.error('Failed to delete comment');
    },
  });
}
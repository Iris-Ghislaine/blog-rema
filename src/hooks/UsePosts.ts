'use client';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Post } from '@/types';
import { useToast } from '@/context/ToastContext';

async function fetchPosts(published: boolean = true): Promise<Post[]> {
  const res = await fetch(`/api/posts?published=${published}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

async function fetchPost(slug: string): Promise<Post> {
  const res = await fetch(`/api/posts/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

async function createPost(data: Partial<Post>): Promise<Post> {
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

async function updatePost(id: string, data: Partial<Post>): Promise<Post> {
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

async function deletePost(id: string): Promise<void> {
  const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete post');
}

export function usePosts(published: boolean = true) {
  return useQuery(['posts', published], () => fetchPosts(published));
}

export function usePost(slug: string) {
  return useQuery(['post', slug], () => fetchPost(slug), {
    enabled: !!slug,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success('Post created successfully!');
    },
    onError: () => {
      toast.error('Failed to create post');
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    ({ id, data }: { id: string; data: Partial<Post> }) =>
      updatePost(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        toast.success('Post updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update post');
      },
    }
  );
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success('Post deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete post');
    },
  });
}

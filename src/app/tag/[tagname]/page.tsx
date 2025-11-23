'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostList } from '../../../components/post/PostLists';
import { Sidebar } from '../../../components/layouts/Sidebar';
import { Spinner } from '@/components/ui/Spinner';
import { Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

async function fetchPostsByTag(tagSlug: string) {
  const res = await fetch(`/api/posts?tag=${encodeURIComponent(tagSlug)}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

async function fetchTagInfo(tagSlug: string) {
  const res = await fetch(`/api/tags/${encodeURIComponent(tagSlug)}`);
  if (!res.ok) return null;
  return res.json();
}

export default function TagPage({ params }: { params: Promise<{ tagname: string }> }) {
  const [tagname, setTagname] = useState<string>('');

  useEffect(() => {
    params.then((p) => setTagname(p.tagname));
  }, [params]);

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts', 'tag', tagname],
    queryFn: () => fetchPostsByTag(tagname),
    enabled: !!tagname,
  });

  const { data: tagInfo } = useQuery({
    queryKey: ['tag', tagname],
    queryFn: () => fetchTagInfo(tagname),
    enabled: !!tagname,
  });

  if (!tagname || postsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const displayName = tagInfo?.name || tagname.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mb-4">
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-orange-600 to-blue-900 p-3 rounded-lg">
                  <Tag className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{displayName}</h1>
                  <p className="text-gray-600 mt-1">
                    {posts?.length || 0} {posts?.length === 1 ? 'post' : 'posts'} tagged with <span className="font-semibold text-orange-600">{displayName}</span>
                  </p>
                </div>
              </div>

              {/* Tag Info */}
              {posts && posts.length > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 border-l-4 border-orange-500 p-4 rounded">
                  <p className="text-gray-800">
                    Showing all stories about <span className="font-bold">{displayName}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Posts */}
            {!posts || posts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <Tag className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 mb-6">
                  There are no stories tagged with &quot;{displayName}&quot; yet.
                </p>
                <Link href="/">
                  <Button variant="primary">Explore other topics</Button>
                </Link>
              </div>
            ) : (
              <PostList posts={posts} isLoading={false} />
            )}
          </div>

          <Sidebar />
        </div>
      </div>
    </div>
  );
}
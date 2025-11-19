'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { usePosts } from '../../../hooks/UsePosts';
import { PostList } from '../../../components/post/PostLists';
import { FileText } from 'lucide-react';

export default function DraftsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: drafts, isLoading } = usePosts(false);

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-gray-700" size={32} />
          <h1 className="text-4xl font-bold text-gray-900">Your Drafts</h1>
        </div>

        <PostList posts={drafts || []} isLoading={isLoading} variant="compact" />
      </div>
    </div>
  );
}
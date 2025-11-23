// 'use client';

// import Link from 'next/link';
// import { TrendingUp, Tag } from 'lucide-react';

// const trendingTopics = [
//   { name: 'Technology', slug: 'technology', count: 1234 },
//   { name: 'Programming', slug: 'programming', count: 987 },
//   { name: 'Design', slug: 'design', count: 756 },
//   { name: 'Startup', slug: 'startup', count: 654 },
//   { name: 'AI & ML', slug: 'ai-ml', count: 543 },
// ];

// export function Sidebar() {
//   return (
//     <aside className="w-full lg:w-80 space-y-8">
//       {/* Trending Topics */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <TrendingUp className="text-orange-600" size={20} />
//           <h2 className="font-bold text-gray-900">Trending Topics</h2>
//         </div>
//         <div className="space-y-3">
//           {trendingTopics.map((topic) => (
//             <Link
//               key={topic.slug}
//               href={`/tag/${topic.slug}`}
//               className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
//             >
//               <div className="flex items-center gap-2">
//                 <Tag size={16} className="text-gray-400 group-hover:text-orange-600 transition-colors" />
//                 <span className="font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
//                   {topic.name}
//                 </span>
//               </div>
//               <span className="text-sm text-gray-400">{topic.count}</span>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Recommended Topics */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h2 className="font-bold text-gray-900 mb-4">Recommended Topics</h2>
//         <div className="flex flex-wrap gap-2">
//           {['JavaScript', 'React', 'NextJS', 'TypeScript', 'CSS', 'Node.js', 'Python'].map((topic) => (
//             <Link
//               key={topic}
//               href={`/tag/${topic.toLowerCase()}`}
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors"
//             >
//               {topic}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

'use client';

import Link from 'next/link';
import { TrendingUp, Tag, Sparkles } from 'lucide-react';

// IMPORTANT: Use slugified versions that match database
const trendingTopics = [
  { name: 'Technology', slug: 'technology', count: 1234, trend: '+12%' },
  { name: 'Programming', slug: 'programming', count: 987, trend: '+8%' },
  { name: 'Design', slug: 'design', count: 756, trend: '+15%' },
  { name: 'Startup', slug: 'startup', count: 654, trend: '+5%' },
  { name: 'AI & ML', slug: 'ai-ml', count: 543, trend: '+20%' }, // Note: slug is 'ai-ml'
];

// IMPORTANT: Use lowercase, slugified versions
const recommendedTopics = [
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextjs' }, // or 'next-js'
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'CSS', slug: 'css' },
  { name: 'Node.js', slug: 'nodejs' }, // or 'node-js'
  { name: 'Python', slug: 'python' },
  { name: 'Machine Learning', slug: 'machine-learning' },
];

export function Sidebar() {
  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Trending Topics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
            <TrendingUp className="text-white" size={18} />
          </div>
          <h2 className="font-bold text-gray-900">Trending Topics</h2>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/tag/${topic.slug}`}
              className="flex items-center justify-between p-3 hover:bg-orange-50 rounded-lg transition-all group border border-transparent hover:border-orange-200"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full text-orange-700 text-xs font-bold">
                  {index + 1}
                </div>
                <div>
                  <span className="font-medium text-gray-700 group-hover:text-orange-600 transition-colors block">
                    {topic.name}
                  </span>
                  <span className="text-xs text-green-600 font-medium">{topic.trend}</span>
                </div>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-orange-500 transition-colors">
                {topic.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Topics */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-blue-600" size={18} />
          <h2 className="font-bold text-gray-900">Recommended Topics</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {recommendedTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/tag/${topic.slug}`}
              className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm hover:bg-orange-600 hover:text-white transition-all shadow-sm hover:shadow-md border border-gray-200 hover:border-orange-600"
            >
              {topic.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-sm text-yellow-800 font-medium mb-1">💡 Pro Tip</p>
        <p className="text-xs text-yellow-700">
          Click on any tag to see all related posts. Tags help you discover content on topics you care about!
        </p>
      </div>
    </aside>
  );
}
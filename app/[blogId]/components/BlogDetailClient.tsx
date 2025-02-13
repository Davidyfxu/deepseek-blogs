// app/blog/[blogId]/components/BlogDetailClient.tsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface Blog {
  id: number;
  title: string;
  content: string;
  wordCount: number;
  keywords: string[];
  references: string[];
  created_at: string;
}

export default function BlogDetailClient({ blog }: { blog: Blog | null }) {
  const router = useRouter();

  if (!blog) {
    return (
      <div
        className="min-h-screen flex items-center justify-center
                   bg-gradient-to-b from-purple-50 to-blue-50"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6 py-8 bg-white/70 backdrop-blur-md
                     rounded-xl shadow-lg border border-purple-100/50"
        >
          <h1 className="text-3xl font-bold text-purple-700 mb-4">
            文章未找到
          </h1>
          <button
            onClick={() => router.push("/blog")}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600
                       text-white font-medium rounded-full shadow
                       hover:opacity-90 transition-opacity"
          >
            返回主页
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 pt-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 px-4 py-2 text-purple-600
                     hover:text-purple-700 transition-colors"
        >
          <span>返回主页</span>
        </motion.button>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 max-w-3xl"
      >
        <header className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-blue-600
                       bg-clip-text text-transparent"
          >
            {blog.title}
          </motion.h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 mb-6">
            <time dateTime={new Date(blog.created_at).toISOString()}>
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{blog.wordCount} words</span>
          </div>

          {blog.keywords && blog.keywords.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2 justify-center flex-wrap"
            >
              {blog.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-4 py-1.5 bg-purple-50 text-purple-600 text-sm rounded-full
                             hover:bg-purple-100 transition-colors border border-purple-200"
                >
                  {keyword}
                </span>
              ))}
            </motion.div>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-800
                     prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-xl prose-img:shadow-lg prose-p:text-gray-700"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {blog.references && blog.references.length > 0 && (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              References
            </h2>
            <ul className="space-y-3">
              {blog.references.map((ref, index) => (
                <li key={index}>
                  <a
                    href={ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline flex items-center group"
                  >
                    <span className="mr-2">→</span>
                    <span className="group-hover:translate-x-1 transition-transform overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(100%-2rem)]">
                      {ref}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.footer>
        )}
      </motion.article>
    </div>
  );
}

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
// 数据获取函数
async function getBlogs(): Promise<Blog[]> {
  try {
    const { data: blogs, error } = await supabase
      .from("blogs-deepseek")
      .select("id, title, content, wordCount, keywords, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return blogs || [];
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
}
interface Blog {
  id: bigint;
  title: string;
  content: string;
  wordCount: number;
  keywords: string[];
  created_at: string;
}

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <>
      {/* 背景：使用渐变并稍微带一点分段过渡 */}
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1
            className="text-4xl font-bold mb-12 text-center
                       bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            Deepseek Latest News
          </h1>

          <div className="space-y-6">
            {blogs.map((blog, index) => (
              <div
                key={blog.id}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg
                           hover:shadow-xl hover:-translate-y-1 transition-all
                           duration-300 overflow-hidden border border-purple-200/50"
              >
                <Link href={`/${blog.id}`} className="block p-6">
                  <div className="space-y-4">
                    {blog.keywords && blog.keywords.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {blog.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="px-3 py-1 bg-gradient-to-r
                                       from-purple-500/10 to-blue-500/10
                                       text-purple-700 text-xs rounded-full
                                       transition-colors
                                       group-hover:from-purple-500/20
                                       group-hover:to-blue-500/20
                                       border border-purple-200/50"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2
                      className="text-2xl font-bold text-gray-800
                                 group-hover:text-purple-600 transition-colors"
                    >
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-1 text-lg">
                      {blog.content
                        .trim()
                        .replace(/^###\s*/, "")
                        .slice(0, 150)}
                      ...
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-purple-100">
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <time
                          dateTime={new Date(blog.created_at).toISOString()}
                          className="text-purple-600"
                        >
                          {new Date(blog.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </time>
                        <span className="text-purple-300">•</span>
                        <span className="text-purple-600">
                          {blog.wordCount} words
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-2 font-medium
                                   group-hover:translate-x-2 transition-all
                                   bg-gradient-to-r from-purple-600 to-blue-600
                                   bg-clip-text text-transparent"
                      >
                        Read more
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

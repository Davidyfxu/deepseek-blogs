// app/blog/[blogId]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import BlogDetailClient from "./components/BlogDetailClient";

interface Blog {
  id: number;
  title: string;
  content: string;
  wordCount: number;
  keywords: string[];
  references: string[];
  created_at: string;
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = await params;
  const blog = await getBlogData(blogId);

  return {
    title: blog ? `${blog.title} | Blog` : "Blog Not Found",
    description: blog ? blog.content.slice(0, 155) : "Article not found",
  };
}

// 数据获取函数
async function getBlogData(blogId: string): Promise<Blog | null> {
  try {
    const { data: blog, error } = await supabase
      .from("blogs-deepseek")
      .select("*")
      .eq("id", blogId)
      .single();

    if (error) throw error;
    return blog;
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
}

// 页面组件
export default async function BlogDetailPage({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = await params;
  const blog = await getBlogData(blogId);
  return <BlogDetailClient blog={blog} />;
}

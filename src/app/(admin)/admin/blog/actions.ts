"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createBlog(
  formData: FormData
) {
  const supabase = createSupabaseServerClient();

  const title = String(formData.get("title"));
  const slug = String(formData.get("slug"));
  const excerpt = String(formData.get("excerpt"));
  const author = String(formData.get("author"));
  const body = String(formData.get("body"));

  const id = `post-${Date.now()}`;

  const data = {
    id,
    slug,
    title,
    excerpt,
    author,
    body,
    tags: [],
    publishedAt: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("ecommerce_blog_posts")
    .insert({
      id,
      slug,
      sort_order: 0,
      data,
      published_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
}
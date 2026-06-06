import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { supabasePublic } from "@/lib/supabase/public-client";

export const dynamic = "force-dynamic";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { data: post, error } = await supabasePublic
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <article className="prose lg:prose-xl mx-auto py-12">
      <h1>{post.title}</h1>

      {post.featured_image && (
        <img src={post.featured_image} alt={post.title} />
      )}

      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content || ""),
        }}
      />
    </article>
  );
}
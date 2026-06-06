import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import PostEditForm from "@/components/admin/post-edit-form";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({
  params,
}: PageProps) {
  const { id } = await params;

  const { data: post, error } =
    await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Post
        </h1>

        <p className="text-gray-500 mt-2">
          Update post content
        </p>
      </div>

      <PostEditForm post={post} />
    </div>
  );
}
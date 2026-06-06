import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const supabase = getSupabaseAdmin();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>

        <Link href="/admin/posts/create">
          Create Post
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {posts?.map((post: any) => (
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.status}</td>
              <td className="border p-2">
                {new Date(post.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
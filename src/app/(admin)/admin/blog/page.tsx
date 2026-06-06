import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const supabase = getSupabaseAdmin();

  const { data: posts, error } = await supabase
    .from("ecommerce_blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Manage blog content"
      >
        <Link href="/admin/blog/new">
          <Button>New Post</Button>
        </Link>
      </PageHeader>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {posts?.map((post: any) => (
              <TableRow key={post.id}>
                <TableCell>
                  {post.title}
                </TableCell>

                <TableCell>
                  {post.author}
                </TableCell>

                <TableCell>
                  {post.slug}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
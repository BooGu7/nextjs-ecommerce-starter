import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export default async function BlogPage() {
  const supabase = createSupabaseServerClient();

  const { data: posts } = await supabase
    .from("ecommerce_blog_posts")
    .select("*")
    .order("published_at", {
      ascending: false,
    });

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Manage blog content"
      >
        <Link href="/admin/blog/new">
          <Button>
            New Post
          </Button>
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
            {posts?.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  {post.data?.title}
                </TableCell>

                <TableCell>
                  {post.data?.author}
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
import Link from "next/link";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { deletePage } from "./actions";

export const dynamic = "force-dynamic";

export default async function PagesPage() {
  const supabase = getSupabaseAdmin();

  const { data: pages, error } = await supabase
    .from("ecommerce_pages")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <PageHeader
        title="Pages"
        description="Manage static pages"
      >
        <Link href="/admin/pages/new">
          <Button>New Page</Button>
        </Link>
      </PageHeader>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {pages?.map((page: any) => (
              <TableRow key={page.id}>
                <TableCell>
                  {page.title}
                </TableCell>

                <TableCell>
                  {page.slug}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/pages/${page.id}`}>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deletePage(page.id);
                      }}
                    >
                      <Button
                        size="sm"
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export default async function PagesPage() {
  const supabase =
    createSupabaseServerClient();

  const { data: pages } =
    await supabase
      .from("ecommerce_pages")
      .select("*")
      .order("published_at", {
        ascending: false,
      });

  return (
    <div>
      <PageHeader
        title="Pages"
        description="Manage static pages"
      >
        <Link href="/admin/pages/new">
          <Button>
            New Page
          </Button>
        </Link>
      </PageHeader>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Title
              </TableHead>

              <TableHead>
                Slug
              </TableHead>

              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {pages?.map((page) => (
              <TableRow
                key={page.id}
              >
                <TableCell>
                  {
                    page.data
                      ?.title
                  }
                </TableCell>

                <TableCell>
                  {page.slug}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/pages/${page.id}`}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                      >
                        Edit
                      </Button>
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deletePage(
                          page.id
                        );
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
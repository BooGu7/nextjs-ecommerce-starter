import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { deleteCategory } from "./actions";

export default async function CategoriesPage() {
  const supabase = createSupabaseServerClient();

  const { data: categories } =
    await supabase
      .from("ecommerce_categories")
      .select("*");

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Manage categories"
      >
        <Link href="/admin/categories/new">
          <Button>
            Add Category
          </Button>
        </Link>
      </PageHeader>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories?.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>
                  {cat.data?.name}
                </TableCell>

                <TableCell>
                  {cat.slug}
                </TableCell>

                <TableCell className="text-right">
                  <form
                    action={async () => {
                      "use server";
                      await deleteCategory(
                        cat.id
                      );
                    }}
                  >
                    <Button
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
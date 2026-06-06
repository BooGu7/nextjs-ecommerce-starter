import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { deleteBrand } from "./actions";

export default async function BrandsPage() {
  const supabase = createSupabaseServerClient();

  const { data: brands } = await supabase
    .from("ecommerce_brands")
    .select("*")
    .order("created_at");

  return (
    <div>
      <PageHeader
        title="Brands"
        description="Manage brands"
      >
        <Link href="/admin/brands/new">
          <Button>Add Brand</Button>
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
            {brands?.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>
                  {brand.data?.name}
                </TableCell>

                <TableCell>
                  {brand.slug}
                </TableCell>

                <TableCell className="text-right">
                  <form
                    action={async () => {
                      "use server";
                      await deleteBrand(
                        brand.id
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { deleteProduct } from "./actions";

export default async function ProductsPage() {
  const supabase = createSupabaseServerClient();

  const { data: products } = await supabase
    .from("ecommerce_products")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage store products."
      >
        <Link href="/admin/products/new">
          <Button>
            Add Product
          </Button>
        </Link>
      </PageHeader>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {products?.map((product) => {
              const item = product.data;

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    {item.name}
                  </TableCell>

                  <TableCell>
                    {product.status}
                  </TableCell>

                  <TableCell>
                    $
                    {item?.variants?.[0]?.price ??
                      0}
                  </TableCell>

                  <TableCell>
                    {
                      item?.variants?.[0]
                        ?.inventory?.quantity
                    }
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Link
                        href={`/admin/products/${product.id}`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </Link>

                      <form
                        action={async () => {
                          "use server";
                          await deleteProduct(
                            product.id
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
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
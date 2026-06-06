import Link from "next/link";

import { createProduct } from "../actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">
        New Product
      </h1>

      <form
        action={createProduct}
        className="mt-6 space-y-6"
      >
        <div>
          <Label>Name</Label>

          <Input
            name="name"
            required
          />
        </div>

        <div>
          <Label>Slug</Label>

          <Input
            name="slug"
            required
          />
        </div>

        <div>
          <Label>Price</Label>

          <Input
            name="price"
            type="number"
            required
          />
        </div>

        <div>
          <Label>Inventory</Label>

          <Input
            name="inventory"
            type="number"
            required
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit">
            Create
          </Button>

          <Link href="/admin/products">
            <Button variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
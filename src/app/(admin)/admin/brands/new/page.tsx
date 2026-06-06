import { createBrand } from "../actions";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function NewBrandPage() {
  return (
    <form
      action={createBrand}
      className="max-w-xl space-y-4"
    >
      <h1 className="text-3xl font-bold">
        New Brand
      </h1>

      <div>
        <Label>Name</Label>
        <Input name="name" />
      </div>

      <div>
        <Label>Slug</Label>
        <Input name="slug" />
      </div>

      <div>
        <Label>Description</Label>
        <Input name="description" />
      </div>

      <Button type="submit">
        Save Brand
      </Button>
    </form>
  );
}
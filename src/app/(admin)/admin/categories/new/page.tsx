import { createCategory } from "../actions";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function NewCategoryPage() {
  return (
    <form
      action={createCategory}
      className="max-w-xl space-y-4"
    >
      <h1 className="text-3xl font-bold">
        New Category
      </h1>

      <div>
        <Label>Name</Label>
        <Input name="name" />
      </div>

      <div>
        <Label>Slug</Label>
        <Input name="slug" />
      </div>

      <Button type="submit">
        Save Category
      </Button>
    </form>
  );
}
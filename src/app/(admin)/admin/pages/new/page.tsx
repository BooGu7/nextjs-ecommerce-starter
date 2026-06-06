import { createPage } from "../actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewPagePage() {
  return (
    <form
      action={createPage}
      className="max-w-5xl space-y-5"
    >
      <h1 className="text-3xl font-bold">
        New Page
      </h1>

      <div>
        <Label>Title</Label>

        <Input
          name="title"
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
        <Label>Excerpt</Label>

        <Textarea
          name="excerpt"
          rows={4}
        />
      </div>

      <div>
        <Label>
          Content HTML
        </Label>

        <Textarea
          name="body"
          rows={20}
        />
      </div>

      <Button type="submit">
        Publish Page
      </Button>
    </form>
  );
}
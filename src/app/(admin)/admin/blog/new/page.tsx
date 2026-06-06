import { createBlog } from "../actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewBlogPage() {
  return (
    <form
      action={createBlog}
      className="max-w-4xl space-y-5"
    >
      <h1 className="text-3xl font-bold">
        New Blog Post
      </h1>

      <div>
        <Label>Title</Label>
        <Input name="title" />
      </div>

      <div>
        <Label>Slug</Label>
        <Input name="slug" />
      </div>

      <div>
        <Label>Author</Label>
        <Input
          name="author"
          defaultValue="Admin"
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
        <Label>Body HTML</Label>
        <Textarea
          name="body"
          rows={20}
        />
      </div>

      <Button type="submit">
        Publish Post
      </Button>
    </form>
  );
}
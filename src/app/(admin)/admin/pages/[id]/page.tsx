import { notFound } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { updatePage } from "../actions";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default async function EditPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const supabase =
    createSupabaseServerClient();

  const { data: page } =
    await supabase
      .from("ecommerce_pages")
      .select("*")
      .eq("id", id)
      .single();

  if (!page) {
    notFound();
  }

  const item = page.data;

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold">
        Edit Page
      </h1>

      <form
        action={updatePage.bind(
          null,
          page.id
        )}
        className="mt-6 space-y-5"
      >
        <div>
          <Label>Title</Label>

          <Input
            name="title"
            defaultValue={
              item.title
            }
          />
        </div>

        <div>
          <Label>Slug</Label>

          <Input
            name="slug"
            defaultValue={
              item.slug
            }
          />
        </div>

        <div>
          <Label>
            Excerpt
          </Label>

          <Textarea
            name="excerpt"
            rows={4}
            defaultValue={
              item.excerpt
            }
          />
        </div>

        <div>
          <Label>
            Content HTML
          </Label>

          <Textarea
            name="body"
            rows={20}
            defaultValue={
              item.body
            }
          />
        </div>

        <Button type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
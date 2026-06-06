"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createPage(
  formData: FormData
) {
  const supabase = createSupabaseServerClient();

  const title = String(formData.get("title"));
  const slug = String(formData.get("slug"));
  const excerpt = String(
    formData.get("excerpt") || ""
  );
  const body = String(
    formData.get("body") || ""
  );

  const id = `page-${Date.now()}`;

  const data = {
    id,
    slug,
    title,
    excerpt,
    body,
    publishedAt:
      new Date().toISOString(),
  };

  const { error } = await supabase
    .from("ecommerce_pages")
    .insert({
      id,
      slug,
      sort_order: 0,
      data,
      published_at:
        new Date().toISOString(),
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/pages");
}

export async function updatePage(
  id: string,
  formData: FormData
) {
  const supabase =
    createSupabaseServerClient();

  const title = String(
    formData.get("title")
  );

  const slug = String(
    formData.get("slug")
  );

  const excerpt = String(
    formData.get("excerpt") || ""
  );

  const body = String(
    formData.get("body") || ""
  );

  const { data: page } =
    await supabase
      .from("ecommerce_pages")
      .select("*")
      .eq("id", id)
      .single();

  if (!page) {
    throw new Error("Page not found");
  }

  const json = page.data;

  json.title = title;
  json.slug = slug;
  json.excerpt = excerpt;
  json.body = body;

  const { error } = await supabase
    .from("ecommerce_pages")
    .update({
      slug,
      data: json,
      updated_at:
        new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/pages");
  revalidatePath(
    `/admin/pages/${id}`
  );
}

export async function deletePage(
  id: string
) {
  const supabase =
    createSupabaseServerClient();

  const { error } = await supabase
    .from("ecommerce_pages")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/pages");
}
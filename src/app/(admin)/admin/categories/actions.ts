"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createCategory(
  formData: FormData
) {
  const supabase = createSupabaseServerClient();

  const name = String(formData.get("name"));
  const slug = String(formData.get("slug"));

  const id = `cat-${Date.now()}`;

  const { error } = await supabase
    .from("ecommerce_categories")
    .insert({
      id,
      slug,
      sort_order: 0,
      data: {
        id,
        name,
        slug,
      },
    });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
}

export async function deleteCategory(
  id: string
) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from("ecommerce_categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
}
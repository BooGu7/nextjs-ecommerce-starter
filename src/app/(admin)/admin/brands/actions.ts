"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createBrand(formData: FormData) {
  const supabase = createSupabaseServerClient();

  const name = String(formData.get("name"));
  const slug = String(formData.get("slug"));
  const description = String(
    formData.get("description") || ""
  );

  const id = `brand-${Date.now()}`;

  const { error } = await supabase
    .from("ecommerce_brands")
    .insert({
      id,
      slug,
      sort_order: 0,
      data: {
        id,
        name,
        slug,
        description,
      },
    });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/brands");
}

export async function deleteBrand(id: string) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from("ecommerce_brands")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/brands");
}
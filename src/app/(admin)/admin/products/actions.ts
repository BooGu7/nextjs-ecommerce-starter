"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteProduct(id: string) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from("ecommerce_products")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");
}

export async function createProduct(formData: FormData) {
  const supabase = createSupabaseServerClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const inventory = Number(formData.get("inventory"));

  const id = `prod-${Date.now()}`;

  const data = {
    id,
    name,
    slug,
    description: "",
    status: "active",
    featured: false,
    rating: 0,
    reviewCount: 0,
    tags: [],
    images: [],
    variants: [
      {
        id: `var-${Date.now()}`,
        productId: id,
        name: "Default",
        sku: "",
        price,
        currency: "USD",
        images: [],
        options: [],
        inventory: {
          quantity: inventory,
          allowBackorder: false,
          trackInventory: true,
        },
      },
    ],
  };

  const { error } = await supabase
    .from("ecommerce_products")
    .insert({
      id,
      slug,
      status: "active",
      sort_order: 0,
      data,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");
}

export async function updateProduct(
  id: string,
  formData: FormData
) {
  const supabase = createSupabaseServerClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const inventory = Number(formData.get("inventory"));

  const { data: product } = await supabase
    .from("ecommerce_products")
    .select("*")
    .eq("id", id)
    .single();

  const json = product?.data || {};

  json.name = name;
  json.slug = slug;

  if (json.variants?.[0]) {
    json.variants[0].price = price;
    json.variants[0].inventory.quantity =
      inventory;
  }

  const { error } = await supabase
    .from("ecommerce_products")
    .update({
      slug,
      data: json,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
}
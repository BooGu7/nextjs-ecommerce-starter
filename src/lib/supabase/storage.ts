import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function uploadImage(
  file: File,
  folder = "products"
) {
  const supabase = createSupabaseServerClient();

  const filename =
    `${folder}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(filename, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("media")
    .getPublicUrl(filename);

  return publicUrl;
}
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop();

    const filename = `${uuid()}.${ext}`;

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const { error } = await supabase.storage
      .from("media")
      .upload(filename, buffer, {
        contentType: file.type,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("media")
      .getPublicUrl(filename);

    return NextResponse.json({
      url: data.publicUrl,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
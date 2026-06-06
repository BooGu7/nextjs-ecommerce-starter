import { NextResponse }
from "next/server";

import { supabaseAdmin }
from "@/lib/supabase/server";

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json();

    const {
      title,
      excerpt,
      content,
      featured_image,
    } = body;

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(
        /[^a-z0-9-]/g,
        ""
      );

    const { data, error } =
      await supabaseAdmin
        .from("posts")
        .insert({
          title,
          excerpt,
          content,
          featured_image,
          slug,
          status: "draft",
        })
        .select()
        .single();

    if (error) throw error;

    return NextResponse.json(
      data
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Create failed",
      },
      {
        status: 500,
      }
    );
  }
}
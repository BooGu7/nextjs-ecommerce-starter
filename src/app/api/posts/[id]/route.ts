import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } =
    await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const {
      title,
      excerpt,
      content,
      featured_image,
      status,
    } = body;

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const { data, error } =
      await supabaseAdmin
        .from("posts")
        .update({
          title,
          excerpt,
          content,
          featured_image,
          slug,
          status,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  const { error } =
    await supabaseAdmin
      .from("posts")
      .delete()
      .eq("id", id);

  if (error) {
    return NextResponse.json(
      error,
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}
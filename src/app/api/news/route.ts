import { NextRequest, NextResponse } from "next/server";
import { supabase, News } from "@/lib/supabase";

// GET all news or by category
export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");
    
    let query = supabase
      .from("news")
      .select("*")
      .order("createdAt", { ascending: false });

    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Get 2 news per category or limit to 2 if specific category
    const limitedData = category ? data?.slice(0, 2) : data;

    return NextResponse.json(limitedData || []);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

// POST new news (admin only)
export async function POST(request: NextRequest) {
  try {
    const password = request.headers.get("x-admin-password");
    
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: News = await request.json();

    const { data, error } = await supabase
      .from("news")
      .insert([
        {
          ...body,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}

// DELETE news (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const password = request.headers.get("x-admin-password");
    
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = request.nextUrl.searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }
}

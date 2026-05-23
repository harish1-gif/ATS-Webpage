// This endpoint is deprecated - manual news management only
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    message: "Weekly refresh disabled. Use admin panel for manual news management.",
    status: "deprecated"
  }, { status: 200 });
}


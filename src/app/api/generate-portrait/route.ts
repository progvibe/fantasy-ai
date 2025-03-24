import { type NextRequest, NextResponse } from "next/server";
import { generatePortraitHandler } from "~/server/api/generate-portrait";

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 },
      );
    }
    const formData = await req.json();
    const result = await generatePortraitHandler(formData);
    console.log("Result:", result);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate character portrait" },
      { status: 500 },
    );
  }
}

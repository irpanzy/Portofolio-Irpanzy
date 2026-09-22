import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    revalidateTag("portfolio-all");
    revalidatePath("/");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json(
      { revalidated: false, message: err?.message || "Revalidation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}

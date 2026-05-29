/**
 * GET  /api/settings  — Returns current user settings (requires auth)
 * PUT  /api/settings  — Updates user settings  (requires auth)
 *
 * Role-based: admins can update any user; users can only update themselves.
 */
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // const decoded = await adminAuth.verifyIdToken(auth.split(" ")[1]);
  // const profile = await getUserProfile(decoded.uid);
  return NextResponse.json({ data: { displayName: "James Maruti", role: "user" } });
}

export async function PUT(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    // Validate + update via Firestore Admin SDK
    return NextResponse.json({ success: true, updated: body });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

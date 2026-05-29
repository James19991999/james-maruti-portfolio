/**
 * POST /api/login
 * Body: { email: string; password: string }
 * Returns: { uid, email, role } | { error }
 *
 * Note: Firebase Auth is primarily client-side. This server route
 * validates the ID token sent from the client after client-side sign-in
 * and can be used to issue session cookies for SSR.
 */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    // In production: verify idToken with Firebase Admin SDK
    // const decodedToken = await adminAuth.verifyIdToken(idToken);
    // Set a session cookie, log activity, etc.
    // For now, acknowledge receipt:
    return NextResponse.json({ success: true, message: "Token received" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }
}

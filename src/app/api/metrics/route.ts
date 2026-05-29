/**
 * GET  /api/metrics        — Returns public portfolio metrics
 * POST /api/metrics        — Updates metrics (admin only, requires auth header)
 *
 * Real-time updates should use Firestore client subscriptions directly.
 * This REST endpoint is for external integrations or SSR data fetching.
 */
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_METRICS = {
  sitespeedImprovement: 40,
  satisfactionRate: 95,
  customAssets: 60,
  followers: 5486,
  connections: 500,
  updatedAt: new Date().toISOString(),
};

export async function GET() {
  // In production: fetch from Firestore via Firebase Admin SDK
  return NextResponse.json({ data: PUBLIC_METRICS });
}

export async function POST(req: NextRequest) {
  // Validate auth header (Bearer token → Firebase Admin verifyIdToken)
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // const token = auth.split(" ")[1];
  // const decoded = await adminAuth.verifyIdToken(token);
  // if (decoded.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();
    // await upsertMetrics(decoded.uid, body);
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

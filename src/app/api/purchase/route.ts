import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

const ALLOWED_HOURS = new Set([4, 8, 12]);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const hours = body?.hours;

  if (typeof hours !== "number" || !ALLOWED_HOURS.has(hours)) {
    return NextResponse.json(
      { error: "Invalid hours. Allowed: 4, 8, 12." },
      { status: 400 }
    );
  }

  const updated = await prisma.user.update({
    where: { email: session.user.email },
    data: { remainingHours: { increment: hours } },
    select: { remainingHours: true },
  });

  return NextResponse.json({ ok: true, remainingHours: updated.remainingHours });
}

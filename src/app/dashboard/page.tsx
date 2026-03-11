import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      remainingHours: true,
    },
  });

  if (!user) {
    redirect("/auth");
  }

  return (
    <main style={{ padding: 40, maxWidth: 800 }}>
      <h1>Dashboard</h1>

      <p style={{ marginTop: 8 }}>
        Welcome, {user.name ?? user.email}!
      </p>

      <div
        style={{
          marginTop: 20,
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          maxWidth: 400,
        }}
      >
        <strong>Hours available:</strong> {user.remainingHours}
      </div>

      <p style={{ marginTop: 16 }}>
        Need more hours? <a href="/pricing">Buy a bundle →</a>
      </p>

      <div style={{ marginTop: 24 }}>
        <LogoutButton />
      </div>
    </main>
  );
}

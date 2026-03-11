import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function ServicesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Services</h1>
      <p>Welcome! Here are our STEM & Engineering tutoring services.</p>
    </main>
  );
}

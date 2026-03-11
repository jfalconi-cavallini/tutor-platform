import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import BundlePicker from "./BundlePicker";

export default async function PricingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  return (
    <main style={{ padding: 40, maxWidth: 900 }}>
      <h1 style={{ fontSize: 36, marginBottom: 10 }}>Buy Tutoring Hours</h1>
      <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
        Choose one of our hour bundles. (Payments are mocked for now — we’re
        building the flow first.)
      </p>

      <BundlePicker />
    </main>
  );
}

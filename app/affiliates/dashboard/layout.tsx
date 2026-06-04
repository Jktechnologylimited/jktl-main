import { getSession } from "@/lib/affiliate-auth";
import { redirect } from "next/navigation";
import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/affiliates/login");
  if (session.status === "pending") redirect("/affiliates/pending");
  if (session.status === "rejected") redirect("/login?rejected=1");

  return (
    <DashboardShell session={{
      firstName: session.firstName,
      lastName: session.lastName,
      email: session.email,
      referralCode: session.referralCode,
      tier: session.tier,
    }}>
      {children}
    </DashboardShell>
  );
}

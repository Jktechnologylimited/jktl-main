// Server component -- but we defer actual auth to client side
// This avoids the AUTH_SECRET cross-project JWT decryption issue
import ClientDashboardLayout from "./ClientDashboardLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
}

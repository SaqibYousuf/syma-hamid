import AdminShell from "@/components/admin/AdminShell";
import { requireAdminPage } from "@/lib/auth";

export default async function AdminPanelLayout({ children }) {
  const admin = await requireAdminPage();
  return <AdminShell username={admin.username}>{children}</AdminShell>;
}

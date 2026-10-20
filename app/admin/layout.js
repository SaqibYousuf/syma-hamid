export const metadata = {
  title: { default: "Admin", template: "%s | Admin · Dr. Syma Hamid" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-dvh bg-[#F6F2EA] font-urbanist text-[#1C2E22]">{children}</div>;
}

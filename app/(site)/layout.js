import Navbar from "@/components/constants/navbar";
import Footer from "@/components/constants/footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex-1 overflow-x-clip">{children}</div>
      <Footer />
    </>
  );
}

import Footer from "../_components/footer";
import HeaderComponent from "../_components/header";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderComponent />
      {children}
      <Footer />
    </div>
  );
}

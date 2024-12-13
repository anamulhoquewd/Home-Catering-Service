import Footer from "../components/footer";
import HeaderComponent from "../components/header";



export default function PackageLayout({
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

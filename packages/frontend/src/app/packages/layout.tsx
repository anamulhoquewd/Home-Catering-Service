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
    </div>
  );
}

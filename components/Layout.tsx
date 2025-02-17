import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className={`max-w-screen-xl mx-auto py-6 px-4 ${className}`}>
        {children}
      </main>
    </div>
  );
}

import { ReactNode } from "react";
import BottomNav from "@/components/BottomNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;

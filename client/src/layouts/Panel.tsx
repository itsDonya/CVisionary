import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/user/Sidebar";

const PanelLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 md:ml-[280px] p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Outlet />
      </main>
    </div>
  );
};

export default PanelLayout;

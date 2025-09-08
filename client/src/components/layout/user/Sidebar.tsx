import { useState } from "react";
import { Plus, Menu, Gauge, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "@/types/user";

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/panel",
    icon: <Gauge size={18} />,
  },
  {
    id: "create-resume",
    label: "Create Resume",
    path: "/panel/resume/create",
    icon: <Plus size={18} />,
  },
];

const SIDEBAR_WIDTH = 280;

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="w-full flex flex-col gap-8 p-6 h-full">
      <div className="flex items-center gap-3 px-2">
        <p className="text-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold">
          CVisionary
        </p>
      </div>

      <nav className="w-full flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={onItemClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-br from-purple-500/10 to-cyan-400/10 border border-purple-500/20 text-purple-400 font-semibold"
                  : "text-slate-400 hover:bg-purple-500/8 hover:border-purple-500/10 hover:text-slate-200 border border-transparent"
              }`}>
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-5 left-5 z-50 p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-600/20 rounded-xl text-slate-200 hover:bg-slate-800/90 hover:text-white transition-colors">
        <Menu size={20} />
      </button>

      <div
        className="hidden md:flex w-[280px] h-screen bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/20 fixed left-0 top-0"
        style={{ width: SIDEBAR_WIDTH }}>
        <SidebarContent />
      </div>

      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobile}
        />
      )}

      <div
        className={`md:hidden fixed left-0 top-0 h-screen w-[280px] bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/20 z-50 transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <button
          onClick={toggleMobile}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <SidebarContent onItemClick={toggleMobile} />
      </div>
    </>
  );
};

export default Sidebar;

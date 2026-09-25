import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../Components/Sidebar";

export default function DashboardLayout({ children, role = "candidate" }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      <Sidebar
        role={role}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="lg:pl-64">

        {/* Mobile header */}

        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-white/5 bg-[#050505]/80 px-5 backdrop-blur-xl lg:hidden">

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 hover:bg-white/5"
          >
            <Menu size={21} />
          </button>

          <span className="ml-3 font-semibold">
            Hire<span className="text-zinc-500">Flow</span>
          </span>

        </header>

        <main className="min-h-screen p-5 sm:p-8 lg:p-10">
          {children}
        </main>

      </div>

    </div>
  );
}
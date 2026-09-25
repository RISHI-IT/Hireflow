import {
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({
  role = "candidate",
  mobileOpen,
  setMobileOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const isRecruiter = role === "recruiter";

  const candidateLinks = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/candidate/dashboard",
    },
    {
      label: "Find Jobs",
      icon: Search,
      path: "/jobs",
    },
    {
      label: "Applications",
      icon: FileText,
      path: "/applications",
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  const recruiterLinks = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/recruiter/dashboard",
    },
    {
      label: "Manage Jobs",
      icon: BriefcaseBusiness,
      path: "/recruiter/jobs",
    },
    {
      label: "Post Job",
      icon: Plus,
      path: "/recruiter/jobs/new",
    },
    {
      label: "Candidates",
      icon: Users,
      path: "/recruiter/candidates",
    },
  ];

  const links = isRecruiter ? recruiterLinks : candidateLinks;

  function isActive(path) {
    return location.pathname === path;
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");

    navigate("/login");
  }

  return (
    <>
      {/* Mobile overlay */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
          border-r border-white/5 bg-[#080808]
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-white/5 px-6">

          <Link
            to={isRecruiter ? "/recruiter/dashboard" : "/candidate/dashboard"}
            className="text-xl font-bold tracking-tight"
            onClick={() => setMobileOpen(false)}
          >
            Hire<span className="text-zinc-500">Flow</span>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>

        </div>

        {/* Role */}

        <div className="px-5 pt-6">

          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
            {isRecruiter ? "Recruitment" : "Workspace"}
          </p>

        </div>

        {/* Navigation */}

        <nav className="mt-3 flex-1 space-y-1 px-3">

          {links.map((item) => {

            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 text-sm
                  transition-all duration-200
                  ${
                    active
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-white"
                  }
                `}
              >

                <Icon size={18} />

                <span>{item.label}</span>

              </Link>
            );
          })}

        </nav>

        {/* Bottom */}

        <div className="border-t border-white/5 p-3">

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  );
}
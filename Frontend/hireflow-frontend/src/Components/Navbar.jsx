import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="glass rounded-2xl px-5 py-3">

          <div className="flex items-center justify-between">

            <Link
              to="/"
              className="text-xl font-bold tracking-tight"
            >
              Hire<span className="text-zinc-500">Flow</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">

              <Link
                to="/jobs"
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                Find Jobs
              </Link>

              <Link
                to="/login"
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="group flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Get Started
                <ArrowRight
                  size={15}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden"
            >
              {open ? <X /> : <Menu />}
            </button>

          </div>

          {open && (
            <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 md:hidden">

              <Link to="/jobs">
                Find Jobs
              </Link>

              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Get Started
              </Link>

            </div>
          )}

        </div>
      </div>
    </motion.nav>
  );
}
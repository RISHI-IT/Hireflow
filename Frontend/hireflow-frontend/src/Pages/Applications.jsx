import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  ChevronRight,
} from "lucide-react";

import DashboardLayout from "../Layouts/DashboardLayout";

const applications = [
  {
    company: "NovaTech",
    role: "Python Backend Developer",
    date: "Sep 2, 2026",
    status: "Interview",
  },
  {
    company: "PixelLabs",
    role: "React Frontend Developer",
    date: "Aug 29, 2026",
    status: "Under Review",
  },
  {
    company: "Vertex Systems",
    role: "Full Stack Developer",
    date: "Aug 24, 2026",
    status: "Applied",
  },
  {
    company: "CloudForge",
    role: "Django Developer",
    date: "Aug 20, 2026",
    status: "Rejected",
  },
];

const statusStyles = {
  Interview: "bg-white text-black",
  "Under Review": "bg-white/10 text-zinc-300",
  Applied: "bg-white/5 text-zinc-400",
  Rejected: "bg-white/[0.03] text-zinc-600",
};

export default function Applications() {
  return (
    <DashboardLayout>

      <div className="mx-auto max-w-6xl">

        <div>

          <p className="text-sm text-zinc-600">
            Candidate
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Applications
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Track every opportunity you've applied to.
          </p>

        </div>

        <div className="mt-8 space-y-3">

          {applications.map((application, index) => (
            <motion.div
              key={application.role}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="glass rounded-2xl p-5 transition hover:bg-white/[0.05]"
            >

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                <div className="flex flex-1 items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <Briefcase size={20} />
                  </div>

                  <div>

                    <h2 className="font-semibold">
                      {application.role}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      {application.company}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-6">

                  <div className="hidden items-center gap-2 text-xs text-zinc-600 sm:flex">
                    <Calendar size={14} />
                    {application.date}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs ${
                      statusStyles[application.status]
                    }`}
                  >
                    {application.status}
                  </span>

                  <ChevronRight
                    size={18}
                    className="text-zinc-600"
                  />

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}
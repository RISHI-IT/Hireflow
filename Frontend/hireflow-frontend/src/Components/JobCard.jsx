import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
      className="glass group rounded-2xl p-6"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-lg font-bold">
          {job.company.charAt(0)}
        </div>

        <ArrowUpRight
          size={19}
          className="text-zinc-600 transition group-hover:text-white"
        />

      </div>

      <h3 className="mt-6 text-lg font-semibold">
        {job.title}
      </h3>

      <p className="mt-1 text-sm text-zinc-500">
        {job.company}
      </p>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-zinc-500">

        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {job.location}
        </span>

        <span className="flex items-center gap-1">
          <Briefcase size={14} />
          {job.type}
        </span>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-zinc-400">
          {job.salary}
        </span>

        <Link
          to={`/jobs/${job.id}`}
          className="text-sm font-medium text-white hover:underline"
        >
          View role
        </Link>

      </div>

    </motion.div>
  );
}
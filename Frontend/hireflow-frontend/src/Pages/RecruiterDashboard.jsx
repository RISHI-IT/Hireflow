import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MoreHorizontal,
  Plus,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import API from "../api/api";

export default function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchRecruiterJobs = async () => {
    try {
      const response = await API.get("my-jobs/");

      setJobs(response.data);
    } catch (err) {
      console.error("Failed to fetch recruiter jobs:", err);
      setError("Failed to load your jobs.");
    } finally {
      setLoading(false);
    }
  };

  fetchRecruiterJobs();
}, []);
  return (
    <DashboardLayout role="recruiter">

      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>

            <p className="text-sm text-zinc-600">
              Recruitment
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Manage jobs
            </h1>

          </div>

          <Link
            to="/recruiter/jobs/new"
            className="flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            <Plus size={17} />
            Post job
          </Link>

        </div>

        {loading && (
          <div className="mt-8 text-sm text-zinc-500">
            Loading jobs...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="mt-8 glass rounded-2xl p-8 text-center">
            <p className="text-zinc-500">
              You haven't posted any jobs yet.
            </p>

            <Link
              to="/recruiter/jobs/new"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              <Plus size={17} />
              Post your first job
            </Link>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">

            {jobs.map((job, index) => (

              <motion.div
                key={job.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="glass rounded-2xl p-6"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="font-semibold">
                      {job.title}
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                      {job.location}
                    </p>

                  </div>

                  <button className="text-zinc-600 hover:text-white">
                    <MoreHorizontal size={20} />
                  </button>

                </div>

                <div className="mt-7 flex items-center justify-between">

                  <div className="flex items-center gap-2 text-sm text-zinc-500">

                    <Users size={16} />

                    0 applications

                  </div>

                  <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-zinc-400">
                    {job.job_type}
                  </span>

                </div>

              </motion.div>

            ))}

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}
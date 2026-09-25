import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Clock3,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function CandidateDashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const token = localStorage.getItem("access_token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [applicationsResponse, jobsResponse] = await Promise.all([
        API.get("my-applications/", config),
        API.get("jobs/", config),
      ]);

      setApplications(applicationsResponse.data);
      setJobs(jobsResponse.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  }

  function getJobDetails(jobId) {
    return jobs.find((job) => job.id === jobId);
  }

  const recentApplications = applications.slice(0, 5);

  const stats = [
    {
      label: "Applications",
      value: applications.length,
      icon: Briefcase,
    },
    {
      label: "Interviews",
      value: 0,
      icon: Clock3,
    },
    {
      label: "Profile views",
      value: 0,
      icon: Eye,
    },
    {
      label: "Offers",
      value: 0,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>

            <p className="text-sm text-zinc-500">
              Candidate Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Welcome back.
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Here's what's happening with your job search.
            </p>

          </div>

          <button
            onClick={() => navigate("/jobs")}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Find jobs
          </button>

        </div>

        {/* Stats */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
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

                <div className="flex items-center justify-between">

                  <span className="text-sm text-zinc-500">
                    {stat.label}
                  </span>

                  <Icon
                    size={18}
                    className="text-zinc-600"
                  />

                </div>

                <p className="mt-4 text-3xl font-bold">
                  {stat.value}
                </p>

              </motion.div>
            );
          })}

        </div>

        {/* Content */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Applications */}

          <div className="glass rounded-2xl p-6 lg:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold">
                  Recent applications
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Track your latest applications.
                </p>

              </div>

              <ArrowUpRight
                size={18}
                className="text-zinc-500"
              />

            </div>

            <div className="mt-6 space-y-3">

              {loading && (
                <p className="py-8 text-center text-sm text-zinc-500">
                  Loading applications...
                </p>
              )}

              {!loading && recentApplications.length === 0 && (
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8 text-center">

                  <p className="text-zinc-400">
                    You haven't applied for any jobs yet.
                  </p>

                  <button
                    onClick={() => navigate("/jobs")}
                    className="mt-4 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200"
                  >
                    Find jobs
                  </button>

                </div>
              )}

              {!loading &&
                recentApplications.map((application) => {

                  const job = getJobDetails(application.job);

                  return (
                    <div
                      key={application.id}
                      className="flex flex-col justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:flex-row sm:items-center"
                    >

                      <div>

                        <p className="font-medium">
                          {job?.title || `Job #${application.job}`}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          {job?.company || "Company"}
                        </p>

                      </div>

                      <span className="w-fit rounded-full bg-white/[0.06] px-3 py-1 text-xs capitalize text-zinc-400">
                        {application.status}
                      </span>

                    </div>
                  );
                })}

            </div>

          </div>

          {/* Profile */}

          <div className="glass rounded-2xl p-6">

            <h2 className="text-lg font-semibold">
              Profile
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Keep your profile updated for recruiters.
            </p>

            <div className="mt-8">

              <div className="flex justify-between text-sm">

                <span className="text-zinc-500">
                  Applications
                </span>

                <span>
                  {applications.length}
                </span>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: applications.length > 0 ? "100%" : "0%",
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full rounded-full bg-white"
                />

              </div>

            </div>

            <button
              onClick={() => navigate("/jobs")}
              className="mt-8 w-full rounded-xl border border-white/10 py-3 text-sm hover:bg-white/[0.05]"
            >
              Browse jobs
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
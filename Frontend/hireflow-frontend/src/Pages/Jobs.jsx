import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "../Components/Navbar";
import JobCard from "../Components/Jobcard";
import API from "../api/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const token = localStorage.getItem("access_token");

      const response = await API.get("jobs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(response.data);
    } catch (error) {
      console.error(error);
      setError("Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-36">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <p className="text-sm text-zinc-500">
            Opportunities
          </p>

          <h1 className="mt-2 text-4xl font-bold sm:text-6xl">
            Find your next role.
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-500">
            Discover opportunities from companies looking for
            ambitious people like you.
          </p>

        </motion.div>

        {/* Search */}

        <div className="mt-10 flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
            />

            <input
              placeholder="Search jobs, skills or companies..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 outline-none focus:border-white/20"
            />

          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm text-zinc-400 hover:bg-white/[0.05]">
            <SlidersHorizontal size={17} />
            Filters
          </button>

        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-10 text-center text-zinc-500">
            Loading jobs...
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-10 text-center text-red-400">
            {error}
          </div>
        )}

        {/* Jobs */}

        {!loading && !error && (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

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
              >
                <JobCard job={job} />
              </motion.div>
            ))}

          </div>
        )}

        {/* No jobs */}

        {!loading && !error && jobs.length === 0 && (
          <div className="mt-10 text-center text-zinc-500">
            No jobs available.
          </div>
        )}

      </main>

    </div>
  );
}


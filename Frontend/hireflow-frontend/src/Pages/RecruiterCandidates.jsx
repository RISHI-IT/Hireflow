import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Download,
  Search,
  UserRound,
} from "lucide-react";

import DashboardLayout from "../Layouts/DashboardLayout";
import API from "../api/api";

export default function RecruiterCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await API.get("recruiter-applications/");


        setCandidates(response.data);
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
        setError("Failed to load candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const updateStatus = async (applicationId, status) => {
    try {
      await API.patch(
        `applications/${applicationId}/status/`,
        { status }
      );

      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate.id === applicationId
            ? { ...candidate, status }
            : candidate
        )
      );
    } catch (err) {
      console.error("Failed to update application status:", err);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const query = search.toLowerCase();

    return (
      candidate.applicant_name?.toLowerCase().includes(query) ||
      candidate.applicant_email?.toLowerCase().includes(query) ||
      candidate.job_title?.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout role="recruiter">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <p className="text-sm text-zinc-600">
              Recruitment
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Candidates
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Review and manage candidates across your roles.
            </p>
          </div>

          <button className="flex w-fit items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-400 hover:bg-white/[0.04]">
            <Download size={17} />
            Export
          </button>

        </div>

        {/* Search */}

        <div className="relative mt-8 max-w-xl">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 outline-none focus:border-white/30"
          />

        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-8 text-sm text-zinc-500">
            Loading candidates...
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          filteredCandidates.length === 0 && (
            <div className="glass mt-6 rounded-2xl p-8 text-center">
              <p className="text-zinc-500">
                {search
                  ? "No candidates found."
                  : "No candidates have applied yet."}
              </p>
            </div>
          )}

        {/* Candidate List */}

        {!loading &&
          !error &&
          filteredCandidates.length > 0 && (
            <div className="mt-6 space-y-3">

              {filteredCandidates.map((candidate, index) => (

                <motion.div
                  key={candidate.id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="glass rounded-2xl p-5"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* Candidate */}

                    <div className="flex flex-1 items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                        <UserRound size={20} />
                      </div>

                      <div>

                        <p className="font-semibold">
                          {candidate.applicant_name}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          {candidate.job_title}
                        </p>

                      </div>

                    </div>

                    {/* Email */}

                    <div className="text-sm text-zinc-500">
                      {candidate.applicant_email}
                    </div>

                    {/* Status */}

                    <span className="w-fit rounded-full bg-white/[0.06] px-3 py-1.5 text-xs capitalize text-zinc-400">
                      {candidate.status}
                    </span>

                    {/* Actions */}

                    <div className="flex gap-2">

                      {/* Accept */}

                      <button
                        onClick={() =>
                          updateStatus(
                            candidate.id,
                            "accepted"
                          )
                        }
                        disabled={candidate.status === "accepted"}
                        title="Accept"
                        className="rounded-lg border border-white/10 p-2 text-zinc-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Check size={17} />
                      </button>

                      {/* Reject */}

                      <button
                        onClick={() =>
                          updateStatus(
                            candidate.id,
                            "rejected"
                          )
                        }
                        disabled={candidate.status === "rejected"}
                        title="Reject"
                        className="rounded-lg border border-white/10 p-2 text-zinc-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ChevronDown size={17} />
                      </button>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>
          )}

      </div>
    </DashboardLayout>
  );
}
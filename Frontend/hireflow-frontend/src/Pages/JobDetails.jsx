import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  MapPin,
  Send,
  Upload,
  X,
} from "lucide-react";
import API from "../api/api";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobError, setJobError] = useState("");

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Get real job from Django
  useEffect(() => {
    fetchJob();
  }, [id]);

  async function fetchJob() {
    try {
      setLoading(true);
      setJobError("");

      const token = localStorage.getItem("access_token");

      const response = await API.get(`jobs/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJob(response.data);
    } catch (error) {
      console.error(error);
      setJobError("Unable to load this job.");
    } finally {
      setLoading(false);
    }
  }

  function handleResumeChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF or Word document.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Resume must be smaller than 5MB.");
      return;
    }

    setResume(file);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const token = localStorage.getItem("access_token");

      await API.post(
        "applications/",
        {
          job: Number(id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmitted(true);

      setTimeout(() => {
        setIsApplyOpen(false);
        setSubmitted(false);
        setResume(null);
        setCoverLetter("");
        setError("");
      }, 1800);
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        console.error("Backend error:", error.response.data);
      }

      setError(
        error.response?.data?.detail ||
          "Unable to submit application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function closeModal() {
    if (submitted || submitting) return;

    setIsApplyOpen(false);
    setError("");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-zinc-500">
        Loading job...
      </div>
    );
  }

  if (jobError || !job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white">
        <p className="text-red-400">
          {jobError || "Job not found."}
        </p>

        <button
          onClick={() => window.history.back()}
          className="mt-5 flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to jobs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 -top-50 h-125 w-125 -translate-x-1/2 rounded-full bg-white/4 blur-[120px]" />
      </div>

      {/* Top navigation */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to jobs
        </button>
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">

        {/* Job header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass glow rounded-3xl p-8 md:p-10"
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row">

            <div>

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
                <BriefcaseBusiness size={25} />
              </div>

              <p className="mb-2 text-sm font-medium text-zinc-500">
                {job.company}
              </p>

              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                {job.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-400">

                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {job.location}
                </span>

                <span>•</span>

                <span>
                  {job.job_type || "Not specified"}
                </span>

                {job.salary && (
                  <>
                    <span>•</span>

                    <span>
                      ₹{job.salary}
                    </span>
                  </>
                )}

              </div>

            </div>

            {/* APPLY BUTTON */}
            <div className="flex items-start">

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsApplyOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-black shadow-xl shadow-white/5 transition hover:bg-zinc-200"
              >
                <Send size={17} />
                Apply now
              </motion.button>

            </div>

          </div>
        </motion.section>

        {/* Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">

          <section className="space-y-8">

            {/* Description */}
            <div className="glass rounded-3xl p-8">

              <h2 className="mb-4 text-xl font-semibold">
                About the role
              </h2>

              <p className="leading-8 text-zinc-400">
                {job.description}
              </p>

            </div>

          </section>

          {/* Sidebar */}
          <aside className="glass h-fit rounded-3xl p-7">

            <p className="text-sm text-zinc-500">
              Salary
            </p>

            <p className="mt-1 text-xl font-semibold">
              {job.salary ? `₹${job.salary}` : "Not specified"}
            </p>

            <div className="my-6 h-px bg-white/8" />

            <p className="text-sm text-zinc-500">
              Location
            </p>

            <p className="mt-1 font-medium">
              {job.location}
            </p>

            <div className="my-6 h-px bg-white/8" />

            <p className="text-sm text-zinc-500">
              Employment
            </p>

            <p className="mt-1 font-medium">
              {job.job_type || "Not specified"}
            </p>

          </aside>

        </div>
      </main>

      {/* APPLY MODAL */}
      <AnimatePresence>

        {isApplyOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-2xl"
            >

              {!submitted ? (
                <>

                  {/* Modal header */}
                  <div className="flex items-center justify-between border-b border-white/8 p-6">

                    <div>

                      <h2 className="text-xl font-semibold">
                        Apply for this role
                      </h2>

                      <p className="mt-1 text-sm text-zinc-500">
                        {job.title} · {job.company}
                      </p>

                    </div>

                    <button
                      onClick={closeModal}
                      className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/6 hover:text-white"
                    >
                      <X size={20} />
                    </button>

                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                  >

                    {/* Resume */}
                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        Resume{" "}
                        <span className="text-zinc-500">
                          *
                        </span>
                      </label>

                      <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/2.5 px-6 py-10 transition hover:border-white/30 hover:bg-white/4">

                        {resume ? (
                          <>
                            <FileText
                              size={30}
                              className="mb-3 text-white"
                            />

                            <p className="text-sm font-medium">
                              {resume.name}
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              {(resume.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <Upload
                              size={30}
                              className="mb-3 text-zinc-500 transition group-hover:text-white"
                            />

                            <p className="text-sm font-medium">
                              Upload your resume
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              PDF or Word · Maximum 5MB
                            </p>
                          </>
                        )}

                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeChange}
                          className="hidden"
                        />

                      </label>

                    </div>

                    {/* Cover letter */}
                    <div>

                      <label
                        htmlFor="coverLetter"
                        className="mb-2 block text-sm font-medium"
                      >
                        Cover letter
                      </label>

                      <textarea
                        id="coverLetter"
                        value={coverLetter}
                        onChange={(e) =>
                          setCoverLetter(e.target.value)
                        }
                        rows={6}
                        placeholder="Tell the recruiter why you're a great fit..."
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-white/25"
                      />

                    </div>

                    {/* Error */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button
                      whileHover={{ scale: submitting ? 1 : 1.01 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      <Send size={17} />

                      {submitting
                        ? "Submitting..."
                        : "Submit application"}

                    </motion.button>

                  </form>

                </>
              ) : (

                /* SUCCESS STATE */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center px-8 py-20 text-center"
                >

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.1,
                    }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white text-black"
                  >
                    <CheckCircle2 size={38} />
                  </motion.div>

                  <h2 className="text-2xl font-semibold">
                    Application submitted!
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
                    Your application for {job.title} at{" "}
                    {job.company} has been submitted successfully.
                  </p>

                </motion.div>

              )}

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}
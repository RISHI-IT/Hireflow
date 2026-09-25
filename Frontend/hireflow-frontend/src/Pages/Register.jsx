import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    navigate("/candidate/dashboard");
  }

  return (
    <div className="grid-background flex min-h-screen items-center justify-center bg-[#050505] px-6 py-10">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="w-full max-w-lg"
      >

        <Link
          to="/"
          className="mb-8 flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="glass rounded-3xl p-8">

          <h1 className="text-3xl font-bold">
            Create your account
          </h1>

          <p className="mt-2 text-zinc-500">
            Join HireFlow and start your next chapter.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <input
              required
              placeholder="Full name"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
            />

            <input
              required
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
            />

            <input
              required
              type="password"
              placeholder="Create password"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
            />

            <select
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3.5 text-zinc-300 outline-none focus:border-white/30"
            >
              <option value="candidate">
                I am looking for a job
              </option>

              <option value="recruiter">
                I am hiring candidates
              </option>
            </select>

            <button
              type="submit"
              className="w-full rounded-xl bg-white py-3.5 font-semibold text-black transition hover:bg-zinc-200"
            >
              Create account
            </button>

          </form>

          <p className="mt-7 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>

      </motion.div>

    </div>
  );
}
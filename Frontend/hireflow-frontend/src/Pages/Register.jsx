import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "job_seeker",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.post("register/", formData);

      alert("Account created successfully!");

      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);

      if (err.response?.data) {
        const data = err.response.data;

        if (data.username) {
          setError(data.username[0]);
        } else if (data.email) {
          setError(data.email[0]);
        } else if (data.password) {
          setError(data.password[0]);
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setError("Unable to create account. Please check your details.");
        }
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
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
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
            />

            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
            />

            <input
              required
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3.5 text-zinc-300 outline-none focus:border-white/30"
            >
              <option value="job_seeker">
                I am looking for a job
              </option>

              <option value="recruiter">
                I am hiring candidates
              </option>
            </select>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white py-3.5 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
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
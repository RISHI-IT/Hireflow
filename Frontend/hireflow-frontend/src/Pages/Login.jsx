import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    try {
      const response = await API.post("login/", {
        username: username,
        password: password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("role", role);

      if (role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/candidate/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  }

  return (
    <div className="grid-background flex min-h-screen items-center justify-center bg-[#050505] px-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="mb-8 flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to HireFlow
        </Link>

        <div className="glass rounded-3xl p-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Sign in to continue to your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Username
              </label>

              <input
                name="username"
                type="text"
                required
                placeholder="testuser"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Password
              </label>

              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Continue as
              </label>

              <select
                name="role"
                id="role"
                className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3.5 text-zinc-300 outline-none focus:border-white/30"
              >
                <option value="candidate">Candidate</option>

                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-white py-3.5 font-semibold text-black hover:bg-zinc-200"
            >
              Sign in
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-white hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

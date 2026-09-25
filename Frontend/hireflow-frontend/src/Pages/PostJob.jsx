import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BriefcaseBusiness, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../Layouts/DashboardLayout";
import API from "../api/api";

export default function PostJob() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "full_time",
    salary: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await API.post("jobs/", {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        job_type: formData.job_type,
        salary: formData.salary || null,
        description: formData.description,
      });

      navigate("/recruiter/dashboard");
    } catch (err) {
      console.error("Failed to post job:", err);

      if (err.response?.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : JSON.stringify(err.response.data)
        );
      } else {
        setError("Failed to publish job. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout role="recruiter">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/recruiter/dashboard"
          className="mb-8 flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div>
          <p className="text-sm text-zinc-600">Recruitment</p>

          <h1 className="mt-1 text-3xl font-bold">
            Post a new job
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Find the right person for your team.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="glass mt-8 rounded-3xl p-6 sm:p-8"
        >
          <Section title="Basic information">
            <Field
              label="Job title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Python Backend Developer"
            />

            <Field
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Chennai, India"
              />

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Employment type
                </label>

                <select
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3.5 text-zinc-300 outline-none focus:border-white/30"
                >
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>
          </Section>

          <Section title="Compensation">
            <Field
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="50000"
              type="number"
            />
          </Section>

          <Section title="Job description">
            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role..."
            />
          </Section>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />

            {loading ? "Publishing..." : "Publish job"}
          </button>
        </motion.form>
      </div>
    </DashboardLayout>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-8 border-b border-white/5 pb-8 last:border-0">
      <div className="mb-6 flex items-center gap-3">
        <BriefcaseBusiness size={18} className="text-zinc-500" />

        <h2 className="font-semibold">
          {title}
        </h2>
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <input
        required
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <textarea
        required
        name={name}
        value={value}
        onChange={onChange}
        rows={6}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
      />
    </div>
  );
}
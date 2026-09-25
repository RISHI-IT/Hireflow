import { motion } from "framer-motion";
import {
  Camera,
  Mail,
  MapPin,
  Phone,
  Save,
} from "lucide-react";

import DashboardLayout from "../Layouts/DashboardLayout";

export default function Profile() {
  return (
    <DashboardLayout>

      <div className="mx-auto max-w-5xl">

        <div>

          <p className="text-sm text-zinc-600">
            Account
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Your profile
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Keep your professional profile up to date.
          </p>

        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-8 glass rounded-3xl p-6 sm:p-8"
        >

          {/* Profile header */}

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            <div className="relative">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-black">
                A
              </div>

              <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-black bg-white text-black">
                <Camera size={15} />
              </button>

            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Alex Johnson
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Python Developer
              </p>

              <p className="mt-2 text-xs text-zinc-600">
                Profile strength: 82%
              </p>

            </div>

          </div>

          <div className="my-8 h-px bg-white/5" />

          {/* Form */}

          <div className="grid gap-5 md:grid-cols-2">

            <Input
              label="Full name"
              value="Alex Johnson"
            />

            <Input
              label="Email"
              value="alex@example.com"
              icon={<Mail size={16} />}
            />

            <Input
              label="Phone"
              value="+91 98765 43210"
              icon={<Phone size={16} />}
            />

            <Input
              label="Location"
              value="Chennai, India"
              icon={<MapPin size={16} />}
            />

          </div>

          <div className="mt-5">

            <label className="mb-2 block text-sm text-zinc-400">
              Professional headline
            </label>

            <input
              defaultValue="Python & Django Developer | REST APIs | PostgreSQL"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
            />

          </div>

          <div className="mt-5">

            <label className="mb-2 block text-sm text-zinc-400">
              About
            </label>

            <textarea
              rows={5}
              defaultValue="Passionate software developer focused on building scalable web applications using Python, Django and modern frontend technologies."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none focus:border-white/30"
            />

          </div>

          <button className="mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200">
            <Save size={17} />
            Save changes
          </button>

        </motion.div>

      </div>

    </DashboardLayout>
  );
}

function Input({ label, value, icon }) {
  return (
    <div>

      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
            {icon}
          </span>
        )}

        <input
          defaultValue={value}
          className={`w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pr-4 outline-none focus:border-white/30 ${
            icon ? "pl-11" : "px-4"
          }`}
        />

      </div>

    </div>
  );
}
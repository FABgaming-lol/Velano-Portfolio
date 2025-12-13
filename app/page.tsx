"use client";

import { motion } from "framer-motion";

/* ================= MOTION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Page() {
  return (
    <main className="bg-main text-white">

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-6xl mx-auto text-center"
        >
          <span className="uppercase text-xs tracking-[0.35em] text-gray-400">
            AVOLIRO / VELANO
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano engineers scalable digital systems for brands that operate seriously.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* SYSTEMS */}
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-16"
          >
            What Velano Engineers
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {systems.map((s) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="surface rounded-xl p-8 border border-white/10 depth hover:-translate-y-1 transition-transform"
              >
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section className="px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth"
        >
          <h2 className="text-3xl font-bold mb-6">
            Engage Velano
          </h2>

          <p className="text-gray-400 mb-10">
            This is for teams that build for the long term.
          </p>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-14 py-4 rounded-lg bg-white text-black font-semibold hover:-translate-y-1 transition-transform"
          >
            Initiate Contact
          </a>
        </motion.div>
      </section>

    </main>
  );
}

/* ================= HELPERS ================= */

function Divider() {
  return <div className="divider" />;
}

const systems = [
  {
    title: "Interface Architecture",
    desc: "Brand-driven UI systems with structure and intent.",
  },
  {
    title: "Front-End Engineering",
    desc: "Performance-first, scalable front-end systems.",
  },
  {
    title: "AI-Accelerated Delivery",
    desc: "Speed without compromise using AI workflows.",
  },
  {
    title: "Scalable Codebases",
    desc: "Clean, maintainable systems built to grow.",
  },
];

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ================= MOTION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

function CountUp({ value }: { value: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const rounded = useTransform(scrollYProgress, [0, 1], [0, value]);

  return (
    <motion.span ref={ref}>
      <motion.span>
        {rounded.to((latest) => Math.floor(latest))}
      </motion.span>
    </motion.span>
  );
}

/* ================= PAGE ================= */

export default function Page() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-main text-white">

      {/* SCROLL PROGRESS */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50"
      />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm tracking-widest font-semibold">
            AVOLIRO<span className="accent"> / </span>VELANO
          </span>
          <a
            href="#contact"
            className="text-sm px-4 py-2 border border-white/20 rounded-md hover:bg-white hover:text-black transition"
          >
            Engage
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 pt-16 overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-6xl mx-auto text-center"
        >
          <span className="uppercase text-xs tracking-[0.35em] text-gray-400">
            Digital Systems Division
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano engineers scalable digital systems for
            brands that operate seriously.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* METRICS */}
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <Metric label="Systems shipped" value={32} />
          <Metric label="Avg. performance gain (%)" value={68} />
          <Metric label="Delivery speed increase (%)" value={54} />
        </div>
      </section>

      <Divider />

      {/* TIMELINE */}
      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-20">
            How Velano Operates
          </h2>

          <div className="space-y-16">
            {timeline.map((t, i) => (
              <motion.div
                key={t.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="relative pl-10"
              >
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-white" />
                <h3 className="text-xl font-semibold mb-3">{t.title}</h3>
                <p className="text-gray-400">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section id="contact" className="px-6 py-32">
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

/* ================= COMPONENTS ================= */

function Divider() {
  return <div className="divider" />;
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="surface rounded-xl p-10 depth">
      <div className="text-5xl font-extrabold mb-3">
        <CountUp value={value} />
        <span className="accent">+</span>
      </div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

/* ================= DATA ================= */

const timeline = [
  {
    title: "System Audit",
    desc: "Deep analysis of brand, product, and technical constraints.",
  },
  {
    title: "Architecture Design",
    desc: "Clear system structure designed for scale and longevity.",
  },
  {
    title: "Engineering & Iteration",
    desc: "Rapid, AI-assisted development with constant refinement.",
  },
  {
    title: "Launch & Optimization",
    desc: "Deployment, performance tuning, and continuous evolution.",
  },
];

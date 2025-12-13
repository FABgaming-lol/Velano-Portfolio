"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

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

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm tracking-widest font-semibold">
            AVOLIRO<span className="accent"> / </span>VELANO
          </span>

          <nav className="hidden md:flex gap-6 text-sm text-gray-400">
            <a href="#systems" className="hover:text-white transition">Systems</a>
            <a href="#process" className="hover:text-white transition">Process</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 pt-16 text-center">
        <div className="max-w-6xl mx-auto">
          <span className="uppercase text-xs tracking-[0.35em] text-gray-400">
            Digital Systems Division
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            We don’t build websites.
            <br />
            We engineer systems<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano is an AVOLIRO division focused on building scalable,
            performance-driven digital systems for serious brands.
          </p>
        </div>
      </section>

      <Divider />

      {/* SYSTEMS */}
      <section id="systems" className="px-6 py-28">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-14">What We Engineer</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {systems.map((s) => (
              <div key={s.title} className="surface rounded-xl p-8 border border-white/10 depth">
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* PROCESS */}
      <section id="process" className="px-6 py-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-20">
            How Velano Works
          </h2>

          <div className="space-y-14">
            {process.map((p) => (
              <div key={p.title} className="relative pl-10">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-white" />
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* PRICING PHILOSOPHY */}
      <section id="pricing" className="px-6 py-28">
        <div className="max-w-4xl mx-auto text-center surface rounded-2xl p-14 depth">
          <h2 className="text-3xl font-bold mb-6">
            Pricing Philosophy
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            Velano does not sell fixed packages or cheap deliverables.
            <br /><br />
            Pricing is based on:
            <br />
            • system complexity  
            • long-term value created  
            • scope, risk, and execution depth  
            <br /><br />
            If you’re looking for the lowest quote, Velano is not a fit.
            <br />
            If you’re building something that must scale — we should talk.
          </p>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section id="contact" className="px-6 py-32">
        <div className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth">
          <h2 className="text-3xl font-bold mb-6">
            Start a Serious Conversation
          </h2>

          <p className="text-gray-400 mb-10">
            If you value systems, clarity, and long-term leverage —
            reach out.
          </p>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-14 py-4 rounded-lg bg-white text-black font-semibold"
          >
            Contact Velano
          </a>
        </div>
      </section>

    </main>
  );
}

/* ================= HELPERS ================= */

function Divider() {
  return <div className="divider" />;
}

/* ================= DATA ================= */

const systems = [
  {
    title: "Interface Architecture",
    desc: "Brand-driven UI systems designed with hierarchy and intent.",
  },
  {
    title: "Front-End Engineering",
    desc: "Scalable, performance-focused front-end systems.",
  },
  {
    title: "AI-Accelerated Delivery",
    desc: "Speed without sacrificing quality or maintainability.",
  },
  {
    title: "Scalable Codebases",
    desc: "Clean systems built to evolve, not collapse.",
  },
];

const process = [
  {
    title: "Audit & Alignment",
    desc: "We understand the brand, product, and constraints before writing code.",
  },
  {
    title: "System Design",
    desc: "Architecture is designed for scale, not just launch.",
  },
  {
    title: "Engineering",
    desc: "Execution using modern stacks and AI-accelerated workflows.",
  },
  {
    title: "Launch & Optimization",
    desc: "Deployment, monitoring, and iterative improvement.",
  },
];

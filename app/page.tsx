"use client";

import { motion, useScroll } from "framer-motion";

/* ================= MOTION ================= */

const fade = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Page() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-main text-white">

      {/* Scroll Authority Line */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50"
      />

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex items-center px-6 pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fade}
          className="max-w-6xl mx-auto text-center"
        >
          <span className="uppercase text-xs tracking-[0.35em] text-gray-400">
            AVOLIRO / VELANO
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            We don’t build websites.
            <br />
            We engineer digital systems<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano designs and engineers scalable, high-performance digital systems
            for founders and teams who want long-term leverage — not quick fixes.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* ================= PROBLEM ================= */}
      <section className="px-6 py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Most digital products fail for one reason.
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Fragmentation.
            <br /><br />
            Design happens in isolation.
            Development follows blindly.
            Growth is patched on later.
            <br /><br />
            The result is technical debt, weak positioning, and wasted spend.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* ================= SOLUTION ================= */}
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
          >
            <h2 className="text-3xl font-bold mb-6">
              Velano fixes this by design.
            </h2>

            <p className="text-gray-400 leading-relaxed">
              We engineer your interface, front-end architecture,
              and delivery pipeline as one connected system.
              <br /><br />
              Every decision compounds.
              Nothing is accidental.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            className="surface rounded-2xl p-10 depth"
          >
            <ul className="space-y-4 text-gray-300">
              <li>• Interface architecture aligned to brand</li>
              <li>• Performance-first front-end engineering</li>
              <li>• AI-accelerated but human-controlled delivery</li>
              <li>• Systems built to scale, not be replaced</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ================= PROCESS ================= */}
      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-20">
            How engagements work
          </h2>

          <div className="space-y-14">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="pl-8 border-l border-white/10"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {i + 1}. {step.title}
                </h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ================= FILTER ================= */}
      <section className="px-6 py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            This is not for everyone.
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Velano is not for rushed timelines, templates,
            or price-shopping.
            <br /><br />
            It is for founders and teams who value clarity,
            precision, and systems that compound over time.
          </p>
        </div>
      </section>

      <Divider />

      {/* ================= CTA ================= */}
      <section id="contact" className="px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth"
        >
          <h2 className="text-3xl font-bold mb-6">
            Start a serious conversation
          </h2>

          <p className="text-gray-400 mb-10">
            If this resonates, reach out.
            We’ll quickly determine fit.
          </p>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-14 py-4 rounded-lg bg-white text-black font-semibold hover:-translate-y-1 transition-transform"
          >
            Contact Velano
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

const steps = [
  {
    title: "System audit",
    desc: "We analyze brand, product, and technical constraints.",
  },
  {
    title: "Architecture design",
    desc: "A clear, scalable system is designed before writing code.",
  },
  {
    title: "Engineering & iteration",
    desc: "Fast, controlled execution with constant refinement.",
  },
  {
    title: "Launch & optimization",
    desc: "Post-launch tuning and long-term evolution.",
  },
];

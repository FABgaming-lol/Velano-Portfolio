"use client";

import { motion, useScroll } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Page() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-main text-white">

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50"
      />

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 text-center">
        <motion.div initial="hidden" animate="visible" variants={fade}>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 max-w-2xl mx-auto text-lg">
            Velano builds high-performance digital systems for brands
            that think long-term.
          </p>

          <a
            href="#contact"
            className="inline-block mt-12 px-12 py-4 bg-white text-black font-semibold rounded-lg hover:-translate-y-1 transition"
          >
            Start a conversation
          </a>
        </motion.div>
      </section>

      {/* SYSTEMS */}
      <section id="systems" className="px-6 py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">What We Build</h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              ["Interface Architecture", "Clear UI systems aligned with brand intent."],
              ["Front-End Engineering", "Performance-first, scalable codebases."],
              ["AI-Accelerated Delivery", "Faster execution without quality loss."],
              ["Long-Term Systems", "Built to evolve, not be replaced."],
            ].map(([title, desc]) => (
              <div key={title} className="surface p-8 rounded-xl depth">
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROCESS */}
      <section id="process" className="px-6 py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-20">How We Work</h2>

          <div className="space-y-14">
            {[
              "Audit & clarity",
              "System architecture",
              "Engineering & iteration",
              "Launch, measure, refine",
            ].map((step, i) => (
              <div key={step} className="relative pl-8">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-white" />
                <p className="text-lg text-gray-300">
                  <span className="text-white font-semibold">{i + 1}.</span> {step}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRICING PHILOSOPHY */}
      <section id="pricing" className="px-6 py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="max-w-4xl mx-auto text-center surface rounded-2xl p-14 depth">
          <h2 className="text-3xl font-bold mb-6">Pricing Philosophy</h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Velano does not sell fixed packages or hourly work.
            <br /><br />
            Pricing is based on:
            <br />
            system complexity, scope, and long-term impact.
            <br /><br />
            This ensures alignment — not rushed delivery.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-6 py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to build something serious?
          </h2>

          <a
            href="mailto:hello@velano.dev"
            className="inline-block mt-6 px-14 py-4 bg-white text-black font-semibold rounded-lg hover:-translate-y-1 transition"
          >
            Engage Velano
          </a>
        </motion.div>
      </section>

    </main>
  );
}

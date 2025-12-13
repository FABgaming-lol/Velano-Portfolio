"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const html = document.documentElement;

    if (saved === "dark") {
      html.classList.add("dark");
      setTheme("dark");
    } else {
      html.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";

    html.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((item) => observer.observe(item));
  }, []);

  return (
    <main className="min-h-screen">

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed right-4 top-4 z-50 w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center p-1"
        aria-label="Toggle Theme"
      >
        <span
          className={`w-6 h-6 rounded-full bg-white dark:bg-black transition-transform ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>

      {/* HERO */}
      <section className="section reveal">
        <div className="max-w-content mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Digital systems built for
            <br />
            brands that refuse to look small.
          </h1>

          <p className="mt-6 text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Velano designs and engineers high-performance web infrastructure —
            precise, scalable, and built for long-term execution.
          </p>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section reveal">
        <div className="max-w-content mx-auto text-center">
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Most digital products fail due to fragmentation — design without
            strategy, code without intent, and growth without structure.
            <br /><br />
            Velano operates differently. Systems first. Execution second.
          </p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section reveal">
        <div className="max-w-content mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Core Systems</h2>

          <div className="grid gap-6 text-text-secondary-light dark:text-text-secondary-dark">
            <p>• Brand-driven web architecture</p>
            <p>• Performance-focused front-end systems</p>
            <p>• AI-accelerated delivery pipelines</p>
            <p>• Clean, scalable codebases</p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="section reveal">
        <div className="max-w-content mx-auto text-center">
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Velano does not operate on price pressure or rushed timelines.
            <br />
            This is for teams that value precision and long-term leverage.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section reveal">
        <div className="max-w-content mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Engage Velano</h2>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-10 py-4 rounded-lg bg-black text-white dark:bg-white dark:text-black font-semibold"
          >
            Initiate Contact
          </a>
        </div>
      </section>

    </main>
  );
}
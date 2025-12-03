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

    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  // Scroll reveal animations
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
        className="fixed right-4 top-4 z-50 w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center p-1 transition-colors duration-300"
        aria-label="Toggle Theme"
      >
        <span
          className={`flex items-center justify-center w-6 h-6 bg-white dark:bg-black rounded-full transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </span>
      </button>

      {/* HERO */}
      <section className="section reveal text-center">
        <h1 className="text-5xl font-extrabold leading-tight">
          I build clean, bold & unforgettable digital experiences.
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mt-4">
          Full-stack development + AI-accelerated workflows delivering premium results — fast.
        </p>
      </section>

      {/* ABOUT */}
      <section id="about" className="section reveal flex flex-col items-center gap-6">
        <img src="/wordmark.png" alt="VELANO wordmark" className="h-10 dark:invert" />
        <p className="max-w-2xl text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          I code with AI — meaning faster delivery + top-tier results.<br />
          I architect, refine and ship production-ready digital experiences.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section reveal text-center">
        <h2 className="text-3xl font-bold mb-6">Let’s Build Something</h2>
        <a
          href="mailto:hello@velano.dev?subject=New Project Inquiry"
          className="inline-block px-8 py-4 rounded-lg bg-black dark:bg-white text-white dark:text-black transition-colors"
        >
          Contact Me
        </a>
      </section>

    </main>
  );
}

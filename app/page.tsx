"use client";

import React, { useEffect, useRef } from "react";

const sectionsIds = ["about", "services", "stack", "projects", "testimonials", "contact"];

export default function HomePage() {
  const heroInnerRef = useRef<HTMLDivElement | null>(null);

  // Year
  useEffect(() => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
  }, []);

  // Theme toggle — light by default
  useEffect(() => {
    const root = document.documentElement;
    let saved: string | null = null;

    try {
      saved = localStorage.getItem("velano-theme");
    } catch {
      saved = null;
    }

    const applyTheme = (theme: "light" | "dark") => {
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      const btn = document.getElementById("themeToggle");
      if (btn) btn.textContent = theme === "light" ? "Dark" : "Light";
      try {
        localStorage.setItem("velano-theme", theme);
      } catch {}
    };

    if (saved === "dark" || saved === "light") {
      applyTheme(saved as "light" | "dark");
    } else {
      applyTheme("light");
    }

    const toggle = () => {
      const current = root.classList.contains("dark") ? "dark" : "light";
      applyTheme(current === "light" ? "dark" : "light");
    };

    const btn = document.getElementById("themeToggle");
    btn?.addEventListener("click", toggle);
    return () => btn?.removeEventListener("click", toggle);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.width = `${progress * 100}%`;
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active nav link
  useEffect(() => {
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-link");

    const updateActive = () => {
      let current: string | null = null;
      const offset = 120;
      sectionsIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0) current = id;
      });

      navLinks.forEach((link) => {
        const sec = link.dataset.section;
        if (sec === current) link.classList.add("active-link");
        else link.classList.remove("active-link");
      });
    };

    window.addEventListener("scroll", updateActive);
    window.addEventListener("resize", updateActive);
    updateActive();

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // Section reveal (cinematic stagger)
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".reveal-section");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((s) => s.classList.add("visible-section"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("visible-section");
            const index = Array.from(sections).indexOf(el);
            el.style.transitionDelay = `${index * 0.08}s`;
            observer.unobserve(el);
          }
        }),
      { threshold: 0.18 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Project card reveal
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".project-card");
    if (!("IntersectionObserver" in window)) {
      cards.forEach((c, i) => {
        c.classList.add("project-visible");
        c.style.transitionDelay = `${i * 0.07}s`;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("project-visible");
            const index = Array.from(cards).indexOf(el);
            el.style.transitionDelay = `${index * 0.07}s`;
            observer.unobserve(el);
          }
        }),
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Testimonials slider
  useEffect(() => {
    const testimonials = document.querySelectorAll<HTMLElement>(".testimonial");
    const dots = document.querySelectorAll<HTMLSpanElement>(".dot");
    if (!testimonials.length) return;

    let current = 0;

    const show = (index: number) => {
      testimonials.forEach((t) => t.classList.remove("active"));
      dots.forEach((d) => d.classList.remove("bg-neutral-900", "dark:bg-neutral-100"));
      const t = testimonials[index];
      const d = dots[index];
      if (t) t.classList.add("active");
      if (d) d.classList.add("bg-neutral-900", "dark:bg-neutral-100");
      current = index;
    };

    dots.forEach((dot) =>
      dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.index || "0");
        show(idx);
      })
    );

    const interval = setInterval(() => {
      const next = (current + 1) % testimonials.length;
      show(next);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Hero 3D parallax
  useEffect(() => {
    const hero = document.getElementById("hero-shell");
    const heroInner = heroInnerRef.current;
    if (!hero || !heroInner) return;

    const maxRotateX = 8; // degrees
    const maxRotateY = 10;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      const rotateY = -relX * maxRotateY;
      const rotateX = relY * maxRotateX;

      heroInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, 0, 0)`;
      heroInner.style.boxShadow =
        "0 25px 60px rgba(0,0,0,0.27), 0 0 0 1px rgba(255,255,255,0.02)";
    };

    const onLeave = () => {
      heroInner.style.transform = "rotateX(0deg) rotateY(0deg) translate3d(0,0,0)";
      heroInner.style.boxShadow = "none";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Magnetic buttons
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(".btn-magnetic");
    const strength = 0.16;

    buttons.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      };
      const onLeave = () => {
        btn.style.transform = "translate(0, 0)";
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.style.transform = "translate(0, 0)";
      });
    };
  }, []);

  // Scroll to contact from buttons
  useEffect(() => {
    const primary = document.getElementById("contactOpenPrimary");
    const footer = document.getElementById("contactOpenFooter");

    const scrollToContact = () => {
      const sec = document.getElementById("contact");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    };

    primary?.addEventListener("click", scrollToContact);
    footer?.addEventListener("click", scrollToContact);

    return () => {
      primary?.removeEventListener("click", scrollToContact);
      footer?.removeEventListener("click", scrollToContact);
    };
  }, []);

  // Contact form validation + mailto
  useEffect(() => {
    const form = document.getElementById("contactForm") as HTMLFormElement | null;
    if (!form) return;

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const messageInput = document.getElementById("message") as HTMLTextAreaElement;
    const errorName = document.getElementById("errorName") as HTMLElement;
    const errorEmail = document.getElementById("errorEmail") as HTMLElement;
    const errorMessage = document.getElementById("errorMessage") as HTMLElement;
    const successMessage = document.getElementById("successMessage") as HTMLElement;

    const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    const onSubmit = (e: Event) => {
      e.preventDefault();

      let valid = true;
      successMessage.style.display = "none";

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();

      if (!nameVal) {
        errorName.style.display = "block";
        valid = false;
      } else errorName.style.display = "none";

      if (!emailVal || !validateEmail(emailVal)) {
        errorEmail.style.display = "block";
        valid = false;
      } else errorEmail.style.display = "none";

      if (!messageVal || messageVal.length < 10) {
        errorMessage.style.display = "block";
        valid = false;
      } else errorMessage.style.display = "none";

      if (!valid) return;

      successMessage.style.display = "flex";

      const subject = `New Project Inquiry — ${nameVal}`;
      const bodyText =
        `Name: ${nameVal}\n` +
        `Email: ${emailVal}\n\n` +
        `Project Details:\n${messageVal}\n\n` +
        `—\n` +
        `Velano\n` +
        `Full Stack Developer\n` +
        `velano.dev`;

      const mailtoUrl =
        `mailto:hello@velano.dev?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(bodyText)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    };

    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scrollProgress"
        className="fixed left-0 top-0 h-[3px] w-0 bg-neutral-900 dark:bg-white z-50 origin-left"
      />

      <div
        id="top"
        className="max-w-[1280px] mx-auto min-h-screen flex flex-col px-4"
      >
        {/* Header */}
        <header className="h-[96px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="VELANO logo"
              className="w-[40px] h-[40px] rounded-xl object-contain"
            />
            <div className="font-black text-[22px] tracking-[0.32em]">
              VELANO
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "stack", label: "Stack" },
              { id: "projects", label: "Projects" },
              { id: "testimonials", label: "Clients" },
              { id: "contact", label: "Contact" },
            ].map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-section={l.id}
                className="nav-link hidden md:inline-flex uppercase text-[11px] tracking-[0.14em] px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 transition-all"
              >
                {l.label}
              </a>
            ))}
            <button
              id="themeToggle"
              type="button"
              className="uppercase text-[11px] tracking-[0.12em] px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100"
            >
              Light
            </button>
          </div>
        </header>

        <main className="flex-1 pb-20">
          {/* Hero with 3D shell */}
          <section
            id="hero-shell"
            className="mt-10 hero-3d-shell relative"
          >
            <div
              ref={heroInnerRef}
              className="hero-3d-inner rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/80 px-6 py-10 md:px-10 md:py-12"
            >
              <h1 className="text-[clamp(46px,6.6vw,86px)] font-black leading-[1.02] max-w-[800px] mb-6">
                I build cinematic, bold &amp; unforgettable digital experiences.
              </h1>
              <p className="max-w-[520px] text-[17px] leading-relaxed text-neutral-600 dark:text-neutral-400 mb-8">
                I’m a full-stack developer using AI as my co-pilot to ship premium,
                minimal experiences that feel expensive, load fast and convert better.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  id="contactOpenPrimary"
                  type="button"
                  className="btn-magnetic uppercase text-[12px] tracking-[0.2em] font-semibold px-6 py-3 rounded-lg border border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black"
                >
                  Let’s Build Something
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-magnetic uppercase text-[12px] tracking-[0.2em] font-semibold px-6 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 bg-transparent"
                >
                  View Work
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-[11px] px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
                  Next.js · React · Node
                </span>
                <span className="text-[11px] px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
                  AI-assisted development
                </span>
              </div>
            </div>
          </section>

          <hr className="border-none h-px bg-neutral-200 dark:bg-neutral-800 opacity-70 my-20" />

          {/* About with wordmark + headshot */}
          <section
            id="about"
            className="reveal-section flex flex-wrap items-center gap-10 mt-4"
          >
            <div className="flex items-center gap-6">
              <img
                src="/wordmark.png"
                alt="VELANO wordmark"
                className="w-[190px] max-w-full object-contain"
              />
              <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center text-[20px] font-semibold text-neutral-700 dark:text-neutral-100">
                V
              </div>
            </div>
            <div className="max-w-[640px]">
              <h2 className="text-[30px] font-black mb-2">About Me</h2>
              <p className="text-[16px] leading-[1.7] text-neutral-600 dark:text-neutral-400">
                I’m a full-stack developer who builds mind-bending sites with a secret
                power: I don’t ship alone — I ship with AI.
                <br />
                <br />
                Together, we create clean, bold and{" "}
                <span className="font-semibold">ridiculously efficient</span>{" "}
                experiences that look premium, load fast and actually convert. From
                ambitious SaaS tools to brands that say “we want something like Apple
                but sharper” — I architect, refine and ship end to end.
                <br />
                <br />
                You bring the idea. I bring the stack, the structure and the AI squad.
              </p>
            </div>
          </section>

          <hr className="border-none h-px bg-neutral-200 dark:bg-neutral-800 opacity-70 my-20" />

          {/* Services */}
          <section
            id="services"
            className="reveal-section mt-4"
          >
            <div className="uppercase text-[11px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-2">
              Services
            </div>
            <h2 className="text-[26px] font-extrabold mb-6">
              What I actually do for you
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Design-driven frontends",
                  desc: "Ultra-clean, cinematic interfaces that feel like product, not templates.",
                  meta: "Landing pages · Dashboards · Marketing sites",
                },
                {
                  title: "Full-stack builds",
                  desc: "From polished UI to robust APIs, auth and data. Built to ship, not just demo.",
                  meta: "Next.js · Node · REST/JSON · Auth flows",
                },
                {
                  title: "AI-accelerated workflows",
                  desc: "Use AI to move faster — not cut corners. Tighter iterations, smarter experiments.",
                  meta: "Faster delivery · Better tests · Less friction",
                },
              ].map((s) => (
                <article
                  key={s.title}
                  className="card-3d rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 p-5"
                >
                  <h3 className="text-[15px] font-bold mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mb-2">
                    {s.desc}
                  </p>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {s.meta}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <hr className="border-none h-px bg-neutral-200 dark:bg-neutral-800 opacity-70 my-20" />

          {/* Stack */}
          <section
            id="stack"
            className="reveal-section mt-4"
          >
            <div className="uppercase text-[11px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-2">
              Tech stack
            </div>
            <h2 className="text-[26px] font-extrabold mb-4">
              Tools I reach for first
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Node.js",
                "REST APIs",
                "PostgreSQL",
                "Tailwind UX systems",
                "Framer-style motion",
                "AI-assisted prototyping",
                "Performance-first builds",
              ].map((item) => (
                <span
                  key={item}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:-translate-y-[1px] hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900/60 transition-all"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <hr className="border-none h-px bg-neutral-200 dark:bg-neutral-800 opacity-70 my-20" />

          {/* Projects */}
          <section
            id="projects"
            className="reveal-section mt-4"
          >
            <aside className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/80 dark:bg-neutral-900/70">
              <div className="uppercase text-[12px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-4">
                Selected builds
              </div>
              {[
                {
                  name: "Atlas Launch Surface",
                  desc: "Conversion-focused SaaS launch experience with narrative flow and sharp metrics.",
                  metric: "+32% launch conversion uplift",
                },
                {
                  name: "Monochrome Dashboard",
                  desc: "Hyper-minimal analytics UI for founders who want signal, not noise.",
                  metric: "120 ms average view changes",
                },
                {
                  name: "Linear-grade Portfolio",
                  desc: "Product-like portfolio foundation for serious developers and creators.",
                  metric: "Built to clone, adapt and ship fast",
                },
              ].map((p) => (
                <article
                  key={p.name}
                  className="project-card rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-4 mb-3"
                >
                  <div className="text-[14px] font-semibold mb-1">
                    {p.name}
                  </div>
                  <p className="text-[12px] text-neutral-600 dark:text-neutral-400 mb-1.5">
                    {p.desc}
                  </p>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {p.metric}
                  </div>
                </article>
              ))}
            </aside>
          </section>

          <hr className="border-none h-px bg-neutral-200 dark:bg-neutral-800 opacity-70 my-20" />

          {/* Testimonials */}
          <section
            id="testimonials"
            className="reveal-section mt-4"
          >
            <div className="uppercase text-[11px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-2">
              Clients
            </div>
            <h2 className="text-[26px] font-extrabold mb-5">
              What working with me feels like
            </h2>
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/80 dark:bg-neutral-900/70">
              <div className="testimonial active" data-index="0">
                <p className="text-[15px] leading-[1.7] text-neutral-600 dark:text-neutral-400 mb-3">
                  “We came in asking for ‘a simple landing page’ and walked away with a full launch-ready experience.
                  The site feels cleaner than tools we actually pay for.”
                </p>
                <div className="text-[13px] font-semibold">
                  Product founder, SaaS
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Stealth launch project
                </div>
              </div>

              <div className="testimonial" data-index="1">
                <p className="text-[15px] leading-[1.7] text-neutral-600 dark:text-neutral-400 mb-3">
                  “Every section had a job. No fluff, no random UI experiments. Just sharp, confident design that made
                  our product feel 10x more serious.”
                </p>
                <div className="text-[13px] font-semibold">
                  Creative lead
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Brand refresh collaboration
                </div>
              </div>

              <div className="testimonial" data-index="2">
                <p className="text-[15px] leading-[1.7] text-neutral-600 dark:text-neutral-400 mb-3">
                  “The AI-assisted workflow meant we saw polished variants way faster than usual. Iterating on copy and
                  layout was actually fun.”
                </p>
                <div className="text-[13px] font-semibold">
                  Solo founder
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Early-stage MVP
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <span
                  className="dot w-2 h-2 rounded-full border border-neutral-400 dark:border-neutral-600 bg-neutral-900 dark:bg-neutral-100"
                  data-index={0}
                />
                <span
                  className="dot w-2 h-2 rounded-full border border-neutral-400 dark:border-neutral-600"
                  data-index={1}
                />
                <span
                  className="dot w-2 h-2 rounded-full border border-neutral-400 dark:border-neutral-600"
                  data-index={2}
                />
              </div>
            </div>
          </section>

          <hr className="border-none h-px bg-neutral-200 dark:bg-neutral-800 opacity-70 my-20" />

          {/* Contact */}
          <section
            id="contact"
            className="reveal-section mt-4"
          >
            <div className="uppercase text-[11px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-2">
              Contact
            </div>
            <h2 className="text-[26px] font-extrabold mb-5">
              Let’s build something
            </h2>
            <form
              id="contactForm"
              noValidate
              className="max-w-xl space-y-3"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-[10px] uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-[13px] px-3 py-2 outline-none transition-all focus:border-neutral-900 dark:focus:border-neutral-100 focus:bg-neutral-50 dark:focus:bg-neutral-900/40"
                />
                <div
                  id="errorName"
                  className="text-[10px] text-red-500 mt-1 hidden"
                >
                  Please add your name.
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-[13px] px-3 py-2 outline-none transition-all focus:border-neutral-900 dark:focus:border-neutral-100 focus:bg-neutral-50 dark:focus:bg-neutral-900/40"
                />
                <div
                  id="errorEmail"
                  className="text-[10px] text-red-500 mt-1 hidden"
                >
                  Enter a valid email address.
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[10px] uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400 mb-1"
                >
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Timeline, budget range, goals..."
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-[13px] px-3 py-2 outline-none resize-y min-h-[90px] transition-all focus:border-neutral-900 dark:focus:border-neutral-100 focus:bg-neutral-50 dark:focus:bg-neutral-900/40"
                />
                <div
                  id="errorMessage"
                  className="text-[10px] text-red-500 mt-1 hidden"
                >
                  Give at least a few words about the project.
                </div>
              </div>

              <div
                id="successMessage"
                className="hidden text-[11px] text-emerald-500 flex items-center gap-2 mt-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 stroke-emerald-500"
                  aria-hidden="true"
                >
                  <path
                    d="M4 13l5 5L20 7"
                    fill="none"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="check-path"
                  />
                </svg>
                <span>Message validated! Opening mail...</span>
              </div>

              <button
                type="submit"
                className="btn-magnetic mt-3 inline-flex items-center justify-center uppercase text-[12px] tracking-[0.2em] font-semibold px-6 py-3 rounded-lg border border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black"
              >
                Send email
              </button>
            </form>
          </section>

          <hr className="border-none h-px bg-neutral-200 dark:bg-neutral-800 opacity-70 my-20" />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap justify-between gap-3 text-[12px] text-neutral-500 dark:text-neutral-400">
            <div className="flex flex-wrap items-center gap-3">
              <span>
                © <span id="year"></span> VELANO — Full Stack Developer
              </span>
              <button
                type="button"
                className="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-[11px] transition-all hover:-translate-y-[1px] hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900/40"
                onClick={() =>
                  document
                    .getElementById("top")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Back to top
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="contactOpenFooter"
                type="button"
                className="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-[11px] transition-all hover:-translate-y-[1px] hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900/40"
              >
                Contact
              </button>
              <div className="flex gap-2">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[34px] h-[34px] rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-[14px] transition-all hover:-translate-y-[2px] hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900/40"
                >
                  G
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[34px] h-[34px] rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-[14px] transition-all hover:-translate-y-[2px] hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900/40"
                >
                  in
                </a>
                <a
                  href="mailto:hello@velano.dev"
                  className="w-[34px] h-[34px] rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-[14px] transition-all hover:-translate-y-[2px] hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900/40"
                >
                  @
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
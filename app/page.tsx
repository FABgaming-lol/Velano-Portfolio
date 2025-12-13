export default function Page() {
  return (
    <main>

      {/* HERO */}
      <section className="section">
        <div className="max-w-content mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems engineered
            <br />
            for brands that operate seriously.
          </h1>

          <p className="mt-6 text-text-secondary max-w-2xl mx-auto">
            Velano designs and builds high-performance web infrastructure —
            precise, scalable, and built to last.
          </p>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="section border-t border-border-subtle">
        <div className="max-w-content mx-auto text-center">
          <p className="text-text-secondary">
            Most digital products fail due to fragmentation —
            visuals without strategy, code without structure,
            and growth without systems.
            <br /><br />
            Velano eliminates that chaos by engineering complete digital
            foundations from day one.
          </p>
        </div>
      </section>

      {/* SYSTEMS */}
      <section className="section border-t border-border-subtle">
        <div className="max-w-content mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Core Systems</h2>

          <div className="grid gap-6 text-text-secondary">
            <p>• Brand-driven interface architecture</p>
            <p>• Performance-first front-end systems</p>
            <p>• AI-accelerated engineering workflows</p>
            <p>• Clean, scalable codebases built for longevity</p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="section border-t border-border-subtle">
        <div className="max-w-content mx-auto text-center">
          <p className="text-text-secondary">
            Velano does not operate on shortcuts, templates, or price pressure.
            <br />
            This is for teams that value precision and long-term leverage.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-border-subtle">
        <div className="max-w-content mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Engage Velano</h2>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-10 py-4 rounded-lg bg-white text-black font-semibold transition-transform hover:-translate-y-1"
          >
            Initiate Contact
          </a>
        </div>
      </section>

    </main>
  );
}
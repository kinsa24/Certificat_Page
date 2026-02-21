import React, { useMemo, useState } from "react";
import CertificateModal from "./components/CertificateModal";
import { certificates } from "./data/certificates";

const categories = ["All", "Cloud", "Data", "Security", "Design", "Other"];

export default function App() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return certificates
      .filter((c) => (activeCat === "All" ? true : c.category === activeCat))
      .filter((c) => {
        if (!q) return true;
        const haystack = [
          c.title,
          c.issuer,
          c.category,
          c.credentialId,
          ...(c.skills || []),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [query, activeCat]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Certificates
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                A simple page to showcase certifications with details and
                verification links.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search (title, issuer, skills...)"
                className="w-full rounded-xl border bg-white px-4 py-2 text-sm outline-none focus:border-slate-400 md:w-[320px]"
              />
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                      activeCat === cat
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 hover:bg-slate-50"
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filtered.length}
            </span>{" "}
            certificate(s)
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className="group overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:shadow-md">
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {c.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(c.date).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{c.issuer}</p>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-700">
                  {c.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(c.skills || []).slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700">
                      {s}
                    </span>
                  ))}
                  {(c.skills || []).length > 3 ? (
                    <span className="rounded-full border bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500">
                      +{(c.skills || []).length - 3}
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 text-xs font-semibold text-slate-700">
                  Click to view
                </div>
              </div>
            </button>
          ))}
        </div>

        <footer className="mt-10 border-t pt-6 text-sm text-slate-600">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-900">
                Kinsa
              </span>
              . All rights reserved.
            </p>

            <p className="text-slate-500">
              Built with React + Vite. Hosted on Netlify.
            </p>
          </div>
        </footer>
      </main>

      <CertificateModal
        open={!!selected}
        cert={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

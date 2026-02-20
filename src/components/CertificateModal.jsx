import React from "react";

export default function CertificateModal({ open, onClose, cert }) {
  if (!open || !cert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{cert.title}</h3>
            <p className="text-sm text-slate-600">
              {cert.issuer} • {new Date(cert.date).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <div className="grid gap-6 p-5 md:grid-cols-2">
          <div className="rounded-xl border bg-slate-50 p-3">
            <img
              src={cert.image}
              alt={cert.title}
              className="h-auto w-full rounded-lg object-contain"
              loading="lazy"
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </div>
              <div className="mt-1 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
                {cert.category}
              </div>
            </div>

            {cert.credentialId ? (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Credential ID
                </div>
                <div className="mt-1 font-mono text-sm text-slate-800">
                  {cert.credentialId}
                </div>
              </div>
            ) : null}

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Description
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {cert.description}
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Skills
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {cert.skills?.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {cert.verifyUrl ? (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Verify
                </a>
              ) : (
                <button
                  disabled
                  className="cursor-not-allowed rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
                >
                  No verify link
                </button>
              )}

              <a
                href={cert.image}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Open image
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

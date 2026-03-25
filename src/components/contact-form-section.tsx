"use client";

import { FormEvent, useEffect, useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

type ContactFormSectionProps = {
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  mainHeading: string;
  mainSubheading: string;
  introLines: string[];
};

export function ContactFormSection({
  contactInfo,
  mainHeading,
  mainSubheading,
  introLines,
}: ContactFormSectionProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (!showSuccessModal) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowSuccessModal(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [showSuccessModal]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowSuccessModal(true);
    setForm(INITIAL_STATE);
  };

  return (
    <section className="bg-[linear-gradient(180deg,#fbfaf8_0%,#f3ece3_100%)] py-14 sm:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-9">
        <header className="max-w-3xl">
          <p className="eyebrow">Contact Us</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-theme-ink sm:text-5xl">
            {mainHeading}
          </h1>
          <p className="mt-3 text-lg leading-8 text-theme-muted sm:text-xl">
            {mainSubheading}
          </p>
          <div className="mt-5 grid gap-2 text-base leading-8 text-theme-muted sm:text-lg">
            {introLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_16px_34px_rgba(42,30,20,0.08)] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-theme-ink">
                  Full Name
                </span>
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      fullName: event.target.value,
                    }))
                  }
                  className="h-12 rounded-[0.8rem] border border-theme-line bg-[#fcfaf7] px-4 text-sm text-theme-ink outline-none transition focus:border-theme-accent"
                  placeholder="Enter your full name"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-theme-ink">
                  Email Address
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      email: event.target.value,
                    }))
                  }
                  className="h-12 rounded-[0.8rem] border border-theme-line bg-[#fcfaf7] px-4 text-sm text-theme-ink outline-none transition focus:border-theme-accent"
                  placeholder="you@example.com"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-theme-ink">
                  Phone Number
                </span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      phone: event.target.value,
                    }))
                  }
                  className="h-12 rounded-[0.8rem] border border-theme-line bg-[#fcfaf7] px-4 text-sm text-theme-ink outline-none transition focus:border-theme-accent"
                  placeholder="+1 000 000 0000"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-theme-ink">
                  Subject (optional)
                </span>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      subject: event.target.value,
                    }))
                  }
                  className="h-12 rounded-[0.8rem] border border-theme-line bg-[#fcfaf7] px-4 text-sm text-theme-ink outline-none transition focus:border-theme-accent"
                  placeholder="What is this about?"
                />
              </label>
            </div>

            <label className="mt-5 grid gap-2">
              <span className="text-sm font-semibold text-theme-ink">
                Message
              </span>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    message: event.target.value,
                  }))
                }
                className="rounded-[0.8rem] border border-theme-line bg-[#fcfaf7] px-4 py-3 text-sm text-theme-ink outline-none transition focus:border-theme-accent"
                placeholder="How can we help you?"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-[0.95rem] bg-theme-accent px-6 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:brightness-95"
            >
              Send Message
            </button>
          </form>

          <aside className="rounded-[1.35rem] border border-theme-line/70 bg-white/85 p-6 shadow-[0_14px_30px_rgba(42,30,20,0.06)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
              Contact Information
            </h2>
            <div className="mt-5 grid gap-5 text-sm leading-7 text-theme-muted sm:text-base">
              <p>
                {contactInfo.address}
              </p>
              <p>
                <a
                  href={"tel:" + contactInfo.phone}
                  className="transition hover:text-theme-accent"
                >
                  {contactInfo.phone}
                </a>
                <br />
                <a
                  href={"mailto:" + contactInfo.email}
                  className="transition hover:text-theme-accent"
                >
                  {contactInfo.email}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>

      {showSuccessModal ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
          className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4"
        >
          <div className="w-full max-w-md rounded-[1.2rem] border border-white/75 bg-white p-6 shadow-[0_24px_55px_rgba(0,0,0,0.22)] sm:p-7">
            <p className="text-sm font-semibold tracking-[0.12em] text-theme-accent uppercase">
              Success
            </p>
            <h3
              id="contact-success-title"
              className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-theme-ink"
            >
              Message Sent Successfully
            </h3>
            <p className="mt-3 text-sm leading-7 text-theme-muted sm:text-base">
              Thank you for contacting Speedy Corner. Our team will review your
              message and reach out shortly.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-[0.9rem] bg-theme-accent px-5 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:brightness-95"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

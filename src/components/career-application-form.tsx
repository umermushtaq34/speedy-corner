"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import {
  APPLICANT_CERTIFICATION,
  MAX_EMPLOYERS,
  WEEKDAYS,
  type Job,
} from "@/constants/jobs";
import {
  validateApplication,
  type ApplicationErrors,
} from "@/lib/career-application";

const inputClass =
  "w-full min-w-0 rounded-[0.8rem] border border-theme-line bg-[#fcfaf7] px-4 py-3 text-base text-theme-ink outline-none transition focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/25";
const sectionClass =
  "min-w-0 rounded-[1.35rem] border border-theme-line/70 bg-white p-6 sm:p-8";
const legendClass =
  "float-left mb-5 w-full text-xl font-semibold tracking-[-0.02em] text-theme-ink";

function Field({
  id,
  label,
  error,
  type = "text",
  required = false,
  maxLength = 200,
  autoComplete,
  placeholder,
  multiline = false,
}: {
  id: string;
  label: string;
  error?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const props = {
    id,
    name: id,
    required,
    maxLength,
    autoComplete,
    placeholder,
    className: inputClass,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-theme-ink"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {multiline ? (
        <textarea {...props} rows={4} />
      ) : (
        <input {...props} type={type} />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function CareerApplicationForm({ job }: { job: Job }) {
  const [employers, setEmployers] = useState([0]);
  const nextEmployerId = useRef(1);
  const [hasOtherSkill, setHasOtherSkill] = useState(false);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submissionLock = useRef(false);
  const noticeRef = useRef<HTMLDivElement>(null);
  const addEmployerRef = useRef<HTMLButtonElement>(null);

  function showNotice(message: string) {
    setNotice(message);
    requestAnimationFrame(() => noticeRef.current?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current) return;
    setNotice("");
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "");
    const application = {
      position: get("position"),
      fullName: get("fullName"),
      address: get("address"),
      phone: get("phone"),
      email: get("email"),
      isOver21: get("isOver21"),
      skills: form.getAll("skills").map(String),
      otherSkill: get("otherSkill"),
      employmentHistory: employers.map((_, index) => ({
        employer: get(`employmentHistory.${index}.employer`),
        position: get(`employmentHistory.${index}.position`),
        dates: get(`employmentHistory.${index}.dates`),
        responsibilities: get(`employmentHistory.${index}.responsibilities`),
      })),
      education: {
        school: get("education.school"),
        degree: get("education.degree"),
      },
      availability: Object.fromEntries(
        WEEKDAYS.map((day) => [day, get(`availability.${day}`)]),
      ),
      references: [0, 1].map((index) => ({
        name: get(`references.${index}.name`),
        relationship: get(`references.${index}.relationship`),
        phone: get(`references.${index}.phone`),
        email: get(`references.${index}.email`),
      })),
      certified: form.get("certified") === "on",
    };
    const validation = validateApplication(application, job);
    setErrors(validation.errors);
    if (!validation.data) {
      showNotice(
        "Please review the highlighted fields before submitting your application.",
      );
      requestAnimationFrame(() =>
        document.getElementById(Object.keys(validation.errors)[0])?.focus(),
      );
      return;
    }

    submissionLock.current = true;
    setPending(true);
    try {
      const response = await fetch(`/api/careers/${job.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        showNotice(
          result.message ||
            "We couldn’t submit your application. Please try again. Your entries are still here.",
        );
        return;
      }
      setSubmitted(true);
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );
    } catch {
      showNotice(
        "We couldn’t connect to the application service. Please try again. Your entries are still here.",
      );
    } finally {
      submissionLock.current = false;
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <section
        role="status"
        aria-labelledby="application-success-heading"
        className="mt-10 rounded-[1.35rem] border border-theme-line/70 bg-white p-8 text-center sm:p-12"
      >
        <div
          aria-hidden="true"
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h2
          id="application-success-heading"
          className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-theme-ink"
        >
          Application received
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-theme-muted">
          Thank you for applying for the {job.title} position at Speedy Corner.
          We’ve sent a confirmation to your email, and our team will be in touch
          if your experience is a good match.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[0.95rem] bg-theme-accent px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-accent"
        >
          Go Home
        </Link>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-6"
      aria-labelledby="application-heading"
    >
      <div>
        <h2
          id="application-heading"
          className="text-3xl font-semibold tracking-[-0.03em] text-theme-ink"
        >
          Apply for {job.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-theme-muted">
          Fields marked * are required. Employment history, education, skills,
          availability, and references are optional.
        </p>
      </div>
      <input type="hidden" name="position" value={job.slug} />

      <div
        ref={noticeRef}
        tabIndex={-1}
        role={submitted ? "status" : "alert"}
        hidden={!notice}
        className={`rounded-xl border p-5 text-sm leading-7 outline-none ${submitted ? "border-green-300 bg-green-50 text-green-900" : "border-amber-300 bg-amber-50 text-amber-900"}`}
      >
        {notice}
      </div>

      <fieldset
        disabled={pending || submitted}
        className="min-w-0 space-y-6 disabled:opacity-70"
      >
        <legend className="sr-only">Application details</legend>
        <fieldset className={sectionClass}>
          <legend className={legendClass}>Personal Information</legend>
          <div className="clear-both grid gap-5 sm:grid-cols-2">
            <Field
              id="fullName"
              label="Full Name"
              autoComplete="name"
              required
              error={errors.fullName}
            />
            <Field
              id="address"
              label="Address"
              autoComplete="street-address"
              maxLength={500}
              required
              error={errors.address}
            />
            <Field
              id="phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              required
              error={errors.phone}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              error={errors.email}
            />
            <div className="min-w-0 sm:col-span-2">
              <fieldset
                aria-describedby={errors.isOver21 ? "isOver21-error" : undefined}
              >
                <legend className="mb-2 block text-sm font-semibold text-theme-ink">
                  Are you at least 21 years of age?{" "}
                  <span aria-hidden="true">*</span>
                </legend>
                <div className="flex gap-4">
                  {["Yes", "No"].map((option, i) => (
                    <label
                      key={option}
                      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-theme-line/70 px-4 text-sm text-theme-ink has-checked:border-theme-accent has-checked:bg-orange-50"
                    >
                      <input
                        id={i === 0 ? "isOver21" : undefined}
                        type="radio"
                        name="isOver21"
                        value={option}
                        required
                        className="h-5 w-5 accent-theme-accent"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
              {errors.isOver21 && (
                <p id="isOver21-error" className="mt-2 text-sm text-red-700">
                  {errors.isOver21}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className={sectionClass}>
          <legend className={legendClass}>Core Skills</legend>
          <p className="clear-both mb-4 text-sm text-theme-muted">
            Select the skills you bring to the team.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {job.skills.map((skill) => (
              <label
                key={skill}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-theme-line/70 p-3 text-sm leading-6 text-theme-ink has-checked:border-theme-accent has-checked:bg-orange-50"
              >
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  className="h-5 w-5 shrink-0 accent-theme-accent"
                />
                {skill}
              </label>
            ))}
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-theme-line/70 p-3 text-sm text-theme-ink has-checked:border-theme-accent has-checked:bg-orange-50">
              <input
                type="checkbox"
                name="skills"
                value="Other"
                checked={hasOtherSkill}
                onChange={(event) => setHasOtherSkill(event.target.checked)}
                className="h-5 w-5 accent-theme-accent"
              />
              Other
            </label>
          </div>
          {errors.skills && (
            <p className="mt-3 text-sm text-red-700">{errors.skills}</p>
          )}
          {hasOtherSkill && (
            <div className="mt-5">
              <Field
                id="otherSkill"
                label="Other Skill"
                required
                error={errors.otherSkill}
              />
            </div>
          )}
        </fieldset>

        <fieldset className={sectionClass}>
          <legend className={legendClass}>Employment History</legend>
          <p className="clear-both text-sm leading-7 text-theme-muted">
            Add up to {MAX_EMPLOYERS} employers, starting with your most recent.
            If this is your first job, you can leave this section blank.
          </p>
          <div className="mt-5 space-y-5">
            {employers.map((key, index) => (
              <fieldset
                key={key}
                className="min-w-0 rounded-xl border border-theme-line p-4 sm:p-5"
              >
                <legend className="px-2 text-sm font-semibold text-theme-ink">
                  Employer #{index + 1}
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id={`employmentHistory.${index}.employer`}
                    label="Employer"
                    error={errors[`employmentHistory.${index}.employer`]}
                  />
                  <Field
                    id={`employmentHistory.${index}.position`}
                    label="Position"
                    error={errors[`employmentHistory.${index}.position`]}
                  />
                  <div className="sm:col-span-2">
                    <Field
                      id={`employmentHistory.${index}.dates`}
                      label="Employment Dates"
                      placeholder="e.g. June 2023 – Present"
                      error={errors[`employmentHistory.${index}.dates`]}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      id={`employmentHistory.${index}.responsibilities`}
                      label="Key Responsibilities"
                      multiline
                      maxLength={2000}
                      error={
                        errors[`employmentHistory.${index}.responsibilities`]
                      }
                    />
                  </div>
                </div>
                {employers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmployers((current) =>
                        current.filter((id) => id !== key),
                      );
                      setErrors({});
                      requestAnimationFrame(() =>
                        addEmployerRef.current?.focus(),
                      );
                    }}
                    className="mt-4 min-h-11 text-sm font-semibold text-theme-muted underline underline-offset-4 hover:text-theme-accent"
                    aria-label={`Remove employer ${index + 1}`}
                  >
                    Remove Employer
                  </button>
                )}
              </fieldset>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              ref={addEmployerRef}
              type="button"
              disabled={employers.length >= MAX_EMPLOYERS}
              onClick={() => {
                const index = employers.length;
                const id = nextEmployerId.current++;
                setEmployers((current) => [...current, id]);
                requestAnimationFrame(() =>
                  document
                    .getElementById(`employmentHistory.${index}.employer`)
                    ?.focus(),
                );
              }}
              className="min-h-11 rounded-xl border border-theme-line px-4 text-sm font-semibold text-theme-ink hover:border-theme-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Add Employer
            </button>
            <p role="status" className="text-sm text-theme-muted">
              {employers.length} of {MAX_EMPLOYERS} employers
            </p>
          </div>
          {errors.employmentHistory && (
            <p className="mt-3 text-sm text-red-700">
              {errors.employmentHistory}
            </p>
          )}
        </fieldset>

        <fieldset className={sectionClass}>
          <legend className={legendClass}>Education</legend>
          <div className="clear-both grid gap-5 sm:grid-cols-2">
            <Field
              id="education.school"
              label="School"
              error={errors["education.school"]}
            />
            <Field
              id="education.degree"
              label="Degree / Diploma"
              error={errors["education.degree"]}
            />
          </div>
        </fieldset>

        <fieldset className={sectionClass}>
          <legend className={legendClass}>Availability</legend>
          <p className="clear-both mb-5 text-sm leading-7 text-theme-muted">
            Tell us your hours for each day, or enter “Flexible” or
            “Unavailable.”
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {WEEKDAYS.map((day) => (
              <Field
                key={day}
                id={`availability.${day}`}
                label={`${day} — Hours Available`}
                placeholder="e.g. 6:00 AM – 2:00 PM"
                maxLength={100}
                error={errors[`availability.${day}`]}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className={sectionClass}>
          <legend className={legendClass}>References</legend>
          <p className="clear-both text-sm leading-7 text-theme-muted">
            You may provide up to two references who can speak to your work or
            character.
          </p>
          <div className="mt-5 grid gap-5">
            {[0, 1].map((index) => (
              <fieldset
                key={index}
                className="min-w-0 rounded-xl border border-theme-line p-4 sm:p-5"
              >
                <legend className="px-2 text-sm font-semibold text-theme-ink">
                  Reference #{index + 1}
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id={`references.${index}.name`}
                    label="Full Name"
                    error={errors[`references.${index}.name`]}
                  />
                  <Field
                    id={`references.${index}.relationship`}
                    label="Relationship"
                    error={errors[`references.${index}.relationship`]}
                  />
                  <Field
                    id={`references.${index}.phone`}
                    label="Phone"
                    type="tel"
                    maxLength={40}
                    error={errors[`references.${index}.phone`]}
                  />
                  <Field
                    id={`references.${index}.email`}
                    label="Email"
                    type="email"
                    maxLength={254}
                    error={errors[`references.${index}.email`]}
                  />
                </div>
              </fieldset>
            ))}
          </div>
          {errors.references && (
            <p className="mt-3 text-sm text-red-700">{errors.references}</p>
          )}
        </fieldset>

        <fieldset className={sectionClass}>
          <legend className={legendClass}>Applicant Certification</legend>
          <label className="clear-both flex cursor-pointer items-start gap-3 text-sm leading-7 text-theme-muted">
            <input
              id="certified"
              name="certified"
              type="checkbox"
              required
              className="mt-1 h-5 w-5 shrink-0 accent-theme-accent"
              aria-invalid={!!errors.certified}
              aria-describedby={
                errors.certified ? "certified-error" : undefined
              }
            />
            <span>
              {APPLICANT_CERTIFICATION}{" "}
              <span className="font-semibold text-theme-ink">*</span>
            </span>
          </label>
          {errors.certified && (
            <p id="certified-error" className="mt-3 text-sm text-red-700">
              {errors.certified}
            </p>
          )}
        </fieldset>

        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-[0.95rem] bg-theme-accent px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-accent disabled:cursor-wait sm:w-auto"
        >
          {pending
            ? "Submitting…"
            : submitted
              ? "Application Received"
              : "Submit Application"}
        </button>
      </fieldset>
    </form>
  );
}

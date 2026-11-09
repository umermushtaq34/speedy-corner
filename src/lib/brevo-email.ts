import type { CareerApplication } from "./career-application";
import type { Job } from "../constants/jobs";
import { FooterContact } from "../constants/footer";

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const BRAND = "Speedy Corner";
const BRAND_COLOR = "#c8102e";

type Party = { email: string; name?: string };

// Optional overrides; both default to the public business address.
const senderAddress = () =>
  process.env.BREVO_SENDER_EMAIL || FooterContact.email;
const clientAddress = () =>
  process.env.CAREERS_NOTIFICATION_EMAIL || FooterContact.email;

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
const multiline = (value: string) => esc(value).replace(/\r?\n/g, "<br>");
const orDash = (value: string) => (value ? esc(value) : "—");

async function sendBrevoEmail(message: {
  to: Party[];
  replyTo?: Party;
  subject: string;
  htmlContent: string;
  textContent: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not configured.");

  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: BRAND, email: senderAddress() },
      ...message,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(
      `Brevo request failed (${response.status}): ${(await response.text()).slice(0, 300)}`,
    );
  }
}

const layout = (title: string, body: string) => `<!doctype html>
<html lang="en"><body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
<tr><td style="background:${BRAND_COLOR};padding:22px 32px;color:#ffffff;font-size:22px;font-weight:bold;letter-spacing:.5px;">${BRAND}</td></tr>
<tr><td style="padding:32px;font-size:15px;line-height:1.6;">
<h1 style="margin:0 0 16px;font-size:20px;color:#111827;">${esc(title)}</h1>
${body}
</td></tr>
<tr><td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;line-height:1.5;">
${BRAND} · ${esc(FooterContact.address)}<br>${esc(FooterContact.phone)} · ${esc(FooterContact.email)}
</td></tr>
</table></td></tr></table></body></html>`;

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 12px;width:34%;background:#f9fafb;border:1px solid #e5e7eb;font-weight:bold;vertical-align:top;">${esc(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;vertical-align:top;">${value}</td></tr>`;
const table = (rows: string[]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin:0 0 24px;">${rows.join("")}</table>`;
const heading = (text: string) =>
  `<h2 style="margin:24px 0 10px;font-size:16px;color:${BRAND_COLOR};border-bottom:2px solid #e5e7eb;padding-bottom:6px;">${esc(text)}</h2>`;

export async function sendApplicantConfirmation(
  application: CareerApplication,
  job: Job,
) {
  const firstName =
    application.fullName.split(/\s+/)[0] || application.fullName;
  const htmlContent = layout(
    "We’ve received your application",
    `<p>Hi ${esc(firstName)},</p>
<p>Thank you for applying for the <strong>${esc(job.title)}</strong> position at ${BRAND}. This email confirms that we’ve received your application.</p>
<p>Our team will review your details carefully. If your experience matches what we’re looking for, we’ll contact you using the phone number or email address you provided.</p>
${table([
  row("Position", esc(job.title)),
  row("Name", esc(application.fullName)),
  row("Phone", esc(application.phone)),
  row("Email", esc(application.email)),
])}
<p>If any of your information changes, simply reply to this email or contact us at ${esc(FooterContact.email)}.</p>
<p style="margin-bottom:0;">Kind regards,<br><strong>The ${BRAND} Hiring Team</strong></p>`,
  );
  const textContent = `Hi ${firstName},

Thank you for applying for the ${job.title} position at ${BRAND}. We've received your application and our team will review it carefully. If your experience matches what we're looking for, we'll contact you by phone or email.

If any of your information changes, reply to this email or contact us at ${FooterContact.email}.

Kind regards,
The ${BRAND} Hiring Team`;

  await sendBrevoEmail({
    to: [{ email: application.email, name: application.fullName }],
    replyTo: { email: clientAddress(), name: `${BRAND} Hiring` },
    subject: `We’ve received your application – ${job.title}`,
    htmlContent,
    textContent,
  });
}

export async function sendApplicationToClient(
  application: CareerApplication,
  job: Job,
) {
  const skills = [
    ...application.skills.filter((skill) => skill !== "Other"),
    ...(application.skills.includes("Other") && application.otherSkill
      ? [`Other: ${application.otherSkill}`]
      : []),
  ];

  const employment = application.employmentHistory.length
    ? application.employmentHistory
        .map(
          (entry, index) =>
            `${index ? '<div style="height:12px"></div>' : ""}${table([
              row("Employer", esc(entry.employer)),
              row("Position", esc(entry.position)),
              row("Dates", esc(entry.dates)),
              row(
                "Responsibilities",
                entry.responsibilities
                  ? multiline(entry.responsibilities)
                  : "—",
              ),
            ])}`,
        )
        .join("")
    : "<p>No employment history provided.</p>";

  const references = application.references.length
    ? application.references
        .map((ref) =>
          table([
            row("Name", esc(ref.name)),
            row("Relationship", orDash(ref.relationship)),
            row("Phone", orDash(ref.phone)),
            row("Email", orDash(ref.email)),
          ]),
        )
        .join("")
    : "<p>No references provided.</p>";

  const htmlContent = layout(
    `New application: ${job.title}`,
    `<p>A new application was submitted through the ${BRAND} careers page. Reply to this email to respond directly to the applicant.</p>
${heading("Applicant")}
${table([
  row("Position", esc(job.title)),
  row("Full name", esc(application.fullName)),
  row("Address", multiline(application.address)),
  row("Phone", esc(application.phone)),
  row(
    "Email",
    `<a href="mailto:${esc(application.email)}" style="color:${BRAND_COLOR};">${esc(application.email)}</a>`,
  ),
  row("At least 21 years of age", esc(application.isOver21)),
])}
${heading("Skills")}
<p style="margin:0 0 24px;">${skills.length ? skills.map(esc).join(" · ") : "None selected."}</p>
${heading("Employment history")}
${employment}
${heading("Education")}
${table([
  row("School", orDash(application.education.school)),
  row("Degree", orDash(application.education.degree)),
])}
${heading("Availability")}
${table(Object.entries(application.availability).map(([day, hours]) => row(day, orDash(hours))))}
${heading("References")}
${references}
<p style="margin:0;font-size:13px;color:#6b7280;">The applicant certified that the information provided is accurate.</p>`,
  );

  const textContent = [
    `New application: ${job.title}`,
    "",
    `Name: ${application.fullName}`,
    `Address: ${application.address}`,
    `Phone: ${application.phone}`,
    `Email: ${application.email}`,
    `At least 21 years of age: ${application.isOver21}`,
    `Skills: ${skills.join(", ") || "None"}`,
    "",
    "Employment history:",
    ...(application.employmentHistory.length
      ? application.employmentHistory.map(
          (e) =>
            `- ${e.employer} | ${e.position} | ${e.dates}${e.responsibilities ? `\n  ${e.responsibilities}` : ""}`,
        )
      : ["- None"]),
    "",
    `Education: ${application.education.school || "—"} / ${application.education.degree || "—"}`,
    "",
    "Availability:",
    ...Object.entries(application.availability).map(
      ([day, hours]) => `- ${day}: ${hours || "—"}`,
    ),
    "",
    "References:",
    ...(application.references.length
      ? application.references.map((r) =>
          `- ${r.name} (${r.relationship || "—"}) ${r.phone || ""} ${r.email || ""}`.trim(),
        )
      : ["- None"]),
  ].join("\n");

  await sendBrevoEmail({
    to: [{ email: clientAddress(), name: `${BRAND} Hiring` }],
    replyTo: { email: application.email, name: application.fullName },
    subject: `New ${job.title} application – ${application.fullName}`,
    htmlContent,
    textContent,
  });
}

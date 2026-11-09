import { findJob } from "@/constants/jobs";
import { validateApplication } from "@/lib/career-application";
import {
  sendApplicantConfirmation,
  sendApplicationToClient,
} from "@/lib/brevo-email";

const json = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const job = findJob((await params).slug);
  if (!job) return json({ message: "This position is not available." }, 404);

  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return json(
      { message: "Please submit your application from this website." },
      403,
    );
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ message: "Please submit a valid application." }, 415);
  }

  // Bound the body while reading, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return json({ message: "Please complete the application form." }, 400);
  let size = 0;
  let body = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 40000) {
        await reader.cancel();
        return json(
          {
            message:
              "Your application is too long. Please shorten your entries.",
          },
          413,
        );
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } catch {
    return json(
      { message: "We couldn’t read your application. Please try again." },
      400,
    );
  }

  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return json({ message: "Please submit a valid application." }, 400);
  }
  const { data, errors } = validateApplication(input, job);
  if (!data)
    return json(
      { message: "Please review the highlighted fields.", errors },
      400,
    );

  // The client email is the one that matters; the confirmation is best-effort.
  const [clientResult, applicantResult] = await Promise.allSettled([
    sendApplicationToClient(data, job),
    sendApplicantConfirmation(data, job),
  ]);
  if (clientResult.status === "rejected") {
    console.error("Careers: failed to email application", clientResult.reason);
    return json(
      {
        message:
          "We couldn’t send your application right now. Please try again in a few minutes.",
      },
      502,
    );
  }
  if (applicantResult.status === "rejected")
    console.error("Careers: failed to send confirmation", applicantResult.reason);

  return json(
    {
      message:
        "Thank you! Your application has been submitted. We’ll be in touch if your experience is a good match.",
    },
    200,
  );
}

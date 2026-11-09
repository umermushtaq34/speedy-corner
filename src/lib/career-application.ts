import { MAX_EMPLOYERS, WEEKDAYS, type Job } from "../constants/jobs";

export type Employment = {
  employer: string;
  position: string;
  dates: string;
  responsibilities: string;
};

export type Reference = {
  name: string;
  relationship: string;
  phone: string;
  email: string;
};

export type CareerApplication = {
  position: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  isOver21: "Yes" | "No";
  skills: string[];
  otherSkill: string;
  employmentHistory: Employment[];
  education: { school: string; degree: string };
  availability: Record<string, string>;
  references: Reference[];
  certified: boolean;
};

export type ApplicationErrors = Record<string, string>;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// Shared validation keeps browser feedback and the future delivery endpoint in sync.
export function validateApplication(
  value: unknown,
  job: Job,
): {
  data: CareerApplication | null;
  errors: ApplicationErrors;
} {
  if (!isRecord(value))
    return {
      data: null,
      errors: { form: "Please check your application and try again." },
    };

  const errors: ApplicationErrors = {};
  function text(value: unknown, path: string, required = false, limit = 200) {
    if (typeof value !== "string") {
      errors[path] = "Please enter a valid value.";
      return "";
    }
    const result = value.trim();
    if (required && !result) errors[path] = "This field is required.";
    if (result.length > limit)
      errors[path] = `Please use ${limit} characters or fewer.`;
    return result;
  }

  if (value.position !== job.slug)
    errors.position =
      "Please select an available position from the careers page.";
  const fullName = text(value.fullName, "fullName", true);
  const address = text(value.address, "address", true, 500);
  const phone = text(value.phone, "phone", true, 40);
  const email = text(value.email, "email", true, 254);
  if (phone && !/^[+\d\s().\-xext]{7,40}$/i.test(phone))
    errors.phone = "Please enter a valid phone number.";
  if (phone && phone.replace(/\D/g, "").length < 7)
    errors.phone = "Please enter a valid phone number.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";

  const isOver21 = value.isOver21;
  if (isOver21 !== "Yes" && isOver21 !== "No")
    errors.isOver21 = "Please select Yes or No.";

  const allowedSkills =[...job.skills, "Other"];
  const skills = Array.isArray(value.skills) ? value.skills : [];
  if (
    !Array.isArray(value.skills) ||
    skills.length > allowedSkills.length ||
    skills.some(
      (skill) => typeof skill !== "string" || !allowedSkills.includes(skill),
    )
  ) {
    errors.skills = "Please select skills from the list.";
  }
  const otherSkill = text(
    value.otherSkill,
    "otherSkill",
    skills.includes("Other"),
  );

  const employmentHistory: Employment[] = [];
  if (
    !Array.isArray(value.employmentHistory) ||
    value.employmentHistory.length > MAX_EMPLOYERS
  ) {
    errors.employmentHistory = `Please include no more than ${MAX_EMPLOYERS} employers.`;
  } else {
    value.employmentHistory.forEach((entry, index) => {
      const path = `employmentHistory.${index}`;
      if (!isRecord(entry)) {
        errors.employmentHistory = "Please check your employment history.";
        return;
      }
      const hasEntry = Object.values(entry).some(
        (field) => typeof field === "string" && field.trim(),
      );
      const employer = text(entry.employer, `${path}.employer`, hasEntry);
      const position = text(entry.position, `${path}.position`, hasEntry);
      const dates = text(entry.dates, `${path}.dates`, hasEntry);
      const responsibilities = text(
        entry.responsibilities,
        `${path}.responsibilities`,
        false,
        2000,
      );
      if (hasEntry)
        employmentHistory.push({ employer, position, dates, responsibilities });
    });
  }

  const education = isRecord(value.education) ? value.education : {};
  const school = text(education.school, "education.school");
  const degree = text(education.degree, "education.degree");
  const availability: Record<string, string> = {};
  const suppliedAvailability = isRecord(value.availability)
    ? value.availability
    : {};
  for (const day of WEEKDAYS)
    availability[day] = text(
      suppliedAvailability[day],
      `availability.${day}`,
      false,
      100,
    );

  const references: Reference[] = [];
  if (!Array.isArray(value.references) || value.references.length > 2) {
    errors.references = "Please include no more than two references.";
  } else {
    value.references.forEach((entry, index) => {
      if (!isRecord(entry)) {
        errors.references = "Please check your references.";
        return;
      }
      const path = `references.${index}`;
      const hasEntry = Object.values(entry).some(
        (field) => typeof field === "string" && field.trim(),
      );
      const name = text(entry.name, `${path}.name`, hasEntry);
      const relationship = text(entry.relationship, `${path}.relationship`);
      const phone = text(entry.phone, `${path}.phone`, false, 40);
      const email = text(entry.email, `${path}.email`, false, 254);
      if (hasEntry && !phone && !email)
        errors[`${path}.phone`] =
          "Please provide a phone number or email for this reference.";
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors[`${path}.email`] = "Please enter a valid email address.";
      if (hasEntry) references.push({ name, relationship, phone, email });
    });
  }
  if (value.certified !== true)
    errors.certified =
      "Please accept the applicant certification before submitting.";

  if (Object.keys(errors).length) return { data: null, errors };
  return {
    data: {
      position: job.slug,
      fullName,
      address,
      phone,
      email,
      isOver21: isOver21 as "Yes" | "No",
      skills: [...new Set(skills as string[])],
      otherSkill,
      employmentHistory,
      education: { school, degree },
      availability,
      references,
      certified: true,
    },
    errors,
  };
}

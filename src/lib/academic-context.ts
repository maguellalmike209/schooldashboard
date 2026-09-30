// Shared static academic context for the read-only V1 prototype.
// Lecture schedule information is a Course Fact, not a timed Class Meeting.
export const academicContext = {
  term: "Fall Quarter 2026",
  referenceDate: "2026-09-25",
  currentWeek: {
    startsOn: "2026-09-21",
    endsOn: "2026-09-27",
  },
  courses: [
    {
      id: "phy-009d",
      code: "PHY 009D",
      name: "Modern Physics",
    },
    {
      id: "wrt-101",
      code: "WRT 101",
      name: "Academic Writing",
    },
  ],
  referenceDayLecture: {
    courseId: "phy-009d",
    number: "02",
    date: "2026-09-25",
  },
} as const;

export type Course = (typeof academicContext.courses)[number];

export function getCourse(courseId: string) {
  return academicContext.courses.find((course) => course.id === courseId);
}

function utcDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`);
}

export function formatReferenceDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(utcDate(academicContext.referenceDate));
}

export function formatCurrentWeek() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return formatter.formatRange(
    utcDate(academicContext.currentWeek.startsOn),
    utcDate(academicContext.currentWeek.endsOn),
  );
}

// The shared V1 snapshot needed by the SD-002 shell.
// Lecture schedule information is a Course Fact, not a timed Class Meeting.
export const academicContext = {
  term: "Fall Quarter 2026",
  referenceDate: "2026-09-25",
  currentWeek: {
    startsOn: "2026-09-21",
    endsOn: "2026-09-27",
  },
  course: {
    id: "phy-009d",
    code: "PHY 009D",
    name: "Modern Physics",
  },
  referenceDayLecture: {
    courseId: "phy-009d",
    number: "02",
    date: "2026-09-25",
  },
} as const;

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

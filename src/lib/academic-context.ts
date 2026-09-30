// Shared static academic context for the read-only V1 prototype.
// Lecture schedule information is a Course Fact, not a timed Class Meeting.
export type LearningObjective = {
  id: string;
  courseId: string;
  weekStartsOn: string;
  title: string;
  authoredOrder: number;
  origin: "authored-plan";
};

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  dueTime?: string;
};

export type StudyTask = {
  id: string;
  courseId: string;
  plannedDate: string;
  authoredOrder: number;
  title: string;
  estimatedMinutes: number | null;
  isComplete: boolean;
  objectiveIds: string[];
  assignmentId: string | null;
  origin: "authored-plan";
};

const learningObjectives: LearningObjective[] = [
  { id: "phy9d-objective-sound", courseId: "phy-009d", weekStartsOn: "2026-09-21", title: "Explain sound-wave and Doppler-effect ideas", authoredOrder: 1, origin: "authored-plan" },
  { id: "phy9d-objective-relativity", courseId: "phy-009d", weekStartsOn: "2026-09-21", title: "Explain the relativity principle and spacetime events", authoredOrder: 2, origin: "authored-plan" },
  { id: "wrt101-objective-argument", courseId: "wrt-101", weekStartsOn: "2026-09-21", title: "Build a clear argument for the response draft", authoredOrder: 3, origin: "authored-plan" },
];

const assignments: Assignment[] = [
  { id: "phy9d-problem-1", courseId: "phy-009d", title: "Problem #1", dueDate: "2026-09-28", dueTime: "23:59" },
  { id: "wrt101-response-draft", courseId: "wrt-101", title: "Response draft", dueDate: "2026-09-27" },
];

const studyTasks: StudyTask[] = [
  { id: "phy9d-task-review-lecture-01", courseId: "phy-009d", plannedDate: "2026-09-23", authoredOrder: 1, title: "Review Lecture #01 sound concepts", estimatedMinutes: 20, isComplete: true, objectiveIds: ["phy9d-objective-sound"], assignmentId: null, origin: "authored-plan" },
  { id: "phy9d-task-practice-doppler", courseId: "phy-009d", plannedDate: "2026-09-24", authoredOrder: 2, title: "Practice Doppler-effect examples", estimatedMinutes: 30, isComplete: false, objectiveIds: ["phy9d-objective-sound"], assignmentId: null, origin: "authored-plan" },
  { id: "wrt101-task-outline", courseId: "wrt-101", plannedDate: "2026-09-24", authoredOrder: 3, title: "Outline response draft", estimatedMinutes: 25, isComplete: true, objectiveIds: ["wrt101-objective-argument"], assignmentId: "wrt101-response-draft", origin: "authored-plan" },
  { id: "phy9d-task-sketch-event", courseId: "phy-009d", plannedDate: "2026-09-25", authoredOrder: 4, title: "Sketch a spacetime event example", estimatedMinutes: 20, isComplete: true, objectiveIds: ["phy9d-objective-relativity"], assignmentId: null, origin: "authored-plan" },
  { id: "phy9d-task-review-lecture-02", courseId: "phy-009d", plannedDate: "2026-09-25", authoredOrder: 5, title: "Review Lecture #02 relativity topics", estimatedMinutes: 25, isComplete: false, objectiveIds: ["phy9d-objective-relativity"], assignmentId: null, origin: "authored-plan" },
  { id: "wrt101-task-organize-notes", courseId: "wrt-101", plannedDate: "2026-09-25", authoredOrder: 6, title: "Organize class notes", estimatedMinutes: null, isComplete: false, objectiveIds: [], assignmentId: null, origin: "authored-plan" },
  { id: "phy9d-task-begin-problem-1", courseId: "phy-009d", plannedDate: "2026-09-25", authoredOrder: 7, title: "Begin Problem #1", estimatedMinutes: 30, isComplete: false, objectiveIds: ["phy9d-objective-relativity"], assignmentId: "phy9d-problem-1", origin: "authored-plan" },
];

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
    {
      id: "his-110",
      code: "HIS 110",
      name: "World History",
    },
  ],
  referenceDayLecture: {
    courseId: "phy-009d",
    number: "02",
    date: "2026-09-25",
    topics: ["Relativity principle", "Spacetime events", "Time measurement"],
  },
  courseWeekContexts: [
    {
      courseId: "phy-009d",
      summary: "Course beginning: sound review and introduction to special relativity.",
      source: "Current lecture schedule",
    },
  ],
  courseMaterials: [
    {
      id: "phy9d-textbook",
      courseId: "phy-009d",
      kind: "Assigned textbook",
      title: "UCD Physics 9D — Modern Physics",
    },
  ],
  learningObjectives,
  assignments,
  studyTasks,
} as const;

export type Course = (typeof academicContext.courses)[number];

export function getCourse(courseId: string) {
  return academicContext.courses.find((course) => course.id === courseId);
}

export function getWeeklyObjectives(courseId: string) {
  return academicContext.learningObjectives
    .filter((objective) => objective.courseId === courseId && objective.weekStartsOn === academicContext.currentWeek.startsOn)
    .sort((first, second) => first.authoredOrder - second.authoredOrder);
}

export function getWeeklyStudyTasks(courseId?: string) {
  return academicContext.studyTasks
    .filter((task) => task.plannedDate >= academicContext.currentWeek.startsOn
      && task.plannedDate <= academicContext.currentWeek.endsOn
      && (!courseId || task.courseId === courseId))
    .sort((first, second) => first.authoredOrder - second.authoredOrder);
}

export function getWeeklyAssignments(courseId: string) {
  const linkedIds = new Set(getWeeklyStudyTasks(courseId).map((task) => task.assignmentId));
  return academicContext.assignments.filter((assignment) => assignment.courseId === courseId
    && ((assignment.dueDate >= academicContext.currentWeek.startsOn
      && assignment.dueDate <= academicContext.currentWeek.endsOn)
      || linkedIds.has(assignment.id)));
}

export function getWeeklyProgress(courseId?: string) {
  const tasks = getWeeklyStudyTasks(courseId);
  return { completed: tasks.filter((task) => task.isComplete).length, total: tasks.length };
}

export function formatWeeklyProgress({ completed, total }: { completed: number; total: number }) {
  return total === 0 ? "No study tasks planned." : `${completed} of ${total} complete`;
}

function utcDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`);
}

export function formatAcademicDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(utcDate(isoDate));
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

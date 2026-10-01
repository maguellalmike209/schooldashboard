import { describe, expect, it } from "vitest";
import {
  academicContext,
  formatWeeklyProgress,
  getCourse,
  getNextAction,
  getTodayStudyTasks,
  getUpcomingAssignments,
  getWeeklyAssignments,
  getWeeklyObjectives,
  getWeeklyProgress,
  getWeeklyStudyTasks,
  selectTodayStudyTasks,
  selectUpcomingAssignments,
  type Assignment,
  type StudyTask,
} from "@/lib/academic-context";

function task(id: string, plannedDate: string, authoredOrder: number, isComplete = false): StudyTask {
  return {
    id,
    courseId: "phy-009d",
    plannedDate,
    authoredOrder,
    title: id,
    estimatedMinutes: null,
    isComplete,
    objectiveIds: [],
    assignmentId: null,
    origin: "authored-plan",
  };
}

function assignment(id: string, dueDate: string, authoredOrder: number): Assignment {
  return { id, courseId: "phy-009d", title: id, dueDate, authoredOrder };
}

describe("academic plan selectors", () => {
  it("selects only incomplete reference-date tasks in authored order", () => {
    const candidates = [
      task("later", "2026-09-25", 7),
      task("earlier-unfinished", "2026-09-24", 1),
      task("completed-today", "2026-09-25", 2, true),
      task("first", "2026-09-25", 3),
      task("future", "2026-09-26", 0),
    ];

    expect(selectTodayStudyTasks(candidates, "2026-09-25").map((item) => item.id))
      .toEqual(["first", "later"]);
    expect(candidates.map((item) => item.id)[0]).toBe("later");
  });

  it("uses the first Today task for Dashboard Next Action", () => {
    const today = getTodayStudyTasks();
    expect(today.map((item) => item.id)).toEqual([
      "phy9d-task-review-lecture-02",
      "wrt101-task-organize-notes",
      "phy9d-task-begin-problem-1",
    ]);
    expect(getNextAction()?.id).toBe(today[0].id);
    expect(today.every((item) => item.plannedDate === academicContext.referenceDate && !item.isComplete)).toBe(true);
    expect(getWeeklyStudyTasks().some((item) => item.id === "phy9d-task-practice-doppler")).toBe(true);
    expect(today.some((item) => item.id === "phy9d-task-practice-doppler")).toBe(false);
  });

  it("sorts upcoming assignments by due date then authored order without mutating input", () => {
    const candidates = [
      assignment("second-tie", "2026-09-27", 2),
      assignment("past", "2026-09-24", 1),
      assignment("first-tie", "2026-09-27", 1),
      assignment("due-today", "2026-09-25", 9),
    ];

    expect(selectUpcomingAssignments(candidates, "2026-09-25").map((item) => item.id))
      .toEqual(["due-today", "first-tie", "second-tie"]);
    expect(candidates[0].id).toBe("second-tie");
    expect(getUpcomingAssignments().map((item) => item.id))
      .toEqual(["his110-map-quiz", "wrt101-response-draft", "phy9d-problem-1"]);
  });

  it("keeps due dates distinct from authored study work", () => {
    const dueToday = getUpcomingAssignments().find((item) => item.dueDate === academicContext.referenceDate);
    expect(dueToday?.id).toBe("his110-map-quiz");
    expect(academicContext.studyTasks.some((item) => item.assignmentId === dueToday?.id)).toBe(false);

    const problem = academicContext.assignments.find((item) => item.id === "phy9d-problem-1");
    const linkedTask = academicContext.studyTasks.find((item) => item.assignmentId === problem?.id);
    expect(problem?.dueDate).toBe("2026-09-28");
    expect(linkedTask?.plannedDate).toBe("2026-09-25");
    expect(linkedTask?.plannedDate).not.toBe(problem?.dueDate);
  });

  it("keeps relationships within their Course and preserves absent duration", () => {
    const courseIds = new Set<string>(academicContext.courses.map((course) => course.id));
    for (const item of academicContext.studyTasks) {
      expect(courseIds.has(item.courseId)).toBe(true);
      for (const objectiveId of item.objectiveIds) {
        expect(academicContext.learningObjectives.find((objective) => objective.id === objectiveId)?.courseId)
          .toBe(item.courseId);
      }
      if (item.assignmentId) {
        expect(academicContext.assignments.find((linked) => linked.id === item.assignmentId)?.courseId)
          .toBe(item.courseId);
      }
    }
    expect(academicContext.studyTasks.find((item) => item.id === "wrt101-task-organize-notes")?.estimatedMinutes).toBeNull();
    expect(getCourse("unknown-course")).toBeUndefined();
    expect(getWeeklyObjectives("unknown-course")).toEqual([]);
    expect(getWeeklyAssignments("unknown-course")).toEqual([]);
  });

  it("calculates progress from raw weekly Study Task counts, including zero-task Courses", () => {
    expect(getWeeklyProgress()).toEqual({ completed: 3, total: 7 });
    expect(getWeeklyProgress("phy-009d")).toEqual({ completed: 2, total: 5 });
    expect(getWeeklyProgress("wrt-101")).toEqual({ completed: 1, total: 2 });
    expect(getWeeklyProgress("his-110")).toEqual({ completed: 0, total: 0 });
    expect(formatWeeklyProgress(getWeeklyProgress("his-110"))).toBe("No study tasks planned.");
  });
});

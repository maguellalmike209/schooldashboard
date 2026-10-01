import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AssignmentList } from "@/components/assignment-list";
import { StudyTaskList } from "@/components/study-task-list";
import {
  academicContext,
  getUpcomingAssignments,
  getWeeklyStudyTasks,
  type StudyTask,
} from "@/lib/academic-context";

describe("fixture-to-presentation behavior", () => {
  it("shows Course-scoped weekly tasks and leaves an absent estimate absent", () => {
    const html = renderToStaticMarkup(<StudyTaskList tasks={getWeeklyStudyTasks("wrt-101")} />);
    expect(html).toContain("Outline response draft");
    expect(html).toContain("Organize class notes");
    expect(html).not.toContain("Doppler-effect");
    expect(html).toContain("25 min planned");
    expect(html.match(/min planned/g)).toHaveLength(1);
  });

  it("renders the zero-task Course state and due-today Assignment separately", () => {
    const emptyTasks = renderToStaticMarkup(<StudyTaskList tasks={getWeeklyStudyTasks("his-110")} />);
    const assignments = renderToStaticMarkup(<AssignmentList assignments={getUpcomingAssignments("his-110")} />);
    expect(emptyTasks).toContain("No study tasks planned.");
    expect(assignments).toContain("Map quiz");
    expect(assignments).toContain(academicContext.referenceDate);
  });

  it("rejects an objective or Assignment belonging to another Course", () => {
    const base = getWeeklyStudyTasks("phy-009d")[0];
    const wrongObjective: StudyTask = { ...base, objectiveIds: ["wrt101-objective-argument"] };
    const wrongAssignment: StudyTask = { ...base, assignmentId: "wrt101-response-draft" };

    expect(() => renderToStaticMarkup(<StudyTaskList tasks={[wrongObjective]} />))
      .toThrow("invalid objective relationship");
    expect(() => renderToStaticMarkup(<StudyTaskList tasks={[wrongAssignment]} />))
      .toThrow("invalid assignment relationship");
  });
});

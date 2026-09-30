import Link from "next/link";
import { academicContext, formatAcademicDate, getCourse, type StudyTask } from "@/lib/academic-context";

export function TodayTaskList({ tasks }: { tasks: StudyTask[] }) {
  if (tasks.length === 0) {
    return <p className="text-sm text-slate-600">No study tasks remain on today&apos;s plan.</p>;
  }

  return (
    <ol className="space-y-3">
      {tasks.map((task) => {
        const course = getCourse(task.courseId);
        if (!course) throw new Error(`Study Task ${task.id} has no matching course.`);
        const objectives = task.objectiveIds.map((id) => {
          const objective = academicContext.learningObjectives.find((item) => item.id === id);
          if (!objective || objective.courseId !== task.courseId) {
            throw new Error(`Study Task ${task.id} has an invalid objective relationship.`);
          }
          return objective;
        });
        const assignment = task.assignmentId
          ? academicContext.assignments.find((item) => item.id === task.assignmentId)
          : null;
        if (task.assignmentId && (!assignment || assignment.courseId !== task.courseId)) {
          throw new Error(`Study Task ${task.id} has an invalid assignment relationship.`);
        }

        return (
          <li key={task.id} data-task-id={task.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <Link href={`/courses/${course.id}`} className="text-xs font-bold uppercase tracking-wide text-sky-800 underline-offset-2 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
              {course.code} · {course.name}
            </Link>
            <p className="mt-2 font-semibold text-slate-950">{task.title}</p>
            <p className="mt-1 text-xs text-slate-600">
              Planned <time dateTime={task.plannedDate}>{formatAcademicDate(task.plannedDate)}</time>
              {task.estimatedMinutes !== null && <> · {task.estimatedMinutes} min planned</>}
            </p>
            {objectives.map((objective) => (
              <p key={objective.id} className="mt-2 text-xs text-slate-600">Supports objective: {objective.title}</p>
            ))}
            {assignment && (
              <p className="mt-1 text-xs text-slate-600">
                For assignment: {assignment.title} · Due <time dateTime={assignment.dueDate}>{formatAcademicDate(assignment.dueDate)}</time>
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

import { academicContext, formatAcademicDate, type StudyTask } from "@/lib/academic-context";

export function StudyTaskList({ tasks }: { tasks: StudyTask[] }) {
  if (tasks.length === 0) {
    return <p className="text-sm text-slate-600">No study tasks planned.</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => {
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
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-600">
              <time dateTime={task.plannedDate}>{formatAcademicDate(task.plannedDate)}</time>
              <span aria-hidden="true">·</span>
              <span>{task.isComplete ? "Complete" : "Incomplete"}</span>
              {task.estimatedMinutes !== null && <><span aria-hidden="true">·</span><span>{task.estimatedMinutes} min planned</span></>}
            </div>
            <p className="mt-2 font-semibold text-slate-950">{task.title}</p>
            {objectives.map((objective) => (
              <p key={objective.id} className="mt-2 text-xs text-slate-600">Supports objective: {objective.title}</p>
            ))}
            {assignment && <p className="mt-1 text-xs text-slate-600">For assignment: {assignment.title}</p>}
          </li>
        );
      })}
    </ul>
  );
}

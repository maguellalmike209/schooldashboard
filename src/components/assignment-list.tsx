import { formatAcademicDate, getCourse, type Assignment } from "@/lib/academic-context";

export function AssignmentList({ assignments, emptyMessage = "No upcoming assignments.", layout = "list" }: {
  assignments: Assignment[];
  emptyMessage?: string;
  layout?: "list" | "grid";
}) {
  if (assignments.length === 0) {
    return <p className="text-sm text-slate-600">{emptyMessage}</p>;
  }

  return (
    <ul className={layout === "grid" ? "grid gap-3 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"}>
      {assignments.map((assignment) => {
        const course = getCourse(assignment.courseId);
        if (!course) throw new Error(`Assignment ${assignment.id} has no matching course.`);

        return (
          <li key={assignment.id} data-assignment-id={assignment.id} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-800">{course.code} · {course.name}</p>
            <p className="mt-2 font-semibold text-slate-950">{assignment.title}</p>
            <p className="mt-1 text-sm text-slate-700">
              Due <time dateTime={assignment.dueDate}>{formatAcademicDate(assignment.dueDate)}</time>
              {assignment.dueTime && <> · {assignment.dueTime}</>}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

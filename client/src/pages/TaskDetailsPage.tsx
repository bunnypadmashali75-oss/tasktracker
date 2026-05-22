import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTask } from '../api/tasks';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id || ''),
    enabled: Boolean(id),
  });
  const task = (data as any)?.data;

  if (isLoading) {
    return <div className="rounded-3xl bg-white p-8 shadow-soft">Loading task details...</div>;
  }

  if (!task) {
    return <div className="rounded-3xl bg-white p-8 shadow-soft">Task not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{task.title}</h1>
            <p className="text-sm text-slate-500">{task.description}</p>
          </div>
          <Link to="/" className="rounded-full border border-slate-200 px-4 py-2 text-sm text-brand-600 hover:bg-slate-50">
            Back to dashboard
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Status</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{task.status}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Priority</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{task.priority}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Due Date</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Assigned</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{task.assignedTo?.name || 'Me'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;

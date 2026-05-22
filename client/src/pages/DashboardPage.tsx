import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/tasks';
import TaskCard from '../components/TaskCard';

const DashboardPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks', { page: 1, limit: 8 }],
    queryFn: () => getTasks({ page: 1, limit: 8 }),
  });

  const tasks = (data as any)?.data?.tasks || [];
  const totals = useMemo(() => {
    return {
      all: (data as any)?.data?.total || 0,
      completed: tasks.filter((task: any) => task.status === 'Completed').length,
      inProgress: tasks.filter((task: any) => task.status === 'In Progress').length,
      todo: tasks.filter((task: any) => task.status === 'Todo').length,
    };
  }, [data, tasks]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Tasks', value: totals.all, color: 'bg-brand-500' },
          { label: 'Completed', value: totals.completed, color: 'bg-emerald-500' },
          { label: 'In Progress', value: totals.inProgress, color: 'bg-amber-500' },
          { label: 'Todo', value: totals.todo, color: 'bg-slate-500' },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl bg-white p-5 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{card.label}</p>
            <p className={`mt-4 text-3xl font-semibold text-white ${card.color} rounded-3xl px-4 py-5 inline-block`}>
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Recent tasks</h2>
              <p className="text-sm text-slate-500">Quick access to your latest work items.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-40 animate-pulse rounded-3xl bg-slate-100" />
              ))
            ) : tasks.length ? (
              tasks.map((task: any) => (
                <TaskCard key={task._id} id={task._id} title={task.title} status={task.status} priority={task.priority} dueDate={task.dueDate} tags={task.tags} />
              ))
            ) : (
              <p className="text-slate-500">No tasks available. Create your first task to get started.</p>
            )}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Activity</h2>
          <ul className="mt-4 space-y-4 text-sm text-slate-600">
            <li className="rounded-3xl border border-slate-200 p-4">No notifications yet — stay productive!</li>
            <li className="rounded-3xl border border-slate-200 p-4">Drag task cards to update status in real time.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;

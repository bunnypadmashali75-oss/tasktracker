import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type TaskCardProps = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate?: string | null;
  tags: string[];
};

const priorityStyles: Record<string, string> = {
  Low: 'bg-emerald-100 text-emerald-800',
  Medium: 'bg-amber-100 text-amber-800',
  High: 'bg-rose-100 text-rose-800',
};

const TaskCard = ({ id, title, status, priority, dueDate, tags }: TaskCardProps) => (
  <motion.article
    whileHover={{ y: -4 }}
    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft"
  >
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[priority]}`}>
        {priority}
      </span>
    </div>
    <p className="mt-3 text-sm text-slate-500">{status}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {tag}
        </span>
      ))}
    </div>
    <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
      <span>{dueDate ? `Due ${new Date(dueDate).toLocaleDateString()}` : 'No due date'}</span>
      <Link to={`/tasks/${id}`} className="text-brand-600 hover:underline">
        View
      </Link>
    </div>
  </motion.article>
);

export default TaskCard;

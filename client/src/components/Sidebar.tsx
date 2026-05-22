import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside className="hidden w-72 shrink-0 rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:block">
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Workspace</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900">Task board</h2>
    </div>
    <nav className="space-y-3">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
            isActive ? 'bg-brand-500 text-white' : 'text-slate-700 hover:bg-white'
          }`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
            isActive ? 'bg-brand-500 text-white' : 'text-slate-700 hover:bg-white'
          }`
        }
      >
        Profile
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-brand-500 px-3 py-2 text-white shadow-soft">TaskApp</div>
          <span className="text-sm text-slate-500">Manage your workflow</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="hidden rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600 lg:inline-flex"
          >
            Toggle Menu
          </button>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2">
            <div className="h-10 w-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
            <button onClick={logout} className="text-sm text-slate-500 hover:text-slate-900">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

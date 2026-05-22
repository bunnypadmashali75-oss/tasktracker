import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
    <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-soft">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you were looking for does not exist or has been moved.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-brand-500 px-6 py-3 text-white hover:bg-brand-600">
        Return home
      </Link>
    </div>
  </div>
);

export default NotFoundPage;

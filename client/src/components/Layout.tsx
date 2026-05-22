import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-8">
      <Sidebar />
      <main className="flex-1 rounded-3xl bg-white p-6 shadow-soft">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;

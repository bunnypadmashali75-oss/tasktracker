import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div className="rounded-3xl bg-white p-8 shadow-soft">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Name</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user.name}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user.email}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

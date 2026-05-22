import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { registerUser } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormValues = z.infer<typeof schema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: RegisterFormValues) => {
    const response = await registerUser({ ...values, role: 'user' });
    setCredentials(response.data.user, response.data.token);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-500">Register to start organizing your tasks.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-slate-700">
            Name
            <input
              type="text"
              {...register('name')}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500"
            />
            {errors.name && <p className="mt-2 text-xs text-rose-500">{errors.name.message}</p>}
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              {...register('email')}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500"
            />
            {errors.email && <p className="mt-2 text-xs text-rose-500">{errors.email.message}</p>}
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              {...register('password')}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500"
            />
            {errors.password && <p className="mt-2 text-xs text-rose-500">{errors.password.message}</p>}
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-3xl bg-brand-500 px-5 py-3 text-white transition hover:bg-brand-600 disabled:opacity-70"
          >
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

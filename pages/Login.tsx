import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useApp } from '../store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useApp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 🔹 جلب الطالب من جدول students حسب الإيميل
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('email', email)
        .single(); // يرجع عنصر واحد فقط

      if (error || !data) {
        setError('Email not found. Please register first.');
        return;
      }

      // 🔹 تحقق من كلمة السر (هنا plain text مثل الـ Register)
      if (data.password !== password) {
        setError('Incorrect password. Try again.');
        return;
      }

      // 🔹 تسجيل الدخول بنجاح
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        grade: data.grade,
        role: data.role
      });

      // 🔹 التوجيه حسب الدور
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/videos');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="pt-32 pb-20 flex justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8 sm:p-10 space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400">Sign in to continue your learning journey.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <button type="button" className="text-xs text-blue-600 font-bold hover:underline">Forgot?</button>
            </div>
            <input
              type="password"
              required
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg">
            Login Now
          </button>
        </form>

        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            New student? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

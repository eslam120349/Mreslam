import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', grade: '12' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ إضافة الطالب في جدول "students"
      const { data, error } = await supabase.from('students').insert([
        {
          name: formData.name,
          email: formData.email,
          password: formData.password, // لو هتخزنها plain text – لاحقاً ممكن تستخدم hashing
          grade: formData.grade,
          role: 'student',
        }
      ]).select();

      if (error) throw error;

      // تسجيل دخول أو توجيه للداشبورد
      navigate('/dashboard');
    } catch (err) {
      console.error('Error registering student:', err);
      alert('حدث خطأ أثناء التسجيل! حاول مرة أخرى.');
    }

    setLoading(false);
  };

  return (
    <div className="pt-32 pb-20 flex justify-center px-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8 sm:p-10 space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Start Your Success</h1>
          <p className="text-slate-500 dark:text-slate-400">Join Mr. Eslam's class and master math.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                required
                type="text"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Grade Level</label>
              <select
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all"
                value={formData.grade}
                onChange={e => setFormData({...formData, grade: e.target.value})}
              >
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              required
              type="email"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
            <input
              required
              type="password"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="flex items-start space-x-3">
            <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
            <span className="text-xs text-slate-500">I agree to the Terms of Service and Privacy Policy.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'جارٍ التسجيل...' : 'Create Free Account'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

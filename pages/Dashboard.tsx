import React, { useState, useEffect } from 'react';
import { useApp } from '../store';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';

const Dashboard: React.FC = () => {
  const { user } = useApp();
  const [videos, setVideos] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  if (!user || user.role !== 'student') {
    return <Navigate to="/login" />;
  }

  // Fetch videos and questions from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: vids, error: vError } = await supabase.from('videos').select('*');
      if (!vError) setVideos(vids || []);

      const { data: qs, error: qError } = await supabase.from('questions').select('*');
      if (!qError) setQuestions(qs || []);
    };
    fetchData();
  }, []);

  // Filter by student grade
  const studentVideos = videos.filter(v => v.grade === user.grade);
  const studentQuestions = questions.filter(q => q.grade_id === parseInt(user.grade));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          You are currently in <span className="font-bold text-blue-600">Grade {user.grade}</span>. Ready to master math today?
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <span className="text-4xl mb-4 block">📺</span>
            <h3 className="text-2xl font-bold dark:text-white mb-1">{studentVideos.length}</h3>
            <p className="text-slate-500 text-sm">Videos for your grade</p>
          </div>
          <Link to="/videos" className="mt-6 text-blue-600 font-bold text-sm hover:underline">Go to Library →</Link>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <span className="text-4xl mb-4 block">📝</span>
            <h3 className="text-2xl font-bold dark:text-white mb-1">{studentQuestions.length}</h3>
            <p className="text-slate-500 text-sm">Practice Questions</p>
          </div>
          <Link to="/questions" className="mt-6 text-blue-600 font-bold text-sm hover:underline">Practice Now →</Link>
        </div>

        <div className="bg-blue-600 p-8 rounded-3xl shadow-lg text-white flex flex-col justify-between">
          <div>
            <span className="text-4xl mb-4 block">🏆</span>
            <h3 className="text-2xl font-bold mb-1">Keep it up!</h3>
            <p className="text-blue-100 text-sm">You have completed 0% of your current module.</p>
          </div>
          <button className="mt-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">Resume Learning</button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold dark:text-white mb-8">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studentVideos.slice(0, 2).map(video => (
            <div key={video.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow border border-slate-100 dark:border-slate-700 flex">
              <img src={video.thumbnail} alt="" className="w-40 h-full object-cover" />
              <div className="p-6">
                <h4 className="font-bold dark:text-white mb-2">{video.title}</h4>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{video.description}</p>
                <Link to="/videos" className="text-blue-600 text-xs font-bold hover:underline">Watch Now</Link>
              </div>
            </div>
          ))}
          {studentVideos.length === 0 && (
            <div className="col-span-2 py-12 text-center bg-slate-100 dark:bg-slate-800 rounded-3xl">
              <p className="text-slate-500">No content available for Grade {user.grade} yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { Video } from '../types';

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filter, setFilter] = useState('All');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [categories, setCategories] = useState<string[]>([]);

  // ===== جلب الفيديوهات من Supabase =====
  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.from('videos').select('*');
      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        setVideos(data);
        if (data.length > 0) setActiveVideo(data[0]);

        // استخراج كل الفئات (categories) من الفيديوهات
        const uniqueCategories = Array.from(new Set(data.map(v => v.category)));
        setCategories(uniqueCategories);
      }
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const filteredVideos = filter === 'All'
    ? videos
    : videos.filter(v => v.category === filter);

  useEffect(() => {
    if (filteredVideos.length > 0 && !activeVideo) {
      setActiveVideo(filteredVideos[0]);
    } else if (filteredVideos.length > 0 && activeVideo && !filteredVideos.find(v => v.id === activeVideo.id)) {
        setActiveVideo(filteredVideos[0]);
    }
  }, [filter, filteredVideos, activeVideo]);

  const handleCopyLink = () => {
    const videoUrl = `${window.location.origin}/#/videos?id=${activeVideo?.id}`;
    navigator.clipboard.writeText(videoUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this math lesson: ${activeVideo?.title}`)}&url=${encodeURIComponent(window.location.href)}`
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this math lesson by Mr. Eslam: ${activeVideo?.title} ${window.location.href}`)}`
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Share Modal */}
      {isShareOpen && activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-700 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black dark:text-white">Share Lesson</h3>
              <button onClick={() => setIsShareOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                ✖
              </button>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input 
                  readOnly 
                  value={`${window.location.origin}/#/videos?id=${activeVideo.id}`}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 pr-24 rounded-2xl text-xs text-slate-500 font-mono outline-none"
                />
                <button 
                  onClick={handleCopyLink}
                  className={`absolute right-2 top-2 bottom-2 px-4 rounded-xl text-xs font-bold transition-all ${copySuccess ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {shareOptions.map(option => (
                  <a 
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 transition-all group"
                  >
                    <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{option.icon}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{option.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            Learning Library
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Interactive math lessons led by Mr. Eslam.
          </p>
        </div>
        
        <div className="flex flex-wrap space-x-2 bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setFilter('All')}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'All' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Player */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
          ) : activeVideo ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="relative aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${activeVideo.url}?autoplay=0&rel=0&modestbranding=1&showinfo=0`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 rounded-lg text-[10px] font-black bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      {activeVideo.category} • CORE LESSON
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {activeVideo.title}
                    </h2>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => setIsShareOpen(true)} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 hover:text-blue-600 transition-colors">
                      Share
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex flex-col items-center justify-center text-slate-400">
               <p className="font-bold">Select a video to start learning</p>
            </div>
          )}
        </div>

        {/* Playlist */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xl font-bold dark:text-white flex items-center">
            <span className="mr-2">📁</span>
            {filter === 'All' ? 'Full Course Content' : `${filter} Lessons`}
          </h3>

          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredVideos.map(video => (
              <button
                key={video.id}
                onClick={() => {
                  setActiveVideo(video);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full group text-left bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                  activeVideo?.id === video.id 
                    ? 'border-blue-600 shadow-md ring-2 ring-blue-500/10' 
                    : 'border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm'
                }`}
              >
                <div className="relative w-32 aspect-video shrink-0 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900">
                  <img src={video.thumbnail || ''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={video.title} />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h4 className={`text-sm font-bold line-clamp-2 leading-tight ${activeVideo?.id === video.id ? 'text-blue-600 dark:text-blue-400' : 'dark:text-white'}`}>
                    {video.title}
                  </h4>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{video.category}</span>
                  </div>
                </div>
              </button>
            ))}
            {filteredVideos.length === 0 && (
              <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 font-bold">No lessons found in this section.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;

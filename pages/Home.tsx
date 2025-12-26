import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

const Home: React.FC = () => {
  // ===== Achievements =====
  const achievements = [
    { label: "Years Experience", value: "10+", icon: "🎓" },
    { label: "Students Taught", value: "5,000+", icon: "👨‍🎓" },
    { label: "Course Hours", value: "1,200+", icon: "⏱️" },
    { label: "Top Results", value: "98%", icon: "📈" },
  ];

  // ===== Skill Interface & State =====
  interface Skill {
    idx?: number;
    id: string;
    name: string;
    level?: number;
  }
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  // ===== Testimonial Interface & State =====
  interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
  }
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  // ===== Fetch Skills =====
  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from("skills").select("*");
      if (error) console.error("Error fetching skills:", error);
      else setSkills(data);
      setLoadingSkills(false);
    };
    fetchSkills();
  }, []);

  // ===== Fetch Testimonials =====
  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase.from("testimonials").select("*");
      if (error) console.error("Error fetching testimonials:", error);
      else setTestimonials(data);
      setLoadingTestimonials(false);
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* ===== Hero Section ===== */}
      <section className="relative min-h-screen flex items-center pt-20 pb-[25vh] isolate bg-white dark:bg-slate-950">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none -z-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          {/* Text */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
            <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold tracking-wide">
              WELCOME TO EXCELLENCE
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1]">
              Master Mathematics <br />
              <span className="text-blue-600">With Mr. Eslam</span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Making math simple, clear, and engaging. Whether it's Calculus, Algebra, or Geometry, we transform challenges into achievements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/videos"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 hover:scale-105 flex items-center justify-center"
              >
                Watch Videos
              </Link>

              <Link
                to="/register"
                className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg flex items-center justify-center"
              >
                Register Now
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
              <img
                src="https://res.cloudinary.com/dc9jmzfbk/image/upload/v1747405499/dmpyszmxdjweqyhglmx1.png"
                alt="Mr. Eslam"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -right-6 w-48 h-48 bg-blue-600 rounded-2xl -z-10 animate-bounce-slow" />
          </div>
        </div>
      </section>

      {/* ===== Achievements ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
            >
              <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{item.value}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section className="bg-slate-100 dark:bg-slate-950/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold dark:text-white">Expertise & Skills</h2>
            <p className="text-slate-600 dark:text-slate-400">What makes our learning environment different.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loadingSkills ? (
              <p className="text-center text-gray-500 dark:text-gray-400">Loading skills...</p>
            ) : (
              skills.map((skill: Skill) => (
                <div
                  key={skill.id}
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700
                             transform transition duration-300 ease-out
                             hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/40"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold dark:text-white">{skill.name}</h4>
                    <span className="text-blue-600 font-bold">{skill.level ?? 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${skill.level ?? 0}%` }}></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold dark:text-white">What Students Say</h2>
          <p className="text-slate-600 dark:text-slate-400">Success stories from our dedicated learners.</p>
        </div>

        {loadingTestimonials ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading testimonials...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg relative
                           transform transition duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="text-4xl text-blue-200 dark:text-blue-900/40 absolute top-4 right-8">"</div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic mb-6 leading-relaxed">
                  "{review.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold dark:text-white">{review.name}</h5>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== Activities ===== */}
      <section className="bg-blue-600 py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Interactive Activities</h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Learning doesn't stop at the whiteboard. We host weekly competitions, specialized workshops, and group problem-solving sessions to keep you engaged.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <span className="bg-blue-500 p-1 rounded-full">✓</span>
                  <span>Weekly Math Olympiads</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="bg-blue-500 p-1 rounded-full">✓</span>
                  <span>Live Q&A Webinars</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="bg-blue-500 p-1 rounded-full">✓</span>
                  <span>Gamified Problem Solving</span>
                </li>
              </ul>
              <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                View Full Calendar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/act1/300/300" className="rounded-2xl shadow-lg" alt="Activity 1" />
              <img src="https://picsum.photos/seed/act2/300/300" className="rounded-2xl shadow-lg translate-y-8" alt="Activity 2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

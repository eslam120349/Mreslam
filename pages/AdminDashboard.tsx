import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const AdminDashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [videos, setVideos] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  const [newQ, setNewQ] = useState({
    text: "",
    options: ["", "", "", ""],
    correct: "",
    explanation: "",
    grade: "12",
  });

  useEffect(() => {
    const loadData = async () => {
      const { data: v } = await supabase.from("videos").select("*");
      const { data: q } = await supabase.from("questions").select("*");
      const { data: s } = await supabase.from("students").select("*");

      setVideos(v || []);
      setQuestions(q || []);
      setStudents(s || []);
    };
    loadData();
  }, []);

  if (!user || user.role !== "admin") return <Navigate to="/login" />;

  // ================= ADD QUESTION =================
  const addQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data } = await supabase.from("questions").insert([
      {
        question_text: newQ.text,
        option_a: newQ.options[0],
        option_b: newQ.options[1],
        option_c: newQ.options[2],
        option_d: newQ.options[3],
        correct_answer: newQ.correct,
        explanation: newQ.explanation,
        grade: newQ.grade,
      },
    ]);

    if (data) {
      setQuestions(prev => [...prev, data[0]]);
      setNewQ({ text: "", options: ["", "", "", ""], correct: "", explanation: "", grade: "12" });
    }
  };

    // ================= Delete Question =================

    const deleteQuestion = async (id: number) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this question?");
  if (!confirmDelete) return;

  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id);

  if (!error) {
    setQuestions(prev => prev.filter(q => q.id !== id));
  } else {
    console.error("Error deleting question:", error);
  }
};

  // ================= DASHBOARD STATS =================
  const stats = [
    { name: "Students", value: students.length },
    { name: "Questions", value: questions.length },
    { name: "Videos", value: videos.length },
  ];

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">

      {/* ====== TABS ====== */}
      <div className="flex gap-4 mb-8">
        {["dashboard", "questions", "videos", "students"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= DASHBOARD ================= */}
      {activeTab === "dashboard" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl shadow">
            <h3 className="text-xl font-bold mb-4">Platform Statistics</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map(s => (
              <div key={s.name} className="bg-white p-6 rounded-2xl shadow text-center">
                <h3 className="text-xl font-bold">{s.value}</h3>
                <p className="text-gray-500">{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= QUESTIONS ================= */}
      {activeTab === "questions" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

<form onSubmit={addQuestion} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 space-y-4">
  <h2 className="font-bold text-lg text-slate-900 dark:text-white">Add Question</h2>

  <textarea
    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
    placeholder="Question"
    value={newQ.text}
    onChange={e => setNewQ({ ...newQ, text: e.target.value })}
  />

  {newQ.options.map((o, i) => (
    <input
      key={i}
      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
      placeholder={`Option ${i + 1}`}
      value={o}
      onChange={e => {
        const arr = [...newQ.options];
        arr[i] = e.target.value;
        setNewQ({ ...newQ, options: arr });
      }}
    />
  ))}
<select
  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
  value={newQ.correct}
  onChange={e => setNewQ({ ...newQ, correct: e.target.value })}
>
  <option value="" disabled>Select Correct Answer</option>
  {newQ.options.map((opt, i) => (
    <option key={i} value={opt}>
      {['A','B','C','D'][i]}. {opt}
    </option>
  ))}
</select>


  <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
    Add Question
  </button>
</form>


         <div className="space-y-8">
  {questions.map((q) => (
    <div
      key={q.id}
      className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 leading-relaxed">
        {q.question_text}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[q.option_a, q.option_b, q.option_c, q.option_d].map((opt, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
          >
            <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][i]}.</span>
            {opt}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-bold">
          Correct Answer: {q.correct_answer}
        </span>

        <button
          onClick={() => deleteQuestion(q.id)}
          className="text-red-600 font-semibold hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

        </div>
      )}

      {/* ================= VIDEOS ================= */}
      {activeTab === "videos" && (
        
<div className="grid md:grid-cols-3 gap-6">
  {videos.map(v => (
    <div
      key={v.id}
      className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden"
    >
      <div className="relative w-full h-64">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={v.url} // هنا اللينك من الداتا بيز
          title={v.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="p-6 space-y-2">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{v.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">{v.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500 dark:text-slate-400">Grade: {v.grade}</span>
          <button
            onClick={async () => {
              const confirmDelete = window.confirm(`Delete video "${v.title}"?`);
              if (!confirmDelete) return;

              const { error } = await supabase.from('videos').delete().eq('id', v.id);
              if (!error) {
                setVideos(prev => prev.filter(video => video.id !== v.id));
              } else {
                console.error("Error deleting video:", error);
              }
            }}
            className="text-red-600 font-semibold hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


      )}

      {/* ================= STUDENTS ================= */}
      {activeTab === "students" && (
<div className="overflow-x-auto">
  <table className="min-w-full bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
    <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
      <tr>
        <th className="p-4 text-left text-sm font-bold text-slate-500 dark:text-slate-400">Student Name</th>
        <th className="p-4 text-left text-sm font-bold text-slate-500 dark:text-slate-400">Email</th>
        <th className="p-4 text-left text-sm font-bold text-slate-500 dark:text-slate-400 text-center">Grade</th>
        <th className="p-4 text-left text-sm font-bold text-slate-500 dark:text-slate-400 text-center">Role</th>
        <th className="p-4 text-right text-sm font-bold text-slate-500 dark:text-slate-400">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
      {students.map(student => (
        <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
          <td className="p-4">{student.name}</td>
          <td className="p-4 text-slate-500 dark:text-slate-300">{student.email}</td>
          <td className="p-4 text-center">{student.grade}</td>
          <td className="p-4 text-center font-semibold">
            {student.role === 'admin' ? 'Admin' : 'Student'}
          </td>
          <td className="p-4 text-right">
            <button
              onClick={() => {
                const confirmDelete = window.confirm(`Are you sure you want to delete ${student.name}?`);
                if (!confirmDelete) return;
                supabase.from('students').delete().eq('id', student.id)
                  .then(() => setStudents(prev => prev.filter(s => s.id !== student.id)))
                  .catch(err => console.error("Error deleting student:", err));
              }}
              className="text-red-600 font-semibold hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      )}
    </div>
  );
};

export default AdminDashboard;

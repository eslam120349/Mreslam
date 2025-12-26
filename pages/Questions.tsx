import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface Question {
  id: string | number;
  text: string;
  options: string[];
  correctAnswer: string;
  grade: string;
}

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<
    Record<string, { selected?: string; revealed: boolean }>
  >({});
  const [gradeFilter, setGradeFilter] = useState<string>('all');

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase.from('questions').select('*');
      if (error) {
        console.error(error);
        return;
      }

      const formatted: Question[] = (data || []).map((q: any) => {
        const options = [q.option_a, q.option_b, q.option_c, q.option_d];

        // تحويل الإجابة الصحيحة من A/B/C/D إلى نص الخيار
        let correctText = '';
        switch (q.correct_answer) {
          case 'A':
            correctText = q.option_a;
            break;
          case 'B':
            correctText = q.option_b;
            break;
          case 'C':
            correctText = q.option_c;
            break;
          case 'D':
            correctText = q.option_d;
            break;
          default:
            correctText = '';
        }

        return {
          id: q.id,
          text: q.question_text,
          options,
          correctAnswer: correctText,
          grade: String(q.grade_id),
        };
      });

      setQuestions(formatted);

      // تهيئة حالة الإجابات
      const init: Record<string, { selected?: string; revealed: boolean }> = {};
      formatted.forEach(q => {
        init[String(q.id)] = { selected: undefined, revealed: false };
      });
      setAnswers(init);
    };

    fetchQuestions();
  }, []);

  const handleSelect = (qId: string | number, option: string) => {
    setAnswers(prev => ({
      ...prev,
      [String(qId)]: {
        ...prev[String(qId)],
        selected: option,
      },
    }));
  };

  const toggleReveal = (qId: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [String(qId)]: {
        ...prev[String(qId)],
        revealed: !prev[String(qId)]?.revealed,
      },
    }));
  };

  const filteredQuestions =
    gradeFilter === 'all'
      ? questions
      : questions.filter(q => q.grade === gradeFilter);

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          Practice Questions
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Test your knowledge with these targeted questions.
        </p>
      </div>

      {/* Grade Filter */}
      <div className="mb-8 flex items-center gap-4">
        <label className="font-bold dark:text-white">Filter by Grade:</label>
        <select
          className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700"
          value={gradeFilter}
          onChange={e => setGradeFilter(e.target.value)}
        >
          <option value="all">All Grades</option>
          {[3,4,5,6,7,8,9,10,11,12].map(g => (
            <option key={g} value={g}>{`Grade ${g}`}</option>
          ))}
        </select>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {filteredQuestions.map(q => {
          const key = String(q.id);
          const ans = answers[key] || {};

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-lg text-xs font-bold">
                  GRADE {q.grade}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 leading-relaxed">
                {q.text}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {q.options.map((opt, i) => {
                  const isSelected = ans.selected === opt;
                  const isCorrect = opt === q.correctAnswer;
                  const showResult = ans.revealed;

                  return (
                    <button
                      key={`${q.id}-${i}`}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`p-4 text-left rounded-2xl border-2 transition-all
                        ${
                          showResult && isCorrect
                            ? 'border-green-600 bg-green-100 text-green-700'
                            : showResult && isSelected && !isCorrect
                            ? 'border-red-600 bg-red-100 text-red-700'
                            : isSelected
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 dark:text-slate-300'
                        }
                      `}
                    >
                      <span className="font-bold mr-3">
                        {['A', 'B', 'C', 'D'][i]}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => toggleReveal(q.id)}
                  className="w-full sm:w-auto px-6 py-2 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                >
                  {ans.revealed ? 'Hide Answer' : 'Show Correct Answer'}
                </button>

                {ans.selected && (
                  <div
                    className={`px-4 py-2 rounded-lg font-bold ${
                      ans.selected === q.correctAnswer
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {ans.selected === q.correctAnswer
                      ? 'Correct! Well done.'
                      : 'Wrong answer, try again.'}
                  </div>
                )}
              </div>

              {ans.revealed && (
                <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border-l-4 border-blue-600">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">
                    Correct Answer
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {q.correctAnswer}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            No questions available for this grade.
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;

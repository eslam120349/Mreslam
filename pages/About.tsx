
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white dark:border-slate-800">
               <img src="https://res.cloudinary.com/dc9jmzfbk/image/upload/v1747405499/dmpyszmxdjweqyhglmx1.png" alt="Mr. Eslam Profile" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600 rounded-full blur-[80px] -z-10 opacity-30"></div>
             <div className="absolute top-10 -right-10 w-48 h-48 border-4 border-blue-400 rounded-3xl -z-10"></div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">
                Hello, I'm <span className="text-blue-600">Mr. Eslam</span>
              </h1>
              <h3 className="text-2xl font-bold text-slate-600 dark:text-slate-400">Professional Math Educator</h3>
            </div>

            <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                With over a decade of experience in the Egyptian educational system, I have dedicated my career to making the "difficult" language of Mathematics accessible to everyone. My philosophy is simple: Math is not about numbers and formulas; it's about logic, beauty, and problem-solving.
              </p>
              <p>
                I believe every student has the potential to excel if given the right tools and explanations. My teaching style focuses on deep conceptual understanding rather than rote memorization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                 <h4 className="font-bold dark:text-white mb-2">Education</h4>
                 <p className="text-sm text-slate-500">B.Sc. in Mathematics, Faculty of Education</p>
              </div>
              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                 <h4 className="font-bold dark:text-white mb-2">Experience</h4>
                 <p className="text-sm text-slate-500">10+ Years in leading Egyptian schools and centers</p>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="font-bold dark:text-white mb-6">My Professional Journey</h4>
              <div className="space-y-6">
                 {[
                   { year: '2014 - 2017', title: 'Senior Math Teacher', company: 'Academic Excellence High School' },
                 ].map((item, idx) => (
                   <div key={idx} className="flex space-x-4">
                      <div className="w-1 bg-blue-600 rounded-full"></div>
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase">{item.year}</span>
                        <h5 className="font-bold dark:text-white">{item.title}</h5>
                        <p className="text-sm text-slate-500">{item.company}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Get In Touch</h1>
        <p className="text-slate-600 dark:text-slate-400">Have a question or want to join a course? We are here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="text-2xl">📍</span>
                <div>
                  <h4 className="font-bold">Our Location</h4>
                  <p className="text-blue-100 text-sm">El Mokattam, Cairo, Egypt</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-2xl">📱</span>
                <div>
                  <h4 className="font-bold">WhatsApp</h4>
                  <a
    href="https://wa.me/201095682795"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-100 text-sm hover:underline"
  >
    +20 109 568 2795
  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-2xl">📧</span>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                    <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=e.faras12@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-100 text-sm hover:underline"
  >
    e.faras12@gmail.com
  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-blue-500/50">
              <h4 className="font-bold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                 <div className="flex space-x-4">
  {/* Facebook */}
  <a
    href="https://www.facebook.com/share/19sr29G34W/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
    title="Facebook"
  >
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12a10 10 0 10-11.5 9.95v-7.05h-2.1v-2.9h2.1V9.35c0-2.1 1.25-3.3 3.16-3.3.91 0 1.86.16 1.86.16v2.05h-1.05c-1.03 0-1.35.64-1.35 1.3v1.57h2.3l-.37 2.9h-1.93v7.05A10 10 0 0022 12z"/>
    </svg>
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/channel/UCZmQMG4vx3xncQogurpyCDw"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
    title="YouTube"
  >
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.6 3H4.4C3.1 3 2 4.1 2 5.4v13.2C2 19.9 3.1 21 4.4 21h15.2c1.3 0 2.4-1.1 2.4-2.4V5.4C22 4.1 20.9 3 19.6 3zm-9 14V7l6 5-6 5z"/>
    </svg>
  </a>

  {/* TikTok */}
  <a
    href="https://www.tiktok.com/@mreslam120?is_from_webapp=1&sender_device=pc"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
    title="TikTok"
  >
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.04a9.96 9.96 0 0 0-9.95 9.95c0 5.5 4.45 9.95 9.95 9.95a9.96 9.96 0 0 0 9.95-9.95V9.04h-3.97v5.88a3.96 3.96 0 1 1-3.97-3.96h3.97V2.04h-5z"/>
    </svg>
  </a>
</div>

              </div>
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-3xl">
            <h4 className="font-bold dark:text-white mb-4">Working Hours</h4>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p className="flex justify-between"><span>Mon - Thu:</span> <span>09:00 AM - 08:00 PM</span></p>
              <p className="flex justify-between"><span>Fri:</span> <span>Closed</span></p>
              <p className="flex justify-between"><span>Sat - Sun:</span> <span>10:00 AM - 06:00 PM</span></p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
            {submitted ? (
              <div className="text-center py-20 animate-in zoom-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                <h3 className="text-2xl font-bold dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-500">Mr. Eslam will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all"
                      placeholder="E.g. Ahmed Ali"
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all"
                      placeholder="you@example.com"
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">How can I help you?</label>
                  <textarea
                    required
                    rows={6}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all resize-none"
                    placeholder="Tell me about your learning goals or questions..."
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

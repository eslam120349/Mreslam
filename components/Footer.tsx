
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <span className="font-bold text-xl uppercase">ME</span>
              </div>
              <span className="text-xl font-bold dark:text-white">Mr. Eslam</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Empowering students through the beauty of Mathematics. Making complex concepts simple, one lesson at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/videos" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Video Lessons</Link></li>
              <li><Link to="/questions" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Practice Quiz</Link></li>
              <li><Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">About Mr. Eslam</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm">
              <li className="flex items-center space-x-3">
                <span>📧 <a href="https://mail.google.com/mail/?view=cm&fs=1&to=e.faras12@gmail.com"> e.faras12@gmail.com
  </a></span>
              </li>
              <li className="flex items-center space-x-3">
                <span>📞 <a href="https://wa.me/201095682795">
    +20 109 568 2795
  </a></span>
              </li>
              <li className="flex items-center space-x-3">
                <span>📍 Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-500 text-sm">
          <p>© 2026 Mr. Eslam Math. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/share/19sr29G34W/" className="hover:text-blue-600 transition-colors">Facebook</a>
            <a href="https://www.youtube.com/channel/UCZmQMG4vx3xncQogurpyCDw" className="hover:text-blue-600 transition-colors">YouTube</a>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

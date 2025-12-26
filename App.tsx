
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Questions from './pages/Questions';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { setSEO } from './utils/seo';

const RouteSEO: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const metaMap: Record<string, { title: string; description: string; image?: string }> = {
      '/': {
        title: 'Mr. Eslam - Math Teacher',
        description:
          'Modern, responsive educational platform by Mr. Eslam. Video lessons, practice questions, registration, and dashboard.',
        image:
          'https://res.cloudinary.com/dc9jmzfbk/image/upload/v1747405499/dmpyszmxdjweqyhglmx1.png',
      },
      '/videos': {
        title: 'Video Lessons | Mr. Eslam',
        description: 'Watch curated math video lessons to master key concepts.',
      },
      '/questions': {
        title: 'Practice Questions | Mr. Eslam',
        description: 'Solve practice questions and improve your math skills.',
      },
      '/about': {
        title: 'About Mr. Eslam',
        description: 'Learn more about Mr. Eslam, professional math educator.',
      },
      '/contact': {
        title: 'Contact | Mr. Eslam',
        description: 'Get in touch for lessons, support, and inquiries.',
      },
      '/login': {
        title: 'Login | Mr. Eslam',
        description: 'Access your account to continue learning.',
      },
      '/register': {
        title: 'Register | Mr. Eslam',
        description: 'Create your account to join the platform.',
      },
      '/dashboard': {
        title: 'Dashboard | Mr. Eslam',
        description: 'Manage your learning progress and content.',
      },
    };
    const meta = metaMap[location.pathname] || metaMap['/'];
    setSEO({
      title: meta.title,
      description: meta.description,
      path: location.pathname,
      image: meta.image,
    });
  }, [location.pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <RouteSEO />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-blue-950">
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl font-bold text-white">World Cup Qatar 2022</h1>
            </div>
            <nav className="flex gap-6">
              <Link
                to="/"
                className={`text-white hover:text-yellow-400 transition-colors ${
                  location.pathname === '/' ? 'text-yellow-400' : ''
                }`}
              >
                Matches
              </Link>
              <Link
                to="/countries"
                className={`text-white hover:text-yellow-400 transition-colors ${
                  location.pathname === '/countries' ? 'text-yellow-400' : ''
                }`}
              >
                Countries
              </Link>
              <Link
                to="/top-scorers"
                className={`text-white hover:text-yellow-400 transition-colors ${
                  location.pathname === '/top-scorers' ? 'text-yellow-400' : ''
                }`}
              >
                Top Scorers
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
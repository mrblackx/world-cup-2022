import React, { useState } from 'react';
import { Search, Trophy, Users, Goal, Calendar } from 'lucide-react';

const Matches: React.FC<{ matches: any[] }> = ({ matches }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMatches = matches.filter(match => {
    const matchesSearch = 
      match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || match.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(matches.map(m => m.category))];

  return (
    <>
      <div className="flex items-center justify-end gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Stages' : category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.map((match, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">
                <Calendar className="w-4 h-4 inline mr-2" />
                {match.date}
              </span>
              <span className="text-sm font-medium text-blue-400">{match.category}</span>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-white mb-2">{match.team1}</div>
                <div className="text-sm text-gray-400">{match.possession1} possession</div>
              </div>
              
              <div className="px-6">
                <div className="text-2xl font-bold text-white">
                  {match.score1} - {match.score2}
                </div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-white mb-2">{match.team2}</div>
                <div className="text-sm text-gray-400">{match.possession2} possession</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>Match #{index + 1}</span>
              </div>
              <div className="flex items-center">
                <Goal className="w-4 h-4 mr-1" />
                <span>Total Goals: {match.score1 + match.score2}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Matches;
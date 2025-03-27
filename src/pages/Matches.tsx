import React, { useState } from 'react';
import { Search, Trophy, Users, Goal, Calendar } from 'lucide-react';

interface Match {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  date: string;
  category: string;
  possession1: string;
  possession2: string;
}

const TOURNAMENT_STAGES = {
  'Group A': 'Group Stage',
  'Group B': 'Group Stage',
  'Group C': 'Group Stage',
  'Group D': 'Group Stage',
  'Group E': 'Group Stage',
  'Group F': 'Group Stage',
  'Group G': 'Group Stage',
  'Group H': 'Group Stage',
  'Round of 16': 'Round of 16',
  'Quarter-final': 'Quarter-finals',
  'Semi-final': 'Semi-finals',
  'Play-off for third place': 'Third Place Play-off',
  'Final': 'Final'
};

const Matches: React.FC<{ matches: Match[] }> = ({ matches }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMatches = matches.filter(match => {
    const matchesSearch = 
      match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = false;
    
    if (selectedCategory === 'all') {
      matchesCategory = true;
    } else if (selectedCategory === 'Group Stage') {
      matchesCategory = match.category.startsWith('Group');
    } else if (selectedCategory === 'Quarter-finals') {
      matchesCategory = match.category === 'Quarter-final';
    } else if (selectedCategory === 'Semi-finals') {
      matchesCategory = match.category === 'Semi-final';
    } else if (selectedCategory === 'Third Place Play-off') {
      matchesCategory = match.category === 'Play-off for third place';
    } else {
      matchesCategory = match.category === selectedCategory;
    }

    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Group Stage', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Third Place Play-off', 'Final'];

  return (
    <>
      <div className="flex items-center justify-end gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1.5em_1.5em] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23ffffff%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M10%203a1%201%200%2001.707.293l3%203a1%201%200%2001-1.414%201.414L10%205.414%207.707%207.707a1%201%200%2001-1.414-1.414l3-3A1%201%200%0110%203zm-3.707%209.293a1%201%200%20011.414%200L10%2014.586l2.293-2.293a1%201%200%20011.414%201.414l-3%203a1%201%200%2001-1.414%200l-3-3a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] hover:bg-white/20 transition-colors duration-200"
        >
          {categories.map(category => (
            <option key={category} value={category} className="bg-gray-900 text-white">
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
              <span className="text-sm font-medium text-blue-400">
                {TOURNAMENT_STAGES[match.category as keyof typeof TOURNAMENT_STAGES] || match.category}
              </span>
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
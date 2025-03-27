import React, { useState } from 'react';
import { Medal, Goal, Search } from 'lucide-react';

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

interface TeamGoals {
  team: string;
  goals: number;
}

const TopScorers: React.FC<{ matches: Match[] }> = ({ matches }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const calculateTeamGoals = (): TeamGoals[] => {
    const goals: { [key: string]: number } = {};

    matches.forEach(match => {
      goals[match.team1] = (goals[match.team1] || 0) + match.score1;
      goals[match.team2] = (goals[match.team2] || 0) + match.score2;
    });

    return Object.entries(goals)
      .map(([team, goals]) => ({ team, goals }))
      .sort((a, b) => b.goals - a.goals);
  };

  const teamGoals = calculateTeamGoals();
  
  const filteredTeamGoals = teamGoals.filter(team => 
    team.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="relative w-full md:w-64 mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-4">
        {filteredTeamGoals.map((team, index) => (
          <div
            key={team.team}
            className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {index < 3 && (
                  <Medal className={`w-6 h-6 ${
                    index === 0 ? 'text-yellow-400' :
                    index === 1 ? 'text-gray-400' :
                    'text-amber-700'
                  }`} />
                )}
                <h2 className="text-xl font-bold text-white">{team.team}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Goal className="w-5 h-5 text-blue-400" />
                <span className="text-2xl font-bold text-white">{team.goals}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopScorers;
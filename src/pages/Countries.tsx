import React, { useState } from 'react';
import { Flag, Users, Search, ArrowUpDown } from 'lucide-react';

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

interface CountryStats {
  name: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

type SortField = keyof CountryStats;
type SortOrder = 'asc' | 'desc';

const Countries: React.FC<{ matches: Match[] }> = ({ matches }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('wins');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const calculateCountryStats = (): CountryStats[] => {
    const stats: { [key: string]: CountryStats } = {};

    matches.forEach(match => {
      // Process team 1
      if (!stats[match.team1]) {
        stats[match.team1] = {
          name: match.team1,
          matches: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0
        };
      }
      stats[match.team1].matches++;
      stats[match.team1].goalsFor += match.score1;
      stats[match.team1].goalsAgainst += match.score2;
      if (match.score1 > match.score2) stats[match.team1].wins++;
      else if (match.score1 === match.score2) stats[match.team1].draws++;
      else stats[match.team1].losses++;

      // Process team 2
      if (!stats[match.team2]) {
        stats[match.team2] = {
          name: match.team2,
          matches: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0
        };
      }
      stats[match.team2].matches++;
      stats[match.team2].goalsFor += match.score2;
      stats[match.team2].goalsAgainst += match.score1;
      if (match.score2 > match.score1) stats[match.team2].wins++;
      else if (match.score2 === match.score1) stats[match.team2].draws++;
      else stats[match.team2].losses++;
    });

    return Object.values(stats);
  };

  const countryStats = calculateCountryStats();
  
  // Filter and sort the stats
  const filteredAndSortedStats = countryStats
    .filter(country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return a.name.localeCompare(b.name) * multiplier;
      }
      return (a[sortField] - b[sortField]) * multiplier;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort('name')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            Name
            {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('wins')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            Wins
            {sortField === 'wins' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('goalsFor')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            Goals For
            {sortField === 'goalsFor' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('goalsAgainst')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            Goals Against
            {sortField === 'goalsAgainst' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedStats.map((country) => (
          <div
            key={country.name}
            className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <Flag className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">{country.name}</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-300">
                <span>Matches Played:</span>
                <span className="font-semibold">{country.matches}</span>
              </div>
              <div className="flex items-center justify-between text-green-400">
                <span>Wins:</span>
                <span className="font-semibold">{country.wins}</span>
              </div>
              <div className="flex items-center justify-between text-yellow-400">
                <span>Draws:</span>
                <span className="font-semibold">{country.draws}</span>
              </div>
              <div className="flex items-center justify-between text-red-400">
                <span>Losses:</span>
                <span className="font-semibold">{country.losses}</span>
              </div>
              <div className="flex items-center justify-between text-blue-400">
                <span>Goals For:</span>
                <span className="font-semibold">{country.goalsFor}</span>
              </div>
              <div className="flex items-center justify-between text-purple-400">
                <span>Goals Against:</span>
                <span className="font-semibold">{country.goalsAgainst}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
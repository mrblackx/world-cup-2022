import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Matches from './pages/Matches';
import Countries from './pages/Countries';
import TopScorers from './pages/TopScorers';

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

function App() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Parse CSV data and set matches
    const csvData = `team1,team2,possession team1,possession team2,possession in contest,number of goals team1,number of goals team2,date,hour,category
QATAR,ECUADOR,42%,50%,8%,0,2,20 NOV 2022,17 : 00,Group A
ENGLAND,IRAN,72%,19%,9%,6,2,21 NOV 2022,14 : 00,Group B
SENEGAL,NETHERLANDS,44%,45%,11%,0,2,21 NOV 2022,17 : 00,Group A
UNITED STATES,WALES,51%,39%,10%,1,1,21 NOV 2022,20 : 00,Group B
ARGENTINA,SAUDI ARABIA,64%,24%,12%,1,2,22 NOV 2022,11 : 00,Group C
DENMARK,TUNISIA,55%,33%,12%,0,0,22 NOV 2022,14 : 00,Group D
MEXICO,POLAND,54%,31%,15%,0,0,22 NOV 2022,17 : 00,Group C
FRANCE,AUSTRALIA,56%,35%,9%,4,1,22 NOV 2022,20 : 00,Group D
MOROCCO,CROATIA,32%,57%,12%,0,0,23 NOV 2022,11 : 00,Group F
GERMANY,JAPAN,65%,22%,13%,1,2,23 NOV 2022,14 : 00,Group E
SPAIN,COSTA RICA,74%,17%,9%,7,0,23 NOV 2022,17 : 00,Group E
BELGIUM,CANADA,46%,43%,11%,1,0,23 NOV 2022,20 : 00,Group F
SWITZERLAND,CAMEROON,43%,46%,11%,1,0,24 NOV 2022,11 : 00,Group G
URUGUAY,KOREA REPUBLIC,49%,38%,13%,0,0,24 NOV 2022,14 : 00,Group H
PORTUGAL,GHANA,55%,35%,10%,3,2,24 NOV 2022,17 : 00,Group H
BRAZIL,SERBIA,53%,34%,13%,2,0,24 NOV 2022,20 : 00,Group G
WALES,IRAN,51%,33%,16%,0,2,25 NOV 2022,11 : 00,Group B
QATAR,SENEGAL,42%,48%,10%,1,3,25 NOV 2022,14 : 00,Group A
NETHERLANDS,ECUADOR,48%,39%,13%,1,1,25 NOV 2022,17 : 00,Group A
ENGLAND,UNITED STATES,51%,40%,9%,0,0,25 NOV 2022,20 : 00,Group B
TUNISIA,AUSTRALIA,50%,31%,19%,0,1,26 NOV 2022,11 : 00,Group D
POLAND,SAUDI ARABIA,30%,57%,14%,2,0,26 NOV 2022,14 : 00,Group C
FRANCE,DENMARK,44%,44%,12%,2,1,26 NOV 2022,17 : 00,Group D
ARGENTINA,MEXICO,50%,36%,14%,2,0,26 NOV 2022,20 : 00,Group C
JAPAN,COSTA RICA,48%,39%,13%,0,1,27 NOV 2022,11 : 00,Group E
BELGIUM,MOROCCO,56%,32%,12%,0,2,27 NOV 2022,14 : 00,Group F
CROATIA,CANADA,41%,46%,13%,4,1,27 NOV 2022,17 : 00,Group F
SPAIN,GERMANY,56%,33%,11%,1,1,27 NOV 2022,20 : 00,Group E
CAMEROON,SERBIA,38%,49%,13%,3,3,28 NOV 2022,11 : 00,Group G
KOREA REPUBLIC,GHANA,53%,32%,15%,2,3,28 NOV 2022,14 : 00,Group H
BRAZIL,SWITZERLAND,51%,40%,9%,1,0,28 NOV 2022,17 : 00,Group G
PORTUGAL,URUGUAY,53%,35%,12%,2,0,28 NOV 2022,20 : 00,Group H
NETHERLANDS,QATAR,54%,38%,8%,2,0,29 NOV 2022,16 : 00,Group A
ECUADOR,SENEGAL,51%,32%,17%,1,2,29 NOV 2022,16 : 00,Group A
WALES,ENGLAND,33%,58%,10%,0,3,29 NOV 2022,20 : 00,Group B
IRAN,UNITED STATES,42%,45%,13%,0,1,29 NOV 2022,20 : 00,Group B
AUSTRALIA,DENMARK,24%,60%,16%,1,0,30 NOV 2022,16 : 00,Group D
TUNISIA,FRANCE,30%,56%,14%,1,0,30 NOV 2022,16 : 00,Group D
POLAND,ARGENTINA,24%,67%,9%,0,2,30 NOV 2022,20 : 00,Group C
SAUDI ARABIA,MEXICO,29%,55%,17%,1,2,30 NOV 2022,20 : 00,Group C
CROATIA,BELGIUM,43%,47%,10%,0,0,01 DEC 2022,16 : 00,Group F
CANADA,MOROCCO,52%,36%,12%,1,2,01 DEC 2022,16 : 00,Group F
JAPAN,SPAIN,14%,78%,8%,2,1,01 DEC 2022,20 : 00,Group E
COSTA RICA,GERMANY,27%,60%,13%,2,4,01 DEC 2022,20 : 00,Group E
GHANA,URUGUAY,46%,39%,15%,0,2,02 DEC 2022,16 : 00,Group H
KOREA REPUBLIC,PORTUGAL,34%,55%,11%,2,1,02 DEC 2022,16 : 00,Group H
SERBIA,SWITZERLAND,45%,41%,14%,2,3,02 DEC 2022,20 : 00,Group G
CAMEROON,BRAZIL,31%,56%,13%,1,0,02 DEC 2022,20 : 00,Group G
NETHERLANDS,UNITED STATES,33%,54%,13%,3,1,03 DEC 2022,16 : 00,Round of 16
ARGENTINA,AUSTRALIA,53%,35%,12%,2,1,03 DEC 2022,20 : 00,Round of 16
FRANCE,POLAND,48%,42%,10%,3,1,04 DEC 2022,16 : 00,Round of 16
ENGLAND,SENEGAL,54%,35%,11%,3,0,04 DEC 2022,20 : 00,Round of 16
JAPAN,CROATIA,35%,51%,14%,1,1,05 DEC 2022,16 : 00,Round of 16
BRAZIL,KOREA REPUBLIC,47%,44%,9%,4,1,05 DEC 2022,20 : 00,Round of 16
MOROCCO,SPAIN,22%,68%,10%,0,0,06 DEC 2022,16 : 00,Round of 16
PORTUGAL,SWITZERLAND,43%,48%,9%,6,1,06 DEC 2022,20 : 00,Round of 16
CROATIA,BRAZIL,45%,45%,10%,1,1,09 DEC 2022,16 : 00,Quarter-final
NETHERLANDS,ARGENTINA,45%,44%,11%,2,2,09 DEC 2022,20 : 00,Quarter-final
MOROCCO,PORTUGAL,22%,65%,13%,1,0,10 DEC 2022,16 : 00,Quarter-final
ENGLAND,FRANCE,54%,36%,10%,1,2,10 DEC 2022,20 : 00,Quarter-final
ARGENTINA,CROATIA,34%,54%,12%,3,0,13 DEC 2022,20 : 00,Semi-final
FRANCE,MOROCCO,34%,55%,11%,2,0,14 DEC 2022,20 : 00,Semi-final
CROATIA,MOROCCO,45%,45%,10%,2,1,17 DEC 2022,16 : 00,Play-off for third place
ARGENTINA,FRANCE,46%,40%,14%,3,3,18 DEC 2022,16 : 00,Final`;
    
    const parsedMatches = csvData.split('\n').slice(1).map(row => {
      const [team1, team2, possession1, possession2, , goals1, goals2, date, , category] = row.split(',');
      return {
        team1,
        team2,
        score1: parseInt(goals1),
        score2: parseInt(goals2),
        date,
        category,
        possession1,
        possession2
      };
    });

    setMatches(parsedMatches);
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Matches matches={matches} />} />
        <Route path="/countries" element={<Countries matches={matches} />} />
        <Route path="/top-scorers" element={<TopScorers matches={matches} />} />
      </Routes>
    </Layout>
  );
}

export default App;
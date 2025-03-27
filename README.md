# World Cup Qatar 2022 Stats App

A modern web application built with React, TypeScript, and Tailwind CSS to display and analyze World Cup Qatar 2022 statistics. The app provides detailed match information, country statistics, and top scorers data.

## 🌟 Features

### Matches Page
- View all World Cup Qatar 2022 matches
- Search matches by team names
- Filter matches by tournament stage (Group Stage, Round of 16, Quarter-finals, etc.)
- Detailed match information including:
  - Team names
  - Match scores
  - Possession statistics
  - Match date and time
  - Tournament stage

### Countries Page
- Comprehensive statistics for each participating country
- Search countries by name
- Sort countries by:
  - Name (alphabetically)
  - Number of wins
  - Goals scored
  - Goals conceded
- Detailed country statistics including:
  - Matches played
  - Wins, draws, and losses
  - Goals scored and conceded

### Top Scorers Page
- View team goal-scoring statistics
- Search teams by name
- Special medal indicators for top 3 scoring teams
- Real-time filtering of team statistics

## 🛠️ Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Lucide React (for icons)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mrblackx/world-cup-2022.git
cd world-cup-2022
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code linting

## 🎨 Project Structure

```
world-cup-2022/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── public/            # Static assets
└── ...config files    # Configuration files
```

## 🔧 Configuration

The project uses several configuration files:
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

- GitHub: [@mrblackx](https://github.com/mrblackx)

## 🙏 Acknowledgments

- FIFA for providing the World Cup Qatar 2022 data
- The React team for the amazing framework
- The Tailwind CSS team for the utility-first CSS framework
- The Vite team for the fast build tool 
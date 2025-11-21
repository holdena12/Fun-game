# Live World Tracker 🌐

A real-time web application that tracks fascinating statistics about what's happening around the world right now. Watch live updating numbers showing estimates of global activities like people typing, reels watched, pizzas ordered, and much more!

## Features

- 📊 **12+ Pre-built Trackers** tracking various global activities
- 🔄 **Real-time Updates** - Numbers constantly update to show live estimates
- 💡 **Suggest New Trackers** - Suggest trackers and see them added instantly
- 🎨 **Beautiful Animated Counters** - Smooth number transitions and visual updates
- 🎯 **Category Filtering** - Browse by Digital Activity, Social Media, Food, and more
- 📱 **Fully Responsive** - Works perfectly on desktop and mobile

## Built-in Trackers

### Digital Activity
- ⌨️ People Typing Right Now
- 📧 Emails Sent Today
- 📷 Photos Taken Today
- 💻 Zoom Meeting Participants Now
- 💾 GitHub Commits This Hour
- 🔐 New Passwords Created Today

### Social Media
- 📱 Reels Watched Today
- 🐦 Tweets/Posts This Minute
- 🤳 Selfies Taken Today
- ⬆️ Reddit Upvotes This Minute
- 📸 Instagram Posts This Minute
- 🎬 TikTok Videos Uploaded Today
- 😂 Memes Shared This Hour

### Entertainment
- 📺 YouTube Hours Watched Today
- 🎵 Songs Streamed Right Now
- 🎮 People Gaming Right Now
- 🎧 Spotify Streams This Second
- 📺 People Watching Netflix Now

### Food & Daily Life
- 🍕 Pizzas Ordered Today
- ☕ Cups of Coffee Consumed Today
- 🍔 Food Deliveries in Transit

### Commerce
- 🛒 People Shopping Online Now
- 📦 Amazon Packages Shipped Today

### Human Activity
- 😴 People Sleeping Right Now
- 👶 Babies Born Today
- 👟 Steps Walked Worldwide Today

### Transportation
- ✈️ Flights in the Air Right Now
- 🚗 Uber Rides Happening Now

### Technology
- 🔍 Google Searches This Second
- ₿ Bitcoin Transactions Today

### Environment
- 🌳 Trees Cut Down Today

## Tech Stack

### Frontend
- React 18 with Vite
- Custom CSS animations (no UI frameworks)
- Real-time counter animations

### Backend
- Node.js + Express
- Ollama integration for AI-generated custom trackers
- Mathematical models for realistic estimates

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Ollama (optional, for creating custom trackers)

### Installation

1. Navigate to the project directory
```bash
cd "/Users/holdenabrams/Fun game"
```

2. Install dependencies
```bash
npm install
cd client && npm install
cd ..
```

3. (Optional) Start Ollama for AI features
```bash
ollama serve
ollama pull llama2
```

4. Start the application
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3000`
- Frontend on `http://localhost:5173`

Visit `http://localhost:5173` to see the live tracker!

## How It Works

### Statistical Modeling

The trackers use realistic estimates based on:
- Global population statistics
- Internet usage data
- Time-of-day multipliers (activity varies by hour)
- Random variance for natural fluctuation
- Accumulating counters for daily totals

### Real-time Updates

- Each tracker updates at its own interval (1-5 seconds)
- Numbers animate smoothly between values
- Visual indicators show when updates occur
- Counters reset at midnight for daily trackers

### Suggest Trackers

Don't see what you're looking for? Suggest a new tracker:
1. Type your suggestion in the suggestion box
2. Click "Suggest"
3. Your tracker gets added with realistic estimates
4. Watch it update in real-time!

Behind the scenes, Ollama helps generate realistic statistics for your suggestions.

## API Endpoints

- `GET /api/trackers` - Get all trackers (optional ?category= filter)
- `GET /api/trackers/:id` - Get a specific tracker's current value
- `GET /api/categories` - Get all tracker categories
- `POST /api/trackers/suggest` - Suggest a new tracker (processed with Ollama)
- `GET /api/health` - Health check

## Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

## Project Structure

```
/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── TrackerCard.jsx
│   │   │   ├── AnimatedCounter.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── CreateTrackerModal.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/              # Express backend
│   └── index.js         # API server with tracker logic
├── package.json
└── README.md
```

## Customization

### Adding New Trackers

Edit `server/index.js` and add to the `trackers` array:

```javascript
{
  id: 'your-tracker',
  title: 'Your Tracker Title',
  description: 'Description of what you're tracking',
  icon: '🎯',
  category: 'Category Name',
  baseValue: 1000000,
  variance: 0.15,
  updateInterval: 2000,
  color: '#3b82f6'
}
```

## Notes on Accuracy

These are **estimates and approximations** based on available statistics and mathematical models. The numbers are designed to feel realistic and update dynamically, but they are not exact real-time counts. The goal is to provide a fascinating visualization of global activity!

## Contributing

Feel free to:
- Add more trackers
- Improve the estimation algorithms
- Enhance the UI/animations
- Add new features

## License

MIT

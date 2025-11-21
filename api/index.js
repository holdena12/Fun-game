const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Tracker definitions with estimation formulas
const trackers = [
  {
    id: 'people-typing',
    title: 'People Typing Right Now',
    description: 'Estimated number of people actively typing on keyboards worldwide',
    icon: '⌨️',
    category: 'Digital Activity',
    baseValue: 350000000,
    variance: 0.15,
    updateInterval: 2000,
    timeMultiplier: true,
    color: '#3b82f6'
  },
  {
    id: 'reels-watched',
    title: 'Reels Watched Today',
    description: 'Approximate Instagram/TikTok reels viewed since midnight',
    icon: '📱',
    category: 'Social Media',
    baseValue: 0,
    perSecond: 578000,
    resetDaily: true,
    color: '#ec4899'
  },
  {
    id: 'pizzas-ordered',
    title: 'Pizzas Ordered Today',
    description: 'Estimated pizzas ordered globally today',
    icon: '🍕',
    category: 'Food',
    baseValue: 0,
    perSecond: 347,
    resetDaily: true,
    timeMultiplier: true,
    color: '#f59e0b'
  },
  {
    id: 'google-searches',
    title: 'Google Searches This Second',
    description: 'Approximate Google searches happening right now',
    icon: '🔍',
    category: 'Internet',
    baseValue: 99000,
    variance: 0.20,
    updateInterval: 1000,
    color: '#10b981'
  },
  {
    id: 'people-sleeping',
    title: 'People Sleeping Right Now',
    description: 'Estimated humans currently asleep worldwide',
    icon: '😴',
    category: 'Human Activity',
    baseValue: 3200000000,
    variance: 0.10,
    updateInterval: 5000,
    timeMultiplier: true,
    color: '#8b5cf6'
  },
  {
    id: 'emails-sent',
    title: 'Emails Sent Today',
    description: 'Total emails sent worldwide today',
    icon: '📧',
    category: 'Digital Activity',
    baseValue: 0,
    perSecond: 3472222,
    resetDaily: true,
    color: '#06b6d4'
  },
  {
    id: 'coffee-cups',
    title: 'Cups of Coffee Consumed Today',
    description: 'Estimated cups of coffee drunk worldwide today',
    icon: '☕',
    category: 'Food',
    baseValue: 0,
    perSecond: 27777,
    resetDaily: true,
    timeMultiplier: true,
    color: '#78350f'
  },
  {
    id: 'youtube-hours',
    title: 'YouTube Hours Watched Today',
    description: 'Total hours of YouTube content watched today',
    icon: '📺',
    category: 'Social Media',
    baseValue: 0,
    perSecond: 11574,
    resetDaily: true,
    color: '#ef4444'
  },
  {
    id: 'tweets-posted',
    title: 'Tweets/Posts This Minute',
    description: 'Social media posts in the last minute',
    icon: '🐦',
    category: 'Social Media',
    baseValue: 350000,
    variance: 0.25,
    updateInterval: 3000,
    color: '#1d4ed8'
  },
  {
    id: 'selfies-taken',
    title: 'Selfies Taken Today',
    description: 'Estimated selfies captured worldwide today',
    icon: '🤳',
    category: 'Digital Activity',
    baseValue: 0,
    perSecond: 11574,
    resetDaily: true,
    color: '#db2777'
  },
  {
    id: 'songs-streamed',
    title: 'Songs Streamed Right Now',
    description: 'Music tracks being streamed this second',
    icon: '🎵',
    category: 'Entertainment',
    baseValue: 450000,
    variance: 0.18,
    updateInterval: 2000,
    timeMultiplier: true,
    color: '#10b981'
  },
  {
    id: 'online-shoppers',
    title: 'People Shopping Online Now',
    description: 'Active online shoppers worldwide right now',
    icon: '🛒',
    category: 'Commerce',
    baseValue: 45000000,
    variance: 0.20,
    updateInterval: 4000,
    timeMultiplier: true,
    color: '#f59e0b'
  },
  {
    id: 'flights-in-air',
    title: 'Flights in the Air Right Now',
    description: 'Commercial aircraft currently flying worldwide',
    icon: '✈️',
    category: 'Transportation',
    baseValue: 9700,
    variance: 0.12,
    updateInterval: 5000,
    timeMultiplier: true,
    color: '#06b6d4'
  },
  {
    id: 'video-games',
    title: 'People Gaming Right Now',
    description: 'Active video game players worldwide',
    icon: '🎮',
    category: 'Entertainment',
    baseValue: 78000000,
    variance: 0.18,
    updateInterval: 3000,
    timeMultiplier: true,
    color: '#8b5cf6'
  },
  {
    id: 'births-today',
    title: 'Babies Born Today',
    description: 'New humans who entered the world today',
    icon: '👶',
    category: 'Human Activity',
    baseValue: 0,
    perSecond: 4.3,
    resetDaily: true,
    color: '#ec4899'
  },
  {
    id: 'reddit-upvotes',
    title: 'Reddit Upvotes This Minute',
    description: 'Upvotes given across Reddit in the last 60 seconds',
    icon: '⬆️',
    category: 'Social Media',
    baseValue: 833333,
    variance: 0.25,
    updateInterval: 2000,
    color: '#ff4500'
  },
  {
    id: 'photos-taken',
    title: 'Photos Taken Today',
    description: 'Photos captured worldwide today (all devices)',
    icon: '📷',
    category: 'Digital Activity',
    baseValue: 0,
    perSecond: 54398,
    resetDaily: true,
    color: '#3b82f6'
  },
  {
    id: 'spotify-streams',
    title: 'Spotify Streams This Second',
    description: 'Songs being played on Spotify right now',
    icon: '🎧',
    category: 'Entertainment',
    baseValue: 85000,
    variance: 0.20,
    updateInterval: 1500,
    timeMultiplier: true,
    color: '#1db954'
  },
  {
    id: 'amazon-packages',
    title: 'Amazon Packages Shipped Today',
    description: 'Packages sent by Amazon today',
    icon: '📦',
    category: 'Commerce',
    baseValue: 0,
    perSecond: 347,
    resetDaily: true,
    timeMultiplier: true,
    color: '#ff9900'
  },
  {
    id: 'uber-rides',
    title: 'Uber Rides Happening Now',
    description: 'Active Uber trips in progress worldwide',
    icon: '🚗',
    category: 'Transportation',
    baseValue: 180000,
    variance: 0.22,
    updateInterval: 3000,
    timeMultiplier: true,
    color: '#000000'
  },
  {
    id: 'netflix-watching',
    title: 'People Watching Netflix Now',
    description: 'Active Netflix viewers worldwide right now',
    icon: '📺',
    category: 'Entertainment',
    baseValue: 55000000,
    variance: 0.15,
    updateInterval: 4000,
    timeMultiplier: true,
    color: '#e50914'
  },
  {
    id: 'zoom-calls',
    title: 'Zoom Meeting Participants Now',
    description: 'People in Zoom meetings right now',
    icon: '💻',
    category: 'Digital Activity',
    baseValue: 12000000,
    variance: 0.18,
    updateInterval: 3500,
    timeMultiplier: true,
    color: '#2d8cff'
  },
  {
    id: 'doordash-orders',
    title: 'Food Deliveries in Transit',
    description: 'Food delivery orders being delivered right now',
    icon: '🍔',
    category: 'Food',
    baseValue: 285000,
    variance: 0.20,
    updateInterval: 3000,
    timeMultiplier: true,
    color: '#ff3008'
  },
  {
    id: 'instagram-posts',
    title: 'Instagram Posts This Minute',
    description: 'New photos and videos posted on Instagram per minute',
    icon: '📸',
    category: 'Social Media',
    baseValue: 347222,
    variance: 0.22,
    updateInterval: 2500,
    color: '#e1306c'
  },
  {
    id: 'tiktok-videos',
    title: 'TikTok Videos Uploaded Today',
    description: 'New TikTok videos posted today',
    icon: '🎬',
    category: 'Social Media',
    baseValue: 0,
    perSecond: 694,
    resetDaily: true,
    color: '#000000'
  },
  {
    id: 'github-commits',
    title: 'GitHub Commits This Hour',
    description: 'Code commits pushed to GitHub in the last hour',
    icon: '💾',
    category: 'Technology',
    baseValue: 416667,
    variance: 0.20,
    updateInterval: 4000,
    timeMultiplier: true,
    color: '#6366f1'
  },
  {
    id: 'bitcoin-transactions',
    title: 'Bitcoin Transactions Today',
    description: 'Bitcoin blockchain transactions today',
    icon: '₿',
    category: 'Technology',
    baseValue: 0,
    perSecond: 4.6,
    resetDaily: true,
    color: '#f7931a'
  },
  {
    id: 'steps-walked',
    title: 'Steps Walked Worldwide Today',
    description: 'Estimated total steps taken by humans today',
    icon: '👟',
    category: 'Human Activity',
    baseValue: 0,
    perSecond: 23148148,
    resetDaily: true,
    color: '#10b981'
  },
  {
    id: 'memes-shared',
    title: 'Memes Shared This Hour',
    description: 'Memes shared across all social platforms per hour',
    icon: '😂',
    category: 'Social Media',
    baseValue: 8333333,
    variance: 0.30,
    updateInterval: 2500,
    color: '#fbbf24'
  },
  {
    id: 'trees-cut',
    title: 'Trees Cut Down Today',
    description: 'Trees felled worldwide today (all purposes)',
    icon: '🌳',
    category: 'Environment',
    baseValue: 0,
    perSecond: 1157,
    resetDaily: true,
    color: '#059669'
  },
  {
    id: 'passwords-created',
    title: 'New Passwords Created Today',
    description: 'New account passwords set worldwide today',
    icon: '🔐',
    category: 'Technology',
    baseValue: 0,
    perSecond: 69444,
    resetDaily: true,
    color: '#7c3aed'
  }
];

// Helper function to calculate current value for a tracker
function calculateTrackerValue(tracker) {
  const now = new Date();
  const hour = now.getHours();
  const secondsToday = (hour * 3600) + (now.getMinutes() * 60) + now.getSeconds();
  
  let value;
  
  if (tracker.resetDaily) {
    value = tracker.baseValue + (tracker.perSecond * secondsToday);
  } else {
    value = tracker.baseValue;
  }
  
  if (tracker.timeMultiplier) {
    let timeMultiplier = 1.0;
    if (hour >= 12 && hour < 14) timeMultiplier = 1.2;
    else if (hour >= 18 && hour < 22) timeMultiplier = 1.15;
    else if (hour >= 2 && hour < 6) timeMultiplier = 0.6;
    else if (hour >= 0 && hour < 2) timeMultiplier = 0.75;
    value *= timeMultiplier;
  }
  
  if (tracker.variance) {
    const randomVariance = 1 + ((Math.random() - 0.5) * 2 * tracker.variance);
    value *= randomVariance;
  }
  
  return Math.floor(value);
}

// API Routes
app.get('/api/trackers', (req, res) => {
  const category = req.query.category;
  let filteredTrackers = trackers;
  
  if (category && category !== 'all') {
    filteredTrackers = trackers.filter(t => t.category === category);
  }
  
  const trackersWithValues = filteredTrackers.map(tracker => ({
    ...tracker,
    currentValue: calculateTrackerValue(tracker)
  }));
  
  res.json(trackersWithValues);
});

app.get('/api/categories', (req, res) => {
  const categories = [...new Set(trackers.map(t => t.category))];
  res.json(categories);
});

app.get('/api/trackers/:id', (req, res) => {
  const tracker = trackers.find(t => t.id === req.params.id);
  
  if (!tracker) {
    return res.status(404).json({ error: 'Tracker not found' });
  }
  
  res.json({
    ...tracker,
    currentValue: calculateTrackerValue(tracker)
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Export for Vercel serverless
module.exports = app;


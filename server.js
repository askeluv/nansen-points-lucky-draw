const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock data for fallback when Nansen API is unavailable
const mockData = {
  evm: [
    { address: "0x6E93Ebc8302890fF1D1BeFd779D1DB131eF30D4d", points: 1219739, rank: 1, tier: "star" },
    { address: "0xFF2CB722D9D9a0AA49688296B6910770521990dA", points: 841840, rank: 2, tier: "star" },
    { address: "0x8540f80fab2afcae8d8fd6b1557b1cf943a0999b", points: 668750, rank: 3, tier: "star" },
    { address: "0x661218f97ee63af34baa42d8de03ca57c2d64f1c", points: 650910, rank: 4, tier: "star" },
    { address: "0x3DE52FC645A215D841c6891B9CBf193EBC728814", points: 649606, rank: 5, tier: "star" },
    { address: "0x0949c067939b117dbad9072fa79132850f952a77", points: 494762, rank: 6, tier: "star" },
    { address: "0xbbfb6566ad064c233af6314aeb1eee4c26a5f921", points: 421844, rank: 7, tier: "star" },
    { address: "0xbca5cad99c22be2264d5d3ab2c06d445545d4468", points: 399450, rank: 8, tier: "star" },
    { address: "0x7EAb5A11d072a3F335E7FF2F160EA34853513700", points: 383275, rank: 9, tier: "star" },
    { address: "0x742d35Cc6634C0532925a3b8D4C9db96590c6d0a", points: 15420, rank: 10, tier: "bronze" }
  ],
  solana: [
    { address: "EhWT1SJXSCF6YTmUpTgH1xa8xZiGqEPSED3CWfR4cicM", points: 1219739, rank: 1, tier: "star" },
    { address: "Cj4B8KxpxNgofbrXUMjcWmQYEz3EVrPurAmdYB7jKaVo", points: 841840, rank: 2, tier: "star" },
    { address: "H4Ye1cLmbuXGe1r6c9xVaLifaFFtm8SpNqMvMBy3qK6X", points: 730668, rank: 3, tier: "star" },
    { address: "75rXkz15o5NJZjjsPStyzAqhWm8QHi6ebWBZ4HdaSRPz", points: 668750, rank: 4, tier: "star" },
    { address: "BR1YVh88qQ7PmhpG2yw4wZuCatBBJzGsDv8gn7L4VYL7", points: 650910, rank: 5, tier: "star" },
    { address: "33ECWuqmxd6CjYLwC4bcn8JiWJAZhBi4Y6SbTLSXNnWu", points: 649606, rank: 6, tier: "star" },
    { address: "8J7i924REXyZgFE7w45AqwVWU7vQGDY2ttvEgs2HK5TC", points: 494762, rank: 7, tier: "star" },
    { address: "CT5q59C4hxVExUsAN5q3icCsMFPxSoS8FDuodk5TqH45", points: 421844, rank: 8, tier: "star" },
    { address: "8VU25YAqn82StSf7CUGWGzBfKqa5164Qwacyh2iRyeyz", points: 399450, rank: 9, tier: "star" },
    { address: "FE8MKa6LiWmaG8MDKhNAjqi75hdd7xidkvX9zCBr6DVD", points: 383275, rank: 10, tier: "star" }
  ]
};



// Helper function to transform Nansen API data
function transformNansenData(data) {
  if (!data || !data.data) return null;
  
  const transformed = { evm: [], solana: [] };
  
  data.data.forEach((user) => {
    // Handle EVM addresses
    if (user.evm_address) {
      transformed.evm.push({
        address: user.evm_address,
        points: user.points_balance || 0,
        rank: user.rank || 1,
        tier: user.tier || 'Bronze'
      });
    }
    
    // Handle Solana addresses
    if (user.solana_address) {
      transformed.solana.push({
        address: user.solana_address,
        points: user.points_balance || 0,
        rank: user.rank || 1,
        tier: user.tier || 'Bronze'
      });
    }
  });
  
  // Sort by points (descending) and reassign ranks
  ['evm', 'solana'].forEach(chain => {
    transformed[chain].sort((a, b) => b.points - a.points);
    transformed[chain].forEach((user, index) => {
      user.rank = index + 1;
    });
  });
  
  return transformed;
}

// Weighted random selection using cumulative distribution function
function weightedRandomSelection(participants) {
  if (!participants || participants.length === 0) {
    throw new Error('No participants available');
  }
  
  // Calculate total points
  const totalPoints = participants.reduce((sum, p) => sum + p.points, 0);
  
  // Create cumulative distribution
  let cumulative = 0;
  const distribution = participants.map(p => {
    cumulative += p.points / totalPoints;
    return { ...p, cumulative };
  });
  
  // Generate random number and find winner
  const random = Math.random();
  const winner = distribution.find(p => random <= p.cumulative);
  
  return winner || distribution[distribution.length - 1];
}

// API Routes

// Main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: 'Nansen Points Lucky Draw API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Get Nansen points data
app.get('/api/nansen-points', async (req, res) => {
  try {
    // Try to fetch from Nansen API
    const response = await axios.get('https://api.nansen.ai/api/points-leaderboard', {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://nansen.ai/'
      }
    });
    
    const transformedData = transformNansenData(response.data);
    
    if (transformedData) {
      res.json({
        status: 'success',
        message: 'Data fetched from Nansen API',
        data: transformedData,
        source: 'nansen',
        timestamp: new Date().toISOString()
      });
    } else {
      throw new Error('Invalid data format from Nansen API');
    }
    
  } catch (error) {
    console.log('Nansen API failed, using mock data:', error.message);
    
    // Fallback to mock data
    res.json({
      status: 'success',
      message: 'Using mock data (Nansen API unavailable)',
      data: mockData,
      source: 'mock',
      timestamp: new Date().toISOString()
    });
  }
});

// Run lucky draw
app.post('/api/run-lottery', async (req, res) => {
  try {
    const { chainType = 'evm' } = req.body;
    
    if (!['evm', 'solana'].includes(chainType)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid chain type. Must be "evm" or "solana"'
      });
    }
    
    // Get current data
    let data;
    try {
      const response = await axios.get('https://api.nansen.ai/api/points-leaderboard', {
        timeout: 5000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://nansen.ai/'
        }
      });
      data = transformNansenData(response.data);
    } catch (error) {
      data = mockData;
    }
    
    if (!data || !data[chainType] || data[chainType].length === 0) {
      return res.status(400).json({
        status: 'error',
        message: `No participants available for ${chainType} chain`
      });
    }
    
    // Run weighted random selection
    const winner = weightedRandomSelection(data[chainType]);
    const totalParticipants = data[chainType].length;
    const totalPoints = data[chainType].reduce((sum, p) => sum + p.points, 0);
    const winProbability = ((winner.points / totalPoints) * 100).toFixed(2);
    
    const result = {
      status: 'success',
      winner: {
        address: winner.address,
        points: winner.points,
        rank: winner.rank,
        tier: winner.tier
      },
      drawStats: {
        totalParticipants,
        totalPoints,
        winProbability: `${winProbability}%`,
        chainType,
        timestamp: new Date().toISOString()
      }
    };
    
    res.json(result);
    
  } catch (error) {
    console.error('Error running lottery:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to run lucky draw',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Nansen Points Lucky Draw server running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} in your browser`);
  console.log(`🔗 API available at http://localhost:${PORT}/api`);
});

module.exports = app;


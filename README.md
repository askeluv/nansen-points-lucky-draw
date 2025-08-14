# 🎯 Nansen Points Lucky Draw

A fair and transparent web application that runs lucky draws to select winners based on Nansen Points balance. The probability of winning is proportional to the user's points balance, making it a fair weighted random selection system.

## ✨ Features

- **🎲 Fair Lucky Draw System**: Weighted random selection based on Nansen Points balance
- **🔗 Multi-Chain Support**: EVM and Solana blockchain participants
- **📊 Real-time Leaderboard**: Live points data from Nansen API
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **🎉 Confetti Celebration**: Festive winner announcements
- **⌨️ Keyboard Shortcuts**: Full keyboard navigation support
- **📱 Mobile-First**: Responsive design that works on all devices
- **🔄 Fallback System**: Mock data when external API is unavailable

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nansen-points-lucky-draw
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
# Start production server
npm start

# Set custom port
PORT=8080 npm start
```

## 🎮 Usage

### Running a Lucky Draw

1. **Select Chain**: Choose between EVM (🔗) or Solana (☀️) using the toggle buttons
2. **Click Draw**: Press the "🎯 Run Lucky Draw" button
3. **Watch Animation**: Enjoy the suspense as the system selects a winner
4. **Celebrate**: See the winner announcement with confetti!

### Keyboard Shortcuts

- **Space/Enter**: Run lucky draw (when button is focused)
- **R**: Refresh leaderboard data
- **1**: Switch to EVM chain
- **2**: Switch to Solana chain
- **Tab**: Navigate between interactive elements

### Chain Toggle

- **EVM (🔗)**: Shows participants from Ethereum, Polygon, BSC, Arbitrum, etc.
- **Solana (☀️)**: Shows participants from the Solana blockchain

## 🔧 API Endpoints

### Base URL
```
http://localhost:3000
```

### Available Endpoints

#### 1. Main Application
- **GET /** - Main application page

#### 2. API Status
- **GET /api/status** - Check API connection status
  ```json
  {
    "status": "success",
    "message": "Nansen Points Lucky Draw API is running",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "1.0.0"
  }
  ```

#### 3. Points Data
- **GET /api/nansen-points** - Get points leaderboard data
  ```json
  {
    "status": "success",
    "message": "Data fetched from Nansen API",
    "data": {
      "evm": [...],
      "solana": [...]
    },
    "source": "nansen",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

#### 4. Lucky Draw
- **POST /api/run-lottery** - Execute lucky draw
  ```json
  // Request
  {
    "chainType": "evm"
  }
  
  // Response
  {
    "status": "success",
    "winner": {
      "address": "0x742d35Cc6634C0532925a3b8D4C9db96590c6d0a",
      "points": 15420,
      "rank": 1,
      "tier": "Diamond"
    },
    "drawStats": {
      "totalParticipants": 10,
      "totalPoints": 65000,
      "winProbability": "23.72%",
      "chainType": "evm",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

## 🏗️ Architecture

### Frontend
- **Framework**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with modern features (Grid, Flexbox, Animations)
- **Design**: Mobile-first, responsive layout
- **Accessibility**: Screen reader friendly, keyboard navigation

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **HTTP Client**: Axios for API calls
- **Middleware**: CORS, JSON parsing, static file serving

### Data Flow
1. **User Interaction** → Frontend JavaScript
2. **API Request** → Express Server
3. **External API** → Nansen Points Leaderboard
4. **Data Processing** → Weighted selection algorithm
5. **Response** → Frontend display with animations

## 🎯 Lucky Draw Algorithm

### Weighted Random Selection

The application uses a **Cumulative Distribution Function (CDF)** algorithm:

1. **Calculate Total Points**: Sum all participant points
2. **Create Distribution**: Build cumulative probability distribution
3. **Generate Random**: Use Math.random() for selection
4. **Find Winner**: Select participant based on probability

### Example
```
Participant A: 1000 points (20% probability)
Participant B: 1500 points (30% probability)  
Participant C: 2500 points (50% probability)

Total: 5000 points
Random: 0.73 → Participant C wins (73% > 50%)
```

## 🔒 Security & Fairness

### Data Protection
- **No Sensitive Data**: Only public blockchain addresses
- **API Rate Limiting**: Respects external API limits
- **Input Validation**: Sanitizes all user inputs
- **CORS Policy**: Proper cross-origin handling

### Fairness Guarantees
- **Transparent Algorithm**: Open-source weighted selection
- **No Manipulation**: Server-side random generation
- **Audit Trail**: Timestamp and participant tracking
- **Verifiable Results**: Reproducible selection process

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

### Features
- **Mobile-First**: Optimized for small screens
- **Touch-Friendly**: Large touch targets
- **Flexible Layout**: Adapts to all screen sizes
- **Performance**: Optimized animations and transitions

## 🎨 Customization

### Colors
The application uses CSS custom properties for easy theming:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Animations
- **Confetti**: Customizable colors and timing
- **Transitions**: Smooth hover effects and state changes
- **Loading**: Spinner animations and progress indicators

## 🚨 Troubleshooting

### Common Issues

#### 1. "API Unavailable" Error
- **Cause**: Nansen API is down or unreachable
- **Solution**: Application automatically falls back to mock data
- **Check**: Verify internet connection and API status

#### 2. Lucky Draw Not Working
- **Cause**: No participants for selected chain
- **Solution**: Switch to a different chain or refresh data
- **Check**: Ensure leaderboard has loaded successfully

#### 3. Slow Performance
- **Cause**: Large dataset or slow API response
- **Solution**: Wait for data to load or refresh
- **Check**: Monitor browser console for errors

#### 4. Mobile Display Issues
- **Cause**: Browser compatibility or viewport issues
- **Solution**: Use latest browser version
- **Check**: Verify meta viewport tag is present

### Debug Mode

Enable debug logging in the browser console:

```javascript
// In browser console
localStorage.setItem('debug', 'true');
location.reload();
```

### Error Reporting

Check the browser console for detailed error messages and stack traces.

## 🔮 Future Enhancements

### Planned Features
- **Multiple Winners**: Select multiple participants
- **Custom Criteria**: Filter by additional parameters
- **Historical Data**: Track past lucky draws
- **Export Results**: Download winner lists

### Additional Blockchains
- **Cosmos**: IBC-enabled chains
- **Polkadot**: Substrate-based networks
- **Layer 2s**: Optimism, Arbitrum, Polygon

### Integration Options
- **Webhook Support**: Notify external systems
- **API Endpoints**: Allow external applications
- **Embeddable Widgets**: Integrate into other sites
- **Mobile Apps**: Native iOS/Android applications

## 📚 Development

### Project Structure
```
nansen-points-lucky-draw/
├── server.js              # Express server with API endpoints
├── package.json           # Dependencies and scripts
├── public/                # Frontend assets
│   ├── index.html         # Main HTML page
│   ├── styles.css         # CSS styles and animations
│   └── script.js          # Frontend JavaScript logic
├── README.md              # Setup and usage instructions
└── PRD.md                 # Product Requirements Document
```

### Development Commands
```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Check for linting issues
npm run lint

# Run tests (when implemented)
npm test
```

### Code Style
- **JavaScript**: ES6+ with modern syntax
- **CSS**: BEM methodology for class naming
- **HTML**: Semantic markup with accessibility
- **Comments**: Comprehensive inline documentation

## 🤝 Contributing

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Development Guidelines
- **Code Quality**: Follow existing patterns and style
- **Testing**: Test on multiple devices and browsers
- **Documentation**: Update README and inline comments
- **Accessibility**: Ensure screen reader compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nansen**: For providing the points leaderboard API
- **Inter Font**: Google Fonts for beautiful typography
- **Express.js**: For the robust web framework
- **Open Source Community**: For inspiration and tools

## 📞 Support

### Getting Help
- **Documentation**: Check this README first
- **Issues**: Open a GitHub issue for bugs
- **Discussions**: Use GitHub discussions for questions
- **Console Logs**: Check browser console for errors

### Contact Information
- **Repository**: [GitHub Issues](https://github.com/your-repo/issues)
- **Documentation**: [Project Wiki](https://github.com/your-repo/wiki)
- **Community**: [Discussions](https://github.com/your-repo/discussions)

---

**Built with ❤️ for the crypto community**

*May the odds be ever in your favor! 🎯✨*


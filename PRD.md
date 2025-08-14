# 📋 **Product Requirements Document (PRD)**

## **Nansen Points Lucky Draw Web Application**

### **🎯 Executive Summary**

A web application that runs a lucky draw to select winners based on Nansen Points balance. The probability of winning is proportional to the user's points balance, making it a fair weighted random selection system. The app supports multi-chain participants (EVM and Solana) with real-time data integration.

---

## **📊 Product Overview**

### **Product Name**
Nansen Points Lucky Draw

### **Product Type**
Web Application (SPA)

### **Target Users**
- Crypto communities using Nansen Points
- DAOs and organizations running reward systems
- Developers building on-chain applications
- Users participating in blockchain ecosystems

### **Core Value Proposition**
Fair, transparent, and engaging way to select winners based on actual blockchain activity and points accumulation.

---

## **🎯 Functional Requirements**

### **1. Lucky Draw System**
- **Weighted Random Selection**: Winners selected with probability proportional to Nansen Points balance
- **Chain-Aware Filtering**: Support for EVM and Solana blockchain participants
- **Real-time Execution**: Instant winner selection with live data
- **Audit Trail**: Timestamp and participant count tracking

### **2. Multi-Chain Support**
- **EVM Chains**: Ethereum, Polygon, BSC, Arbitrum, etc.
- **Solana**: Solana blockchain participants
- **Chain Toggle**: User can switch between EVM and Solana views
- **Mixed Participants**: Users with both chain addresses supported

### **3. Data Integration**
- **Nansen API**: Real-time points data from `https://api.nansen.ai/api/points-leaderboard`
- **Fallback System**: Mock data when API unavailable
- **Data Transformation**: Consistent format across different data sources
- **Error Handling**: Graceful degradation and user feedback

### **4. User Interface**
- **Responsive Design**: Mobile-first, works on all device sizes
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, loading states, keyboard shortcuts
- **Accessibility**: Screen reader friendly, keyboard navigation

---

## **🎨 User Experience Requirements**

### **1. Main Interface**
- **Header**: App title and API status indicator
- **Lucky Draw Section**: Single prominent button to run the draw
- **Leaderboard Section**: Chain toggle and points table
- **Winner Display**: Animated winner announcement with statistics

### **2. Lucky Draw Animation**
- **Spinning Wheel**: Visual representation of the selection process
- **Name Cycling**: Random participant names during selection
- **Progress Bar**: Visual feedback on selection progress
- **Confetti Celebration**: Festive winner announcement

### **3. Chain Toggle System**
- **EVM Button**: 🔗 icon, shows EVM participants only
- **Solana Button**: ☀️ icon, shows Solana participants only
- **Active States**: Visual indication of selected chain
- **Instant Switching**: Real-time data filtering

### **4. Leaderboard Display**
- **Rank Column**: Participant position by points
- **Address Column**: Blockchain address (formatted for selected chain)
- **Points Column**: Nansen Points balance (formatted with commas)
- **Probability Column**: Win probability percentage

---

## **🔧 Technical Requirements**

### **1. Frontend Technology**
- **Framework**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with modern features (Grid, Flexbox, Animations)
- **HTML5**: Semantic markup with accessibility features
- **Responsive**: Mobile-first design approach

### **2. Backend Technology**
- **Runtime**: Node.js
- **Framework**: Express.js
- **HTTP Client**: Axios for API calls
- **Middleware**: CORS, JSON parsing, static file serving

### **3. API Integration**
- **External API**: Nansen Points Leaderboard
- **Data Format**: JSON with nested structure
- **Error Handling**: Timeout, rate limiting, fallback data
- **Headers**: Browser-like user agent and referrer

### **4. Data Processing**
- **Weighted Selection**: Cumulative distribution function algorithm
- **Chain Filtering**: Strict filtering by blockchain address type
- **Data Transformation**: Normalized format for consistent display
- **Mock Data**: Realistic fallback for testing and development

---

## **📱 User Interface Specifications**

### **1. Layout Structure**
```
┌─────────────────────────────────────┐
│              Header                 │
│        Title + API Status          │
├─────────────────────────────────────┤
│                                     │
│         Lucky Draw Section          │
│        (Centered Button)            │
│                                     │
├─────────────────────────────────────┤
│                                     │
│      Leaderboard Section            │
│   Chain Toggle + Points Table      │
│                                     │
└─────────────────────────────────────┘
```

### **2. Color Scheme**
- **Primary**: Blue gradient (#667eea → #764ba2)
- **Secondary**: Green gradient (#48bb78 → #38a169)
- **Background**: Purple gradient (#667eea → #764ba2)
- **Text**: Dark gray (#2d3748) on white
- **Accents**: Various colors for confetti and animations

### **3. Typography**
- **Font Family**: Inter (Google Fonts)
- **Headings**: 700 weight, large sizes
- **Body Text**: 400-500 weight, readable sizes
- **Monospace**: For blockchain addresses

---

## **🚀 Performance Requirements**

### **1. Loading Times**
- **Initial Load**: < 3 seconds
- **API Response**: < 5 seconds timeout
- **Animation Smoothness**: 60fps animations
- **Responsiveness**: < 100ms for user interactions

### **2. Scalability**
- **Participant Count**: Support for 1000+ users
- **Concurrent Users**: Handle multiple simultaneous draws
- **Data Refresh**: Efficient leaderboard updates
- **Memory Usage**: Optimized for large datasets

### **3. Reliability**
- **API Fallback**: Mock data when external API fails
- **Error Handling**: Graceful degradation
- **Offline Support**: Basic functionality without internet
- **Cross-browser**: Chrome, Firefox, Safari, Edge

---

## **🔒 Security Requirements**

### **1. Data Protection**
- **No Sensitive Data**: Only public blockchain addresses
- **API Rate Limiting**: Respect external API limits
- **Input Validation**: Sanitize all user inputs
- **CORS Policy**: Proper cross-origin handling

### **2. Fairness Guarantees**
- **Transparent Algorithm**: Open-source weighted selection
- **No Manipulation**: Server-side random generation
- **Audit Trail**: Timestamp and participant tracking
- **Verifiable Results**: Reproducible selection process

---

## **📋 Implementation Checklist**

### **Phase 1: Core Infrastructure**
- [ ] Project setup with Node.js and Express
- [ ] Basic HTML structure and CSS styling
- [ ] Static file serving and routing
- [ ] Error handling and logging

### **Phase 2: Data Integration**
- [ ] Nansen API integration
- [ ] Data transformation and normalization
- [ ] Mock data generation for testing
- [ ] Fallback system implementation

### **Phase 3: Lucky Draw System**
- [ ] Weighted random selection algorithm
- [ ] Animation system (wheel, names, progress)
- [ ] Winner display and statistics
- [ ] Confetti celebration effects

### **Phase 4: Multi-Chain Support**
- [ ] Chain toggle UI components
- [ ] EVM/Solana filtering logic
- [ ] Address format handling
- [ ] Chain-specific lucky draws

### **Phase 5: User Experience**
- [ ] Responsive design implementation
- [ ] Loading states and animations
- [ ] Keyboard shortcuts and accessibility
- [ ] Error messages and user feedback

### **Phase 6: Testing & Deployment**
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance optimization
- [ ] Production deployment

---

## **🎯 Success Metrics**

### **1. User Engagement**
- **Draw Frequency**: Number of lucky draws run
- **Session Duration**: Time spent on the application
- **Return Users**: Repeat usage patterns

### **2. Technical Performance**
- **API Success Rate**: Successful external API calls
- **Load Times**: Page and animation performance
- **Error Rates**: Application stability metrics

### **3. User Satisfaction**
- **Interface Usability**: Ease of navigation and use
- **Animation Quality**: Visual appeal and smoothness
- **Chain Support**: Multi-blockchain functionality

---

## **🔮 Future Enhancements**

### **1. Additional Blockchains**
- **Cosmos**: IBC-enabled chains
- **Polkadot**: Substrate-based networks
- **Layer 2s**: Optimism, Arbitrum, Polygon

### **2. Advanced Features**
- **Multiple Winners**: Select multiple participants
- **Custom Criteria**: Filter by additional parameters
- **Historical Data**: Track past lucky draws
- **Export Results**: Download winner lists

### **3. Integration Options**
- **Webhook Support**: Notify external systems
- **API Endpoints**: Allow external applications
- **Embeddable Widgets**: Integrate into other sites
- **Mobile Apps**: Native iOS/Android applications

---

## **📚 Technical Documentation**

### **1. API Endpoints**
- `GET /` - Main application page
- `GET /api/status` - API connection status
- `GET /api/nansen-points` - Points leaderboard data
- `POST /api/run-lottery` - Execute lucky draw

### **2. Data Structures**
- **User Object**: Addresses, points, rank, tier
- **Draw Result**: Winner, participants, points, timestamp
- **API Response**: Status, message, data availability

### **3. Algorithms**
- **Weighted Selection**: Cumulative distribution function
- **Chain Filtering**: Strict address type validation
- **Data Transformation**: Normalization and formatting

---

## **📁 File Structure**

```
nansen-points-lucky-draw/
├── server.js              # Express server with API endpoints
├── package.json           # Dependencies and scripts
├── public/                # Frontend assets
│   ├── index.html         # Main HTML page
│   ├── styles.css         # CSS styles and animations
│   └── script.js          # Frontend JavaScript logic
├── README.md              # Setup and usage instructions
└── PRD.md                 # This Product Requirements Document
```

---

## **🚀 Getting Started**

### **Prerequisites**
- Node.js (version 14 or higher)
- npm or yarn package manager

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd nansen-points-lucky-draw

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### **Production Build**
```bash
# Start production server
npm start

# Set environment variables
PORT=3000 npm start
```

---

## **📞 Support & Contact**

### **Documentation**
- **README.md**: Setup and usage instructions
- **Code Comments**: Inline documentation
- **Console Logs**: Debug information

### **Issues & Bugs**
- Check browser console for error messages
- Verify API connectivity status
- Review server logs for backend issues

---

This PRD provides a comprehensive blueprint for recreating the Nansen Points Lucky Draw application. It covers all functional requirements, technical specifications, user experience details, and implementation phases. The document ensures that developers have clear guidance on building a feature-complete, production-ready application. 🚀✨

// Nansen Points Lucky Draw - Frontend JavaScript
class NansenLuckyDraw {
    constructor() {
        this.currentChain = 'evm';
        this.leaderboardData = null;
        this.isDrawRunning = false;
        
        // DOM Elements
        this.elements = {
            apiStatus: document.getElementById('apiStatus'),
            statusDot: document.querySelector('.status-dot'),
            luckyDrawBtn: document.getElementById('luckyDrawBtn'),
            btnText: document.querySelector('.btn-text'),
            btnLoading: document.querySelector('.btn-loading'),
            winnerDisplay: document.getElementById('winnerDisplay'),
            winnerAddress: document.getElementById('winnerAddress'),
            winnerPoints: document.getElementById('winnerPoints'),
            winnerTier: document.getElementById('winnerTier'),
            winProbability: document.getElementById('winProbability'),
            totalParticipants: document.getElementById('totalParticipants'),
            chainType: document.getElementById('chainType'),
            chainToggleBtns: document.querySelectorAll('.chain-toggle__btn'),
            leaderboardLoading: document.getElementById('leaderboardLoading'),
            leaderboardError: document.getElementById('leaderboardError'),
            leaderboardTable: document.getElementById('leaderboardTable'),
            leaderboardBody: document.getElementById('leaderboardBody'),
            leaderboardEmpty: document.getElementById('leaderboardEmpty'),
            refreshBtn: document.getElementById('refreshBtn'),
            confettiContainer: document.getElementById('confettiContainer')
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.checkApiStatus();
        this.loadLeaderboard();
        this.setupKeyboardShortcuts();
    }
    
    bindEvents() {
        // Lucky draw button
        this.elements.luckyDrawBtn.addEventListener('click', () => this.runLuckyDraw());
        
        // Chain toggle buttons
        this.elements.chainToggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchChain(e.target.dataset.chain));
        });
        
        // Refresh button
        this.elements.refreshBtn.addEventListener('click', () => this.loadLeaderboard());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }
    
    setupKeyboardShortcuts() {
        // Add keyboard shortcut hints to buttons
        this.elements.luckyDrawBtn.setAttribute('title', 'Press Space or Enter to run lucky draw');
        this.elements.refreshBtn.setAttribute('title', 'Press R to refresh');
    }
    
    handleKeyboardShortcuts(e) {
        // Space or Enter to run lucky draw
        if ((e.code === 'Space' || e.code === 'Enter') && document.activeElement === this.elements.luckyDrawBtn) {
            e.preventDefault();
            this.runLuckyDraw();
        }
        
        // R to refresh
        if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            this.loadLeaderboard();
        }
        
        // 1 for EVM, 2 for Solana
        if (e.code === 'Digit1') {
            e.preventDefault();
            this.switchChain('evm');
        }
        if (e.code === 'Digit2') {
            e.preventDefault();
            this.switchChain('solana');
        }
    }
    
    async checkApiStatus() {
        try {
            const response = await fetch('/api/status');
            if (response.ok) {
                this.updateApiStatus('connected', 'API Connected');
            } else {
                this.updateApiStatus('error', 'API Error');
            }
        } catch (error) {
            this.updateApiStatus('error', 'API Unavailable');
        }
    }
    
    updateApiStatus(status, message) {
        const statusDot = this.elements.statusDot;
        const apiStatus = this.elements.apiStatus;
        
        statusDot.className = `status-dot ${status}`;
        apiStatus.innerHTML = `<span class="status-dot ${status}"></span>${message}`;
    }
    
    async loadLeaderboard() {
        this.showLeaderboardLoading();
        
        try {
            const response = await fetch('/api/nansen-points');
            const data = await response.json();
            
            if (data.status === 'success') {
                this.leaderboardData = data.data;
                this.updateLeaderboard();
                this.updateApiStatus('connected', `API Connected (${data.source})`);
            } else {
                throw new Error(data.message || 'Failed to load data');
            }
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            this.showLeaderboardError();
            this.updateApiStatus('error', 'API Error');
        }
    }
    
    showLeaderboardLoading() {
        this.elements.leaderboardLoading.style.display = 'block';
        this.elements.leaderboardError.style.display = 'none';
        this.elements.leaderboardTable.style.display = 'none';
        this.elements.leaderboardEmpty.style.display = 'none';
    }
    
    showLeaderboardError() {
        this.elements.leaderboardLoading.style.display = 'none';
        this.elements.leaderboardError.style.display = 'block';
        this.elements.leaderboardTable.style.display = 'none';
        this.elements.leaderboardEmpty.style.display = 'none';
    }
    
    updateLeaderboard() {
        if (!this.leaderboardData || !this.leaderboardData[this.currentChain]) {
            this.showLeaderboardEmpty();
            return;
        }
        
        const participants = this.leaderboardData[this.currentChain];
        const totalPoints = participants.reduce((sum, p) => sum + p.points, 0);
        
        // Clear existing rows
        this.elements.leaderboardBody.innerHTML = '';
        
        // Add participant rows
        participants.forEach(participant => {
            const row = document.createElement('tr');
            const winProbability = ((participant.points / totalPoints) * 100).toFixed(2);
            
            row.innerHTML = `
                <td class="rank rank-${participant.rank}">${participant.rank}</td>
                <td class="address">${this.formatAddress(participant.address)}</td>
                <td class="points">${this.formatNumber(participant.points)}</td>
                <td class="tier tier-${participant.tier.toLowerCase()}">${participant.tier}</td>
                <td class="probability">${winProbability}%</td>
            `;
            
            this.elements.leaderboardBody.appendChild(row);
        });
        
        // Show table
        this.elements.leaderboardLoading.style.display = 'none';
        this.elements.leaderboardError.style.display = 'none';
        this.elements.leaderboardTable.style.display = 'block';
        this.elements.leaderboardEmpty.style.display = 'none';
    }
    
    showLeaderboardEmpty() {
        this.elements.leaderboardLoading.style.display = 'none';
        this.elements.leaderboardError.style.display = 'none';
        this.elements.leaderboardTable.style.display = 'none';
        this.elements.leaderboardEmpty.style.display = 'block';
    }
    
    switchChain(chainType) {
        if (chainType === this.currentChain) return;
        
        this.currentChain = chainType;
        
        // Update button states
        this.elements.chainToggleBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        const activeBtn = document.querySelector(`[data-chain="${chainType}"]`);
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');
        
        // Update leaderboard
        this.updateLeaderboard();
        
        // Hide winner display when switching chains
        this.elements.winnerDisplay.style.display = 'none';
    }
    
    async runLuckyDraw() {
        if (this.isDrawRunning) return;
        
        this.isDrawRunning = true;
        this.setDrawButtonLoading(true);
        this.hideWinnerDisplay();
        
        // Start address cycling animation
        this.startAddressCycling();
        
        try {
            // Add some suspense with a delay
            await this.delay(2000);
            
            const response = await fetch('/api/run-lottery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ chainType: this.currentChain })
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                this.displayWinner(result);
                this.createConfetti();
            } else {
                throw new Error(result.message || 'Failed to run lucky draw');
            }
        } catch (error) {
            console.error('Error running lucky draw:', error);
            this.showError('Failed to run lucky draw. Please try again.');
        } finally {
            this.isDrawRunning = false;
            this.setDrawButtonLoading(false);
            this.stopAddressCycling();
        }
    }
    
    setDrawButtonLoading(loading) {
        if (loading) {
            this.elements.btnText.style.display = 'none';
            this.elements.btnLoading.style.display = 'flex';
            this.elements.luckyDrawBtn.disabled = true;
        } else {
            this.elements.btnText.style.display = 'inline';
            this.elements.btnLoading.style.display = 'none';
            this.elements.luckyDrawBtn.disabled = false;
        }
    }
    
    displayWinner(result) {
        const { winner, drawStats } = result;
        
        // Update winner information
        this.elements.winnerAddress.textContent = this.formatAddress(winner.address);
        this.elements.winnerPoints.textContent = `${this.formatNumber(winner.points)} points`;
        this.elements.winnerTier.textContent = winner.tier;
        this.elements.winProbability.textContent = drawStats.winProbability;
        this.elements.totalParticipants.textContent = drawStats.totalParticipants;
        this.elements.chainType.textContent = drawStats.chainType.toUpperCase();
        
        // Show winner display
        this.elements.winnerDisplay.style.display = 'block';
        
        // Scroll to winner display
        this.elements.winnerDisplay.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    hideWinnerDisplay() {
        this.elements.winnerDisplay.style.display = 'none';
    }
    
    createConfetti() {
        const colors = ['#48bb78', '#4299e1', '#f6ad55', '#f56565', '#9f7aea'];
        const confettiCount = 100;
        
        // Clear existing confetti
        this.elements.confettiContainer.innerHTML = '';
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            
            this.elements.confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            this.elements.confettiContainer.innerHTML = '';
        }, 6000);
    }
    
    showError(message) {
        // Create temporary error notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f56565;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            font-weight: 600;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
    
    formatAddress(address) {
        if (this.currentChain === 'evm') {
            return `${address.slice(0, 6)}...${address.slice(-4)}`;
        } else {
            return `${address.slice(0, 4)}...${address.slice(-4)}`;
        }
    }
    
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    startAddressCycling() {
        if (!this.leaderboardData || !this.leaderboardData[this.currentChain]) return;
        
        const participants = this.leaderboardData[this.currentChain];
        const addressCycler = document.querySelector('.address-cycler');
        let currentIndex = 0;
        
        // Add some excitement with emojis
        const emojis = ['🎯', '🎲', '⭐', '🚀', '💫', '🌟', '✨', '🎉'];
        let emojiIndex = 0;
        
        this.addressCyclingInterval = setInterval(() => {
            if (currentIndex >= participants.length) {
                currentIndex = 0;
                emojiIndex = (emojiIndex + 1) % emojis.length;
            }
            
            const participant = participants[currentIndex];
            const formattedAddress = this.formatAddress(participant.address);
            const emoji = emojis[emojiIndex];
            
            // Only show the address with an emoji
            addressCycler.textContent = `${emoji} ${formattedAddress}`;
            addressCycler.style.background = this.getRandomColor();
            
            currentIndex++;
        }, 150); // Slightly slower for better readability
    }
    
    stopAddressCycling() {
        if (this.addressCyclingInterval) {
            clearInterval(this.addressCyclingInterval);
            this.addressCyclingInterval = null;
        }
        
        // Reset to default state
        const addressCycler = document.querySelector('.address-cycler');
        if (addressCycler) {
            addressCycler.textContent = '🎯';
            addressCycler.style.background = 'rgba(255, 255, 255, 0.2)';
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(102, 126, 234, 0.8)',   // Blue
            'rgba(72, 187, 120, 0.8)',    // Green
            'rgba(246, 173, 85, 0.8)',    // Orange
            'rgba(245, 101, 101, 0.8)',   // Red
            'rgba(159, 122, 234, 0.8)',   // Purple
            'rgba(66, 153, 225, 0.8)',    // Light Blue
            'rgba(237, 137, 54, 0.8)',    // Dark Orange
            'rgba(34, 197, 94, 0.8)'      // Light Green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if all required elements exist
    const requiredElements = [
        'apiStatus', 'luckyDrawBtn', 'winnerDisplay', 'leaderboardLoading',
        'leaderboardError', 'leaderboardTable', 'leaderboardBody', 'refreshBtn'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
        console.error('Missing required elements:', missingElements);
        return;
    }
    
    // Initialize the application
    window.nansenLuckyDraw = new NansenLuckyDraw();
    
    // Add some helpful console messages
    console.log('🎯 Nansen Points Lucky Draw initialized!');
    console.log('💡 Tips:');
    console.log('   - Press Space/Enter to run lucky draw');
    console.log('   - Press R to refresh leaderboard');
    console.log('   - Press 1 for EVM, 2 for Solana');
    console.log('   - Use Tab to navigate between elements');
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 Page loaded in ${loadTime}ms`);
    }
});

// Error boundary
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // You could send this to an error reporting service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});


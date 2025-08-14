#!/bin/bash

# 🚀 Nansen Points Lucky Draw - Deployment Script
# This script helps deploy the application to various hosting platforms

set -e

echo "🎯 Nansen Points Lucky Draw - Deployment Script"
echo "================================================"

# Check if we're in the right directory
if [ ! -f "server.js" ] || [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to deploy to Heroku
deploy_heroku() {
    echo "🚀 Deploying to Heroku..."
    
    # Check if Heroku CLI is installed
    if ! command -v heroku &> /dev/null; then
        echo "❌ Heroku CLI not found. Please install it first:"
        echo "   https://devcenter.heroku.com/articles/heroku-cli"
        exit 1
    fi
    
    # Create Heroku app if it doesn't exist
    if ! heroku apps:info &> /dev/null; then
        echo "📱 Creating new Heroku app..."
        heroku create
    fi
    
    # Set environment variables
    echo "🔧 Setting environment variables..."
    heroku config:set NODE_ENV=production
    
    # Deploy
    echo "📤 Deploying to Heroku..."
    git push heroku main
    
    echo "✅ Deployment complete! Your app is available at:"
    heroku info -s | grep web_url | cut -d= -f2
}

# Function to deploy to Railway
deploy_railway() {
    echo "🚂 Deploying to Railway..."
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        echo "❌ Railway CLI not found. Please install it first:"
        echo "   npm install -g @railway/cli"
        exit 1
    fi
    
    # Login to Railway
    echo "🔐 Logging into Railway..."
    railway login
    
    # Deploy
    echo "📤 Deploying to Railway..."
    railway up
    
    echo "✅ Deployment complete!"
}

# Function to deploy to Render
deploy_render() {
    echo "🎨 Deploying to Render..."
    
    echo "📋 To deploy to Render:"
    echo "1. Go to https://render.com"
    echo "2. Create a new Web Service"
    echo "3. Connect your GitHub repository"
    echo "4. Set the following:"
    echo "   - Build Command: npm install"
    echo "   - Start Command: npm start"
    echo "   - Environment: Node"
    echo "5. Deploy!"
    
    echo "✅ Render deployment instructions provided!"
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "⚡ Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo "❌ Vercel CLI not found. Please install it first:"
        echo "   npm install -g vercel"
        exit 1
    fi
    
    # Deploy
    echo "📤 Deploying to Vercel..."
    vercel --prod
    
    echo "✅ Deployment complete!"
}

# Function to create production build
build_production() {
    echo "🔨 Creating production build..."
    
    # Install production dependencies
    echo "📦 Installing production dependencies..."
    npm ci --only=production
    
    # Create deployment package
    echo "📦 Creating deployment package..."
    mkdir -p dist
    cp -r public server.js package.json README.md LICENSE dist/
    
    echo "✅ Production build created in 'dist/' directory"
    echo "📁 Contents:"
    ls -la dist/
}

# Function to show deployment options
show_options() {
    echo ""
    echo "🎯 Available deployment options:"
    echo "1) Heroku - Easy deployment with Git integration"
    echo "2) Railway - Modern deployment platform"
    echo "3) Render - Simple web service deployment"
    echo "4) Vercel - Fast frontend deployment"
    echo "5) Production build - Create deployment package"
    echo "6) Show all options"
    echo ""
    echo "💡 Tip: For production deployment, consider:"
    echo "   - Setting up environment variables"
    echo "   - Configuring custom domains"
    echo "   - Setting up monitoring and logging"
    echo "   - Implementing CI/CD pipelines"
}

# Main script
case "${1:-}" in
    "heroku")
        deploy_heroku
        ;;
    "railway")
        deploy_railway
        ;;
    "render")
        deploy_render
        ;;
    "vercel")
        deploy_vercel
        ;;
    "build")
        build_production
        ;;
    "help"|"-h"|"--help")
        show_options
        ;;
    *)
        echo "🎯 Nansen Points Lucky Draw - Deployment Script"
        echo "================================================"
        echo ""
        echo "Usage: $0 [option]"
        echo ""
        show_options
        echo ""
        echo "Example: $0 heroku    # Deploy to Heroku"
        echo "Example: $0 build     # Create production build"
        echo ""
        echo "For more information, visit:"
        echo "https://github.com/askeluv/nansen-points-lucky-draw"
        ;;
esac

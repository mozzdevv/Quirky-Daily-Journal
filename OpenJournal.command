#!/bin/bash

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "🌿 Starting Quirky Daily Journal..."

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (first run only)..."
    if command -v pnpm &> /dev/null; then
        pnpm install
    else
        npm install
    fi
fi

# Start the app and open the browser automatically
# We use --open to tell Vite to launch the default browser
if command -v pnpm &> /dev/null; then
    pnpm dev --open
else
    npm run dev -- --open
fi

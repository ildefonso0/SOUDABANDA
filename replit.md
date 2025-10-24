# SOUDABANDA - Expo React Native Web App

## Overview
This is an Expo React Native application configured to run on the web in the Replit environment. The project uses Expo Router for navigation and supports web deployment with React Native Web.

## Project Setup
- **Framework**: Expo 54 with React Native 0.81
- **Language**: TypeScript
- **Bundler**: Metro (Expo's built-in bundler)
- **UI Framework**: React Native with React Native Web
- **Navigation**: Expo Router (file-based routing)
- **Build System**: Expo CLI

## Key Files
- `app/index.tsx` - Main home screen
- `app/_layout.tsx` - Root layout with navigation setup
- `app/+not-found.tsx` - 404 page
- `babel.config.js` - Babel configuration for Expo
- `metro.config.js` - Metro bundler configuration with cache control
- `app.json` - Expo app configuration

## Development
The app runs on port 5000 with the following configuration:
- **Host**: LAN (allows Replit proxy to work correctly)
- **Port**: 5000 (required for Replit)
- **Cache Control**: Disabled to ensure updates are visible

### Commands
- `npm run web` - Start the development server on port 5000
- `npm run build:web` - Build for production web deployment
- `npm run lint` - Run linter
- `npm run typecheck` - Check TypeScript types

## Deployment
The project is configured for Replit deployment with:
- **Build**: `npm run build:web` (exports to `dist/` folder)
- **Run**: Serves the static build using `serve`
- **Target**: Autoscale (stateless web app)

## Dependencies
Main dependencies include:
- expo, expo-router, expo-status-bar
- react, react-dom, react-native, react-native-web
- @react-navigation/native, @react-navigation/bottom-tabs
- @supabase/supabase-js (for potential backend integration)
- lucide-react-native (icons)
- Various Expo modules (camera, font, blur, etc.)

## Recent Changes (October 24, 2025)
- Created from GitHub import
- Added `babel.config.js` for Expo
- Created `app/index.tsx` home screen
- Configured Metro bundler with cache control
- Set up web workflow on port 5000 with LAN host
- Configured deployment for production
- Project is now fully functional in Replit environment

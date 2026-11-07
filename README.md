# GymApp — Universal Discovery & Pass Portal (Web, Android, iOS)

Universal cross-platform application for GymApp marketplace discovery, search engine optimization (SEO), transparent pricing comparison, and online pass checkout. Runs on **Web**, **Android**, and **iOS** from a single codebase with an adaptive UI.

Built with **Expo SDK 52**, **React Native 0.76**, **Expo Router v4**, **NativeWind v4**, **Zustand**, and **TypeScript**.

## Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Expo Go / Android Studio / Xcode (optional for native simulators)

## Quick Start
```bash
# Navigate to this folder
cd apps/web

# Install dependencies
npm install --legacy-peer-deps

# Start local web development server
npm run web

# Start on Android emulator or connected device
npm run android

# Start on iOS simulator
npm run ios
```

## Running Tests & Verification
```bash
# Run unit tests via Jest-Expo
npm test

# Run TypeScript compiler check
npx tsc --noEmit
```

## Production Builds & Export
```bash
# Export static web build into dist/
npm run build
# or: npx expo export -p web

# Export native bundles
npx expo export -p android
npx expo export -p ios

# Build cloud binaries using EAS Build
eas build --platform android --profile preview
eas build --platform ios --profile preview
```

## Adaptive UI Architecture
- **Phone (`< 768px`)**: Bottom tab bar, 1-column gym cards, full-width search, 44px+ touch targets, modal bottom sheets.
- **Tablet (`768px - 1199px`)**: 2-column gym grid, responsive top/side navigation bar.
- **Desktop (`>= 1200px`)**: 3-column gym grid, top navigation header with user avatar, max-w-7xl centered container, sticky desktop pricing card.

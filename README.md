# GymApp — Universal Discovery & Pass Portal (Web, Android, iOS)

Universal cross-platform application for GymApp marketplace discovery, search engine optimization (SEO), transparent pricing comparison, and online pass checkout. Runs on **Web**, **Android**, and **iOS** from a single codebase with an adaptive UI.

Built with **Expo SDK 58**, **React Native 0.88**, **React 19**, **Expo Router v4**, **NativeWind v4**, **Zustand**, and **TypeScript**.

## Prerequisites
- Node.js >= 18.0.0 (Node 20+ or 24 recommended)
- npm >= 9.0.0
- Expo CLI (`npx expo`) & EAS CLI (`npm install -g eas-cli`)
- Java Development Kit (JDK 17, e.g. OpenJDK / Eclipse Temurin 17) for Android
- Android SDK (API 34–37, Build Tools 35.0.0 / 37.0.0, NDK 27.1) for local Android builds
- macOS with Xcode >= 16 for local iOS builds (Windows cannot build iOS locally)

## Quick Start
```bash
# Navigate to this folder
cd apps/web

# Install dependencies if not already done
npm install

# Start development server on local network (standard LAN mode)
npx expo start

# If on different networks or cellular data (Ngrok tunnel)
npm run tunnel
# or: npx expo start --tunnel ngrok

# If using Expo Cloud Tunnel (requires free Expo login)
npx expo login
npx expo start --tunnel

# Start local web development in browser
npm run web

# Start on Android emulator or connected device via ADB
npm run android

# Start on iOS simulator (macOS only)
npm run ios
```

## Running Tests & Verification
```bash
# Run unit tests via Jest-Expo
npm test -- --watchAll=false

# Run TypeScript compiler check
npx tsc --noEmit
```

---

## Build Commands

### 1. Web

#### Development (Browser)
- **Command**:
  ```bash
  npm run dev
  # or: npm run web
  # or: npx expo start --web
  ```
- **Prerequisites**: Node.js >= 18.0.0, npm dependencies installed (`npm install`).
- **Output / Port**: Runs a live Metro dev server with Fast Refresh accessible at `http://localhost:8081`.

#### Production Export (Static Site)
- **Command**:
  ```bash
  npm run build
  # or: npx expo export -p web
  ```
- **Prerequisites**: Node.js >= 18.0.0.
- **Output Location**: `dist/` directory in the project root. Contains all pre-rendered static HTML routes, compiled JavaScript bundles (`_expo/static/js/web/`), CSS (`_expo/static/css/`), fonts, and static assets ready to host on any CDN/static web host (Netlify, Vercel, S3, Cloudflare Pages, or Nginx).

#### Local Preview of Production Build
- **Command**:
  ```bash
  npx serve dist
  # or: npx http-server dist -p 8080
  ```
- **Prerequisites**: Node.js >= 18.0.0, existing `dist/` export.
- **Output / Port**: Serves the optimized production bundles locally at `http://localhost:3000` (or `http://localhost:8080`) to verify routing, SEO metadata, and production behavior before deploying.

---

### 2. Android

The native Android project is pre-configured and located in the `android/` directory (`package: com.gymapp.app`).

#### Development (Emulator or Physical Device via ADB)
- **Command**:
  ```bash
  npm run android
  # or: npx expo run:android
  ```
- **Prerequisites**:
  - Node.js >= 18.0.0
  - JDK 17 (set in `JAVA_HOME`)
  - Android SDK with platform-tools added to `PATH`
  - Connected Android device with USB debugging enabled (`adb devices`) or an active Android Virtual Device (AVD).
- **Output**: Builds the debug APK and installs it directly onto the connected emulator/device, then launches the app connected to Metro.

#### Release APK (Local Standalone Binary on Windows, macOS, Linux)
- **Command**:
  ```bash
  # Cross-platform npm script (works on Windows, macOS, Linux)
  npm run build:android
  # or: npm run build:android:apk

  # Direct Gradle invocation (PowerShell / Windows CMD):
  cd android && .\gradlew.bat assembleRelease --no-daemon && cd ..

  # Direct Gradle invocation (macOS / Linux):
  cd android && ./gradlew assembleRelease --no-daemon && cd ..
  ```
- **Prerequisites**:
  - Node.js >= 18.0.0
  - JDK 17 (`java -version` should report 17.x)
  - Android SDK configured (via `ANDROID_HOME` or `android/local.properties` pointing to `sdk.dir=...`)
- **Output Location**:
  - Primary Gradle build artifact: `android/app/build/outputs/apk/release/app-release.apk`
  - Root distribution copy: `./GymApp.apk` (copied automatically by `npm run build:android`)

#### Release AAB (Android App Bundle for Google Play Store)
- **Command**:
  ```bash
  # Cross-platform npm script (works on Windows, macOS, Linux)
  npm run build:android:aab

  # Direct Gradle invocation (PowerShell / Windows CMD):
  cd android && .\gradlew.bat bundleRelease --no-daemon && cd ..

  # Direct Gradle invocation (macOS / Linux):
  cd android && ./gradlew bundleRelease --no-daemon && cd ..
  ```
- **Prerequisites**:
  - Same local prerequisites as Release APK (JDK 17, Android SDK).
  - For store deployment: Production signing keystore configured in `android/app/build.gradle` or enrolled in Google Play App Signing.
- **Output Location**:
  - `android/app/build/outputs/bundle/release/app-release.aab`

#### EAS Cloud Build Alternative (Cross-Platform / Cloud)
EAS Build builds native binaries in the cloud without needing local Android SDK/NDK installations.

The profiles configured in `eas.json` are:
1. **Preview APK (Internal distribution / testing)**:
   ```bash
   eas build --platform android --profile preview
   ```
   *Output*: Standalone installable `.apk` file (`buildType: "apk"`).
2. **Production AAB (Google Play Store release)**:
   ```bash
   eas build --platform android --profile production
   ```
   *Output*: Optimized Google Play `.aab` bundle.
3. **Development Client APK**:
   ```bash
   eas build --platform android --profile development
   ```
   *Output*: Debug development client APK with Expo DevTools.
- **Prerequisites**:
  - EAS CLI installed: `npm install -g eas-cli`
  - Expo account authenticated: `eas login`
- **Output Location**: Download link on the Expo dashboard and direct download via EAS CLI CLI prompt upon completion.

---

### 3. iOS

> **Important Windows Limitation**: iOS native binaries **cannot** be compiled locally on Windows. Apple requires macOS with Xcode, the Apple clang toolchain, and CocoaPods to build native iOS binaries.

#### Current Configuration & Missing `ios/` Directory
- The bundle identifier is configured in `app.json`: `com.gymapp.app`.
- The native `ios/` directory is **not currently generated** in the repository because this project uses Expo Continuous Native Generation (CNG).
- **To generate the native iOS project on macOS**, run:
  ```bash
  npx expo prebuild --platform ios
  ```
  *This creates the `ios/` directory, `GymApp.xcworkspace`, and executes `pod install`.*

#### Local Build & Run (macOS Only)
- **Prerequisites**:
  - macOS (Sonoma 14+ or Sequoia 15+)
  - Xcode >= 16 (installed with Command Line Tools: `xcode-select --install`)
  - CocoaPods: `sudo gem install cocoapods`
  - Node.js >= 18.0.0
- **Commands**:
  1. Generate native iOS workspace (run once or after native config changes):
     ```bash
     npx expo prebuild --platform ios
     ```
  2. Run Release build on connected iPhone / iPad:
     ```bash
     npx expo run:ios --configuration Release
     ```
  3. Run Debug build on iOS Simulator:
     ```bash
     npm run ios
     # or: npx expo run:ios
     ```
- **Output Location**:
  - Xcode build products in `ios/build/` and compiled `.app` bundle installed directly onto the simulator/device.

#### EAS Cloud Build for iOS (Recommended from Windows or macOS)
Using EAS Build, iOS builds can be created from Windows without owning a Mac.

The profiles configured in `eas.json` are:
1. **Simulator Build (for testing in Mac iOS Simulator)**:
   ```bash
   eas build --platform ios --profile development
   ```
   *Output*: `.tar.gz` archive containing the simulator `.app` build (`simulator: true`).
2. **Preview Build (Internal Ad-Hoc / Enterprise distribution)**:
   ```bash
   eas build --platform ios --profile preview
   ```
   *Output*: Ad-hoc `.ipa` for registered device UUIDs.
3. **Production Build (Apple TestFlight & App Store release)**:
   ```bash
   eas build --platform ios --profile production
   ```
   *Output*: Production `.ipa` ready for App Store submission via `eas submit --platform ios`.

- **Prerequisites for iOS Cloud Builds**:
  - EAS CLI: `npm install -g eas-cli`
  - Expo account: `eas login`
  - Active Apple Developer Account membership ($99/year required for device distribution and App Store releases)
  - Apple credentials: EAS can automatically manage Distribution Certificates, Provisioning Profiles, and Push Notification credentials via Apple ID login during the build prompt.
  - Bundle Identifier: `com.gymapp.app` (already defined in `app.json`).
- **Output Location**: EAS dashboard build page with downloadable `.ipa` / `.tar.gz` and automatic TestFlight upload via EAS Submit.

---

## Build Commands Summary Table

| Platform | Build Type | Command | Output Location | Prerequisites |
| :--- | :--- | :--- | :--- | :--- |
| **Web** | Development (Dev Server) | `npm run web` *(or `npm run dev`)* | `http://localhost:8081` | Node.js >= 18 |
| **Web** | Production Static Export | `npm run build:web` *(or `npm run build`)* | `dist/` | Node.js >= 18 |
| **Web** | Local Production Preview | `npm run preview:web` *(or `npx serve dist`)* | `http://localhost:3000` | Node.js >= 18, `dist/` |
| **Android** | Local Dev (Emulator / ADB) | `npm run android` *(or `npx expo run:android`)* | Installed directly on device | Node >= 18, JDK 17, Android SDK |
| **Android** | Local Release APK (Cross-Platform) | `npm run build:android` *(or `npm run build:android:apk`)* | `android/app/build/outputs/apk/release/app-release.apk` *(copied to `./GymApp.apk`)* | Node >= 18, JDK 17, Android SDK |
| **Android** | Local Release AAB (Play Store) | `npm run build:android:aab` | `android/app/build/outputs/bundle/release/app-release.aab` | Node >= 18, JDK 17, Android SDK |
| **Android** | EAS Cloud Preview APK | `npm run build:android:eas` *(or `eas build -p android --profile preview`)* | EAS Dashboard / Download link | EAS CLI, `eas login` |
| **Android** | EAS Cloud Production AAB | `npm run build:android:prod` *(or `eas build -p android --profile production`)* | EAS Dashboard / Play Store submit | EAS CLI, `eas login` |
| **iOS** | Prebuild Native Project | `npm run prebuild:ios` *(or `npx expo prebuild --platform ios`)* | Generates `ios/` folder *(macOS only)* | Node >= 18, macOS, Xcode |
| **iOS** | Local Release (macOS only) | `npm run build:ios:local` | `ios/build/` / Installed on device | macOS, Xcode >= 16, CocoaPods |
| **iOS** | EAS Cloud Simulator Build | `npm run build:ios:sim` | EAS Dashboard (`.tar.gz`) | EAS CLI, `eas login` |
| **iOS** | EAS Cloud Preview IPA | `npm run build:ios` | EAS Dashboard (`.ipa`) | EAS CLI, `eas login` |
| **iOS** | EAS Cloud Production IPA | `npm run build:ios:prod` | EAS Dashboard (`.ipa`) / TestFlight | EAS CLI, Apple Developer Account |

---

## Adaptive UI Architecture
- **Phone (`< 768px`)**: Bottom tab bar, 1-column gym cards, full-width search, 44px+ touch targets, modal bottom sheets.
- **Tablet (`768px - 1199px`)**: 2-column gym grid, responsive top/side navigation bar.
- **Desktop (`>= 1200px`)**: 3-column gym grid, top navigation header with user avatar, max-w-7xl centered container, sticky desktop pricing card.

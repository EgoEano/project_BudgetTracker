# miniBudget

A cross-platform budget tracking application built with React Native for mobile (Android & iOS) and React Native Web for browser support.

## 📋 Overview

**miniBudget** is a modern, lightweight budget management application that helps users track their income and expenses across multiple categories. The application features a clean, intuitive interface and works seamlessly across web and mobile platforms.

## ✨ Features

- 📊 **Transaction Management** - Add, view, and delete financial transactions
- 🏷️ **Category Organization** - Organize transactions with customizable categories
- 💰 **Budget Tracking** - Monitor your spending and income
- 🎨 **Modern UI** - Clean, responsive interface with platform-specific optimizations
- 🔄 **Cross-Platform** - Single codebase for Web, Android, and iOS
- 💾 **Persistent Storage** - AsyncStorage for mobile, localStorage for web
- 🧭 **Seamless Navigation** - React Navigation for mobile, React Router for web

## 🛠️ Tech Stack

### Core
- **React Native** 0.82.1 - Mobile framework
- **React** 19.1.1 - UI library
- **TypeScript** - Type-safe development
- **React Native Web** - Web compatibility layer

### State Management
- **Redux Toolkit** - Global state management
- **React Redux** - React bindings for Redux

### Navigation
- **React Navigation** - Mobile navigation (Native Stack, Bottom Tabs, Drawer)
- **React Router DOM** - Web routing

### Storage
- **AsyncStorage** - Mobile persistent storage
- **localStorage** - Web storage (via platform adapters)

### Build Tools
- **Metro** - React Native bundler
- **Webpack** - Web bundler
- **Babel** - JavaScript transpiler

## 📁 Project Structure

```
miniBudget/
├── client/                  # Application source code
│   ├── app/                # App entry points and initialization
│   ├── core/               # Core utilities, services, and providers
│   └── modules/            # Feature modules
│       └── miniBudget/     # Budget tracking module
│           ├── components/ # Reusable UI components
│           ├── screens/    # Screen components (Home, Settings, etc.)
│           ├── store/      # Redux slices
│           ├── hooks/      # Custom React hooks
│           ├── theme/      # Theming and styles
│           └── utils/      # Utility functions
├── android/                # Android native code
├── ios/                    # iOS native code
├── public/                 # Web static assets
└── __tests__/              # Test files
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20
- **npm** or **yarn**
- For iOS development: Xcode and CocoaPods
- For Android development: Android Studio and SDK

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. For iOS (Mac only), install CocoaPods dependencies:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

## 🎯 Running the Application

### Web Development

Start the development server:

```bash
npm run web:start:dev
# or use the batch file
_web_start_dev.bat
```

The app will be available at `http://localhost:8080`

### Mobile - Android

Start Metro bundler (in one terminal):

```bash
npm start
```

Run on Android (in another terminal):

```bash
npm run mobile:android:start:dev
# or use the batch file
_mobile_android_start_dev.bat
```

### Mobile - iOS

Start Metro bundler (in one terminal):

```bash
npm start
```

Run on iOS (in another terminal):

```bash
npm run mobile:ios:start:dev
# or use the batch file
_mobile_ios_start_dev.bat
```

## 🔨 Building for Production

### Web Production Build

```bash
npm run web:build:prod
# or use the batch file
_web_build_prod.bat
```

### Android Production Build

```bash
# or use the batch file
_mobile_android_build_prod.bat
```

## 🧪 Testing

Run tests with Jest:

```bash
npm test
```

## 📝 Development Scripts

- `npm run web:start:dev` - Start web development server
- `npm run web:build:dev` - Build web app (development)
- `npm run web:build:prod` - Build web app (production)
- `npm run mobile:android:start:dev` - Run Android app
- `npm run mobile:ios:start:dev` - Run iOS app
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🏗️ Architecture

The application follows a modular architecture with:

- **Platform Adapters** - Unified APIs for platform-specific features (navigation, storage)
- **Service Providers** - Centralized services (storage, theme, notifications)
- **Redux Store** - Centralized state management
- **Module-based Structure** - Feature-based code organization

## 🎨 Theming

The app uses a centralized theming system with support for:
- Custom color palettes
- Responsive spacing
- Platform-specific styles

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

This project is private and for portfolio purposes.

---

## � Android APK/AAB Size Optimization

The project includes optimizations to reduce Android release build sizes by 40-60% through ProGuard/R8 minification, resource shrinking, and APK splits.

### Already Configured

The following optimizations are already set up in `android/app/build.gradle`:

1. **ProGuard/R8 Minification** - Code shrinking and obfuscation
2. **Resource Shrinking** - Removes unused resources
3. **APK Splits** - Separate APK per architecture (only for `assembleRelease`)
4. **Hermes Engine** - Enabled by default in `android/gradle.properties`

### Build Commands

#### APK Build (with splits)
Generates separate APK files for each architecture:

```bash
cd android
gradlew clean assembleRelease
```

Output location: `android/app/build/outputs/apk/release/`
- `app-arm64-v8a-release.apk` (modern devices)
- `app-armeabi-v7a-release.apk` (older devices)
- `app-x86-release.apk` (emulators)
- `app-x86_64-release.apk` (emulators)

#### AAB Build (for Google Play)
Generates a single Android App Bundle:

```bash
cd android
gradlew clean bundleRelease
```

Output location: `android/app/build/outputs/bundle/release/app-release.aab`

> **Note**: APK splits are automatically disabled for AAB builds as Google Play handles per-device optimization.

### Manual Setup (if not configured)

If you need to set up these optimizations manually:

#### 1. Edit `android/app/build.gradle`

Add ProGuard configuration in `buildTypes.release`:

```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro"
    }
}
```

Add APK splits (between `defaultConfig` and `signingConfigs`):

```gradle
splits {
    abi {
        reset()
        // Only enable for assembleRelease, disable for bundleRelease
        enable !gradle.startParameter.taskNames.any { it.contains("bundle") }
        universalApk false
        include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
    }
}
```

Disable unused build features:

```gradle
buildFeatures {
    buildConfig = false
}
```

#### 2. Configure `android/app/proguard-rules.pro`

Add React Native and library-specific ProGuard rules (see file for complete configuration).

#### 3. Verify Hermes is enabled

Check `android/gradle.properties`:

```properties
hermesEnabled=true
```

### Expected Results

- **APK Size Reduction**: 40-60% smaller than non-optimized builds
- **Separate APKs**: Each architecture-specific APK is smaller than a universal APK
- **AAB Benefits**: Google Play automatically delivers optimized APKs to users

### Testing Optimized Builds

1. Install architecture-specific APK on a device:
   ```bash
   adb install android/app/build/outputs/apk/release/app-arm64-v8a-release.apk
   ```

2. Verify all app features work correctly after ProGuard optimization

3. Compare file sizes before and after optimization


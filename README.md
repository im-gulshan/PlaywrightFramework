# 🎭 Playwright Test Automation Framework

## 🌟 Overview
A robust test automation framework powered by Playwright, TypeScript, and Cucumber for end-to-end testing, specializing in SauceDemo testing.

## 🛠️ Tech Stack
- 🎭 Playwright
- 📘 TypeScript
- 🥒 Cucumber (BDD)
- 💻 Node.js
- 👨‍💻 Visual Studio Code

## 📁 Project Structure
```
PlaywrightFramework/
├── 📂 features/                # Cucumber feature files
│   └── 📂 SauceDemo_UI/       # SauceDemo specific features
├── 📂 src/
│   ├── 📂 pages/              # Page Object Models
│   ├── 📂 setup/              # Test setup and hooks
│   ├── 📂 steps/              # Step definitions
│   └── 📂 utils/              # Utility functions
├── 📂 screenshots/            # Test execution screenshots
├── 📂 test-results/          # Test execution results
├── 📂 playwright-report/     # Playwright HTML reports
└── 📂 config/                # Configuration files
```

## ⚙️ Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Visual Studio Code

## 🚀 Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

## 🔧 Configuration
The framework uses multiple configuration files:
- ⚙️ `playwright.config.ts` - Playwright settings
- 🥒 `cucumber.js` - Cucumber configuration
- 📘 `tsconfig.json` - TypeScript configuration

## ▶️ Running Tests
```bash
# Run all SauceDemo UI tests
npm run cucumber-test:SauceDemo-UI-Test

# Run specific features using tags
npm run test -- --tags "@SauceDemo-UI-Test"
```

## 📊 Test Reports
- 📈 HTML reports in `playwright-report/`
- 📸 Screenshots in `screenshots/`
- 📝 Execution logs in `playwright_log.txt`


## 💡 Best Practices
- ✍️ BDD Gherkin syntax for features
- 🏗️ Page Object Model pattern
- ♻️ Reusable step definitions
- 📸 Failure screenshots
- 📝 Detailed logging
- 🔄 Error handling with retries
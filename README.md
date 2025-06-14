# Playwright Test Automation Framework

A comprehensive end-to-end testing framework built with Playwright, Cucumber, and TypeScript.

## 🚀 Features

- Cross-browser testing support (Chrome, Firefox, Safari, Edge)
- Cucumber BDD integration
- TypeScript support
- Parallel test execution
- HTML and JSON reporting
- CSV, Excel, and XML file handling
- File compression/decompression utilities
- API testing capabilities

## 📋 Prerequisites

- Node.js (Latest LTS version)
- npm (comes with Node.js)
- Visual Studio Code (recommended)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PlaywrightFramework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 📁 Project Structure

```
PlaywrightFramework/
├── src/
│   ├── setup/
│   │   └── hooks.ts
│   ├── tests/
│   │   ├── features/    # Cucumber feature files
│   │   └── steps/       # Step definitions
│   ├── utilities/
│   │   └── commonMethods.ts
│   └── locators/
│       └── sauceDemoLocator.ts
├── test-results/        # Test reports and artifacts
├── ApplicationConfigs/  # Configuration files
├── cucumber.js         # Cucumber configuration
├── playwright.config.ts # Playwright configuration
└── package.json
```

## 🏃‍♂️ Running Tests

- Run all tests:
```bash
npm test
```

- Run tests in parallel:
```bash
npm run test:parallel
```

- Run specific features:
```bash
npm test features/specific-feature.feature
```

## 📊 Test Reports

- HTML reports are generated in `test-results/cucumber-report.html`
- JSON reports are available in `test-results/cucumber-report.json`
- Playwright trace files are captured on first retry of failed tests

## ⚙️ Configuration

- `playwright.config.ts`: Playwright settings and browser configurations
- `cucumber.js`: Cucumber test runner settings
- `envConfig.ts`: Environment-specific configurations

## 🔍 Key Features Explained

1. **Cross-Browser Testing**
   - Supports Chromium, Firefox, WebKit, Edge, and Chrome
   - Configurable browser settings per project

2. **Test Execution**
   - Parallel execution support
   - Configurable retries for CI environment
   - Customizable timeouts

3. **Utilities**
   - File operations (CSV, Excel, XML)
   - ZIP file handling
   - Logging mechanisms
   - File locking capabilities

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📝 License

This project is licensed under the ISC License.
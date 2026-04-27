# CoinbaseClone

A modern, high-fidelity React-based clone of the Coinbase platform, featuring a premium design system, responsive layouts, and a multi-step user onboarding flow.

## Key Features

- **Premium Design System**: Built with Tailwind CSS 4, featuring glassmorphism, smooth transitions, and a meticulously crafted dark-theme onboarding experience.
- **Sticky Navigation**: A persistent header with sophisticated mega-menus for "Individuals", "Businesses", "Institutions", "Developers", and "Company".
- **Dynamic Signup Flow**: A multi-step registration process starting with account type selection (**Personal**, **Business**, **Developer**) leading to a themed signup form.
- **Market Exploration**: A dedicated "Explore" page tracking 10+ major cryptocurrencies with real-time style data visualization.
- **Local Brand Assets**: Optimized performance using local SVG and PNG brand icons for all major cryptocurrencies and interface elements.
- **Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.

## Tech Stack

- **Core**: React  (JavaScript)
- **Bundler**: Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **Icons**: Lucide React & Custom Brand SVGs
- **Animations**: Framer Motion

## Project Structure

```text
src/
├── assets/          # Brand images, SVGs, and crypto icons
├── components/      # Reusable UI components (Navbar, Footer, Hero, etc.)
│   ├── NavigationDropdown.jsx  # Complex mega-menu implementation
│   ├── CryptoTable.jsx         # Landing page market preview
│   └── ...
├── pages/           # Page-level components
│   ├── LandingPage.jsx         # The main entry point
│   ├── Explore.jsx             # Crypto market overview
│   ├── AccountSelection.jsx    # Multi-step signup portal
│   ├── SignupForm.jsx          # User registration
│   └── Login.jsx               # Authentication portal
├── App.jsx          # Routing configuration
└── main.jsx         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pintovictorkwame/Coinbase_clone.git
   ```
2. Navigate to the project directory:

   ```bash
   cd coinbaseclone
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

### Running Locally

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Design Philosophy

This project aims to replicate the premium feel of Coinbase by focusing on:

- **Typography**: Utilizing the Inter font family for a clean, modern look.
- **Micro-interactions**: Subtle hover effects and smooth transitions for interactive elements.
- **State-of-the-Art Aesthetic**: Using vibrant blues, deep blacks, and clean white spaces to create a professional financial platform vibe.

## License

This project is for educational/demonstration purposes as part of the Coinbase clone development project.

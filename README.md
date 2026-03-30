# CryptoHub – Advanced Crypto Dashboard

A modern and responsive cryptocurrency dashboard built using React.js, Tailwind CSS, and Framer Motion.
CryptoHub allows users to track real-time crypto prices, explore market trends, manage favorites, and interact with a smooth, animated user interface.

---

## Live Demo

https://crypto-dashboard-seven-liard.vercel.app/

---

## Overview

CryptoHub is a feature-rich cryptocurrency tracking web application designed with a clean and modern UI.
It delivers real-time data using external APIs and enhances user experience with smooth animations and intuitive navigation.

This project is built to demonstrate frontend development skills including API integration, state management, responsive design, and UI/UX best practices.

---

## Features

### Core Features

| Feature          | Description                      |
| ---------------- | -------------------------------- |
| Real-time Prices | Fetches live cryptocurrency data |
| Smart Search     | Search coins by name or symbol   |
| Market Table     | Displays top cryptocurrencies    |
| Price Indicators | Shows 24-hour gain/loss          |
| Multi-Currency   | Supports USD, INR, EUR           |

---

### User Features

| Feature           | Description                               |
| ----------------- | ----------------------------------------- |
| Favorites         | Add/remove coins (stored in localStorage) |
| Authentication    | Basic login/signup system                 |
| Protected Actions | Restricts features without login          |

---

### Advanced Features

| Feature             | Description                         |
| ------------------- | ----------------------------------- |
| Coin Navigation     | Navigate to detailed coin pages     |
| Crypto Info Section | Educational content with animations |
| Dynamic Filtering   | Flexible search and filtering       |
| Ticker              | Displays trending/top coins         |

---

### UI/UX Features

| Feature           | Description                  |
| ----------------- | ---------------------------- |
| Modern Design     | Gradient-based Web3 UI       |
| Glassmorphism     | Transparent blur cards       |
| Animations        | Framer Motion integration    |
| Scroll Effects    | Smooth transitions on scroll |
| Responsive Layout | Works on all devices         |

---

## Tech Stack

| Technology    | Purpose            |
| ------------- | ------------------ |
| React.js      | Frontend framework |
| Tailwind CSS  | Styling and layout |
| Framer Motion | Animations         |
| React Router  | Navigation         |
| CoinGecko API | Crypto data        |
| localStorage  | Data persistence   |

---

## Project Structure

```
cryptodash/
│
├── public/
│   ├── icon.png
│   ├── resume.pdf
│   └── vite.svg
│
├── src/
│   ├── assets/
│   ├── component/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CryptoInfo.jsx
│   │   └── CryptoTicker.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── CryptoBlogg.jsx
│   │   ├── CryptoGraph.jsx
│   │   ├── Favorites.jsx
│   │   ├── Loginpage.jsx
│   │   └── SignUp.jsx
│   │
│   ├── context/
│   │   ├── CoinContext.jsx
│   │   ├── NewsContext.jsx
│   │   └── Providers.jsx
│   │
│   ├── App.jsx
│   ├── Layout.jsx
│   ├── AuthLayout.jsx
│   ├── main.jsx
│   └── App.css
│
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Getting Started

### Clone the repository

```
git clone https://github.com/jafferafzalkhan/Crypto-Dashboard.git
cd Crypto-Dashboard
```

---

### Install dependencies

```
npm install
```

---

### Run the project

```
npm run dev
```

---

## Screenshots

You can add screenshots of your application here to showcase UI and features.

---

## Key Highlights

| Highlight          | Description                      |
| ------------------ | -------------------------------- |
| Clean Architecture | Well-structured and modular code |
| Smooth Animations  | Enhanced UI with Framer Motion   |
| Responsive Design  | Mobile-friendly layout           |
| Portfolio Project  | Suitable for showcasing skills   |

---

## Resume

The resume is available for download directly from the website footer.

---

## Author

Jaffer Afzal Khan

GitHub: https://github.com/jafferafzalkhan
LinkedIn: https://www.linkedin.com/in/jaffar-khan-50992b31a/

---

## Future Improvements

| Feature             | Description                   |
| ------------------- | ----------------------------- |
| Advanced Charts     | Add candlestick and analytics |
| Price Alerts        | Notification system           |
| AI Assistant        | Smart crypto insights         |
| Backend Integration | Secure authentication system  |

---

## License

This project is open-source and available under the MIT License.

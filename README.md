# ✈️ AeroDex - Website for an Aviation Nerd/AvGeek ✈️


## 📘 Overview
AeroDex is a comprehensive, modern web application for exploring and comparing commercial aviation data. Built with Next.js and Prisma, it serves as a detailed directory for aircraft families, variants, engines, and performance metrics, complete with advanced tools like a route calculator and AI-powered explanations.

## ✨ Features

* **Aircraft Directory:** Browse a rich database of commercial aircraft families (e.g., A320 Family etc.) and their specific variants.
* **Advanced Filtering & Search:** Filter aircraft by manufacturer (Airbus, Boeing, Embraer, ATR) or aircraft type (Narrow-body, Wide-body, Regional).
* **Detailed Specifications:** View in-depth metrics including dimensions, passenger capacity, cruising altitude, and range.
* **Engine Database:** Explore specific engine models (e.g., LEAP-1B, CFM56), their thrust ratings, bypass ratios, and the aircraft variants they power.
* **Interactive Tools:**
  * **Compare Tool:** Compare multiple aircraft variants or engines side-by-side.
  * **Route Calculator:** Calculate flight routes and estimate range viability based on specific aircraft performance capabilities.
* **AI Integration:** Leverage built-in AI tools (via the `ExplainButton` and AI API routes) to get simplified explanations of complex aviation terminology and metrics.

## 🛠 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Database & ORM:** [Prisma](https://www.prisma.io/) with SQLite (development)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)

## ⚙️ Steps To Run:
### ✅ Prerequisites

1. Node.js: Version 18.x or higher

2. A code editor like Visual Studio or Antigravity

### ▶️ Running the Project

1. Clone the repository (or download and unzip the project files).

2. Open a terminal or command prompt in the project's root folder

3. Installing Dependencies:
```bash
npm install
```
4. Set up the environment variables
Create a `.env` file in the root directory and add your database URL (and any required AI API keys):
```bash
DATABASE_URL="file:./dev.db"
# Add your AI provider API key here if required by the /api/ai routes
```
5. Run:
```bash
npm run dev
```
Open your browser and navigate to the local URL shown in the terminal (usually `http://localhost:3000` ).

## 📸Screenshots
### 🏠 Home Page 
<img width="1895" height="860" alt="image" src="https://github.com/user-attachments/assets/89a3aee0-3244-45dd-a254-bfe7c9ecc7dd" />
<img width="1895" height="862" alt="image" src="https://github.com/user-attachments/assets/707f6722-309d-417b-a9bb-4e03104ac244" />

### 🛫 Aircraft Page
<img width="1893" height="859" alt="image" src="https://github.com/user-attachments/assets/71416ceb-0aee-4e97-8b13-1d83f6c70894" />

### 🛠️ Engine Page
<img width="1898" height="860" alt="image" src="https://github.com/user-attachments/assets/86bddfad-0f05-4ef0-9c41-fcc1c73c239b" />

### 🆚 Compare Page
<img width="1896" height="853" alt="image" src="https://github.com/user-attachments/assets/2ce56061-13f8-41d2-951e-d99c27a6a736" />
<img width="1893" height="855" alt="image" src="https://github.com/user-attachments/assets/4052efa3-c2c1-4307-8754-8f994227400b" />

### 🗺️ Route Calculate Page
<img width="1893" height="856" alt="image" src="https://github.com/user-attachments/assets/25ff3650-047b-46f8-8a45-b135678ab657" />

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request if you'd like to improve the aircraft database, add new UI features, or fix bugs.

## ⚠️ Disclaimer

Please note that the aircraft specifications, engine data, and performance metrics provided in this application are for **informational and educational purposes only**. 

While every effort is made to ensure the accuracy of the database, aviation data is complex and subject to change. The information presented here may contain mistakes, errors, omissions, or outdated figures. **Do not use this data for real-world flight planning, engineering, or any critical operational purposes.** 

## 🧑‍💻About the Author

This Website (AeroDex) is developed by [Divy Lathiya](https://github.com/DivyLathiya) and with the help of an AI.

# 🎉Thank You for Visiting.🎉

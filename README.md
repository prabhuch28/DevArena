# DevArena

Welcome to **DevArena**, the ultimate platform for developers to sharpen their backend engineering skills in a competitive and interactive environment.

## 🚀 Overview

DevArena is a Next.js application designed to help developers practice coding challenges, visualize complex backend systems, and learn with the help of AI-powered tools. Whether you're preparing for an interview or just looking to improve your skills, DevArena provides the tools you need to succeed.

## ✨ Features

- **Coding Challenges**: Solve a variety of algorithmic challenges, from easy to hard, across different categories like Arrays, Stacks, and Dynamic Programming.
- **Live Duels**: Compete head-to-head against an AI opponent in real-time coding challenges.
- **Interactive Playground**: A drag-and-drop interface to design and visualize backend architectures and system logic.
- **Global Leaderboard**: See how you rank against other developers on the platform based on your XP.
- **Visual Tutorials**: Learn complex backend concepts through interactive tutorials and guides.
- **AI-Powered Tools**:
  - **AI Mentor**: Get Socratic hints and conceptual explanations when you're stuck on a problem.
  - **Code Summarizer**: Get a step-by-step execution summary of your code, inspired by Python Tutor.
  - **Code Story Generator**: Transform your code into a simple, engaging narrative.
  - **Code-to-Image**: Generate visual diagrams (like flowcharts or architecture diagrams) from your code snippets.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
- **Backend & Auth**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) (with Google's Gemini models)

## 📦 Getting Started

This project is set up to run in Firebase Studio.

1.  **Install Dependencies**: The project comes with all dependencies listed in `package.json`. They will be installed automatically.

2.  **Run the Development Server**: To start the development server, use the following command:
    ```bash
    npm run dev
    ```

3.  **Open the App**: Open [http://localhost:3000](http://localhost:3000) (or the port specified in your environment) to view the application in your browser.

## 📁 Project Structure

- **`src/app`**: Contains all the pages and layouts for the Next.js application, following the App Router structure.
  - **`src/app/(app)`**: Main application routes that require authentication.
  - **`src/app/login`** & **`src/app/signup`**: Authentication pages.
- **`src/components`**: Shared React components, including UI components from ShadCN.
- **`src/ai/flows`**: All Genkit AI flows are defined here. Each file typically represents a specific AI-powered feature.
- **`src/firebase`**: Firebase configuration, custom hooks (`useUser`, `useCollection`), and providers.
- **`src/lib`**: Utility functions and static data for the application.
- **`docs/backend.json`**: A blueprint of the app's data models and Firestore structure.

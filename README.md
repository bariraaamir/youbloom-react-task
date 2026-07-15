# Youbloom React Demo App

A simple React application built as a technical interview task. It includes a login page with phone number validation, a searchable list of users fetched from a public API, and a detail page for each user.

## Features

- **Login Page** – Phone number input with validation (must start with +254 and contain 9 digits after it). Uses mock login logic and redirects to the Main Page on success.
- **Main Page** – Fetches a list of users from JSONPlaceholder API, with a live search bar that filters by name. Clicking a user navigates to their Detail Page.
- **Detail Page** – Shows full details of the selected user, with a link back to the Main Page.

## Tech Stack

- React (functional components + hooks)
- React Router DOM
- Axios (API calls)
- Tailwind CSS (styling)
- Vitest + React Testing Library (unit testing)
- Vite (build tool)

## Project Structure

src/
├── components/ # Reusable UI components
├── pages/ # Login, MainPage, DetailPage
├── services/ # API calls (api.js)
├── App.jsx
└── main.jsx

## Getting Started

1. Clone the repository
   git clone <repo-url>
   cd youbloom-react-task

2. Install dependencies
   npm install

3. Run the development server
   npm run dev
   The app will be available at http://localhost:5173

4. Run tests
   npm run test

## Login Credentials (Mock)

Use any phone number in the format +254XXXXXXXXX (9 digits after +254), for example:
+254712345678

## Notes

- API used: JSONPlaceholder (https://jsonplaceholder.typicode.com) `/users` endpoint
- Login state is stored in localStorage
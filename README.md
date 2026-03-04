# Secure Anonymous College Grievance System (Frontend)

Modern React frontend for a secure anonymous grievance workflow with role-based dashboards.

## Features
- College email validation on registration
- Secure JWT storage in session-based storage
- Student dashboard with anonymous grievance submission, SLA countdown, and ratings
- Admin dashboard with filters, department assignment, status updates, escalation highlight, and suspension controls
- Protected routes and role-based navigation

## Project Structure
- src/pages
- src/components
- src/services
- src/context
- src/utils

## Getting Started
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`

## Backend
Backend lives in `backend/` using Node.js, Express, and MongoDB.

1. Install backend dependencies: `cd backend && npm install`
2. Copy `.env.example` to `.env` and update values
3. Start backend: `npm run dev`

## Environment
- VITE_API_URL (optional) points to backend API
- VITE_USE_MOCKS=true enables local mock data

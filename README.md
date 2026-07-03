
# Go Business Referral Dashboard

A production-ready React + Vite referral dashboard for Go Business. The app supports JWT authentication, protected dashboard routes, referral metrics, referral sharing, searchable and sortable referral records, client-side pagination, and referral detail pages.

## Tech Stack

- React 18
- Vite
- JavaScript
- React Router DOM
- Bootstrap
- Fetch API
- js-cookie

## Features

- Authentication with JWT cookie storage
- Protected routes for dashboard and referral details
- Logout with cookie removal
- Dashboard overview metrics
- Service summary table
- Referral link and referral code copy actions
- Referral search and sort using API query parameters
- Client-side pagination with 10 rows per page
- Referral details page
- Public 404 page
- Loading, error, empty, unauthorized, and not-found states
- Responsive Bootstrap layout with table overflow protection
- Vercel-ready SPA routing configuration

## Folder Structure

```txt
src/
  components/
    ErrorView/
      index.jsx
      index.css
    Footer/
      index.jsx
      index.css
    Loader/
      index.jsx
      index.css
    Navbar/
      index.jsx
      index.css
    Overview/
      index.jsx
      index.css
    ProtectedRoute/
      index.jsx
      index.css
    ReferralDetailsCard/
      index.jsx
      index.css
    ReferralTable/
      index.jsx
      index.css
    ServiceSummary/
      index.jsx
      index.css
    ShareReferral/
      index.jsx
      index.css
  context/
    AuthContext.jsx
  pages/
    Dashboard/
      index.jsx
      index.css
    Login/
      index.jsx
      index.css
    NotFound/
      index.jsx
      index.css
    ReferralDetails/
      index.jsx
      index.css
  utils/
    api.js
    auth.js
    constants.js
    referrals.js
  App.jsx
  main.jsx
  styles.css
```

## API

Base URL:

```txt
https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api
```

Authentication:

```txt
POST /auth/signin
```

Referrals:

```txt
GET /referrals
GET /referrals?id=<id>
```

Authenticated referral requests send:

```txt
Authorization: Bearer <jwt_token>
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

=======
# GoAssessment


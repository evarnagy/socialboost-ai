# SocialBoost AI - Thesis Application

This repository contains the source code of Erik Varnagy's thesis application.

## Release metadata
- Final branch (current): main
- Reference commit (current HEAD during finalization): 36cc77276cf77b8041ef4dbac520fe1b50641200
- Frontend URL: https://socialboost-ai-d44bc.web.app/
- API URL: https://socialboost-ai.onrender.com

## Project overview
SocialBoost AI is a content-assistant web app for small businesses.
It supports:
- profile-based content generation
- post idea and post text generation
- weekly planner generation
- image generation
- favorites and generated-content persistence in Firestore

## Tech stack
- Frontend: Angular
- Backend: Node.js + Express + TypeScript
- Auth and DB: Firebase Authentication + Firestore
- AI: OpenAI API

## Repository structure
- Frontend app: apps/web
- Backend API: apps/api
- Firestore rules: firestore.rules
- Firebase config: firebase.json

## Prerequisites
- Node.js 20+
- npm 11+
- Firebase CLI (for deploy)

## Environment variables

### Backend (apps/api/.env)
Create apps/api/.env from apps/api/.env.example.

Required/important keys:
- PORT
- USE_AI
- OPENAI_API_KEY
- OPENAI_MODEL
- CORS_ALLOWED_ORIGINS
- AI_RATE_LIMIT_WINDOW_MS
- AI_RATE_LIMIT_MAX
- FIREBASE_SERVICE_ACCOUNT_JSON (single-line JSON) OR GOOGLE_APPLICATION_CREDENTIALS

Production CORS allowlist example:
- CORS_ALLOWED_ORIGINS=https://socialboost-ai-d44bc.web.app,https://socialboost-ai-d44bc.firebaseapp.com

### Frontend runtime API base
Frontend uses:
- runtime override: window.__SOCIALBOOST_API_BASE__
- local fallback: http://localhost:8080 on localhost
- remote fallback: https://socialboost-ai.onrender.com

## Install, run, build, test

### 1) Frontend
Path: apps/web

- Install: npm install
- Start dev server: npm start
- Production build: npm run build
- Unit tests (watch): npm test
- Unit tests (CI, single run): npm run test:ci

### 2) API
Path: apps/api

- Install: npm install
- Start dev server (watch): npm run dev
- Start once: npm start
- Build: npm run build
- Type check: npm run typecheck
- Test script: npm test

## API security model
AI endpoints are server-protected:
- Firebase ID token is required in Authorization: Bearer <token>
- CORS uses explicit allowlist (CORS_ALLOWED_ORIGINS)
- per-user rate limit is applied on AI routes

## Firestore access model
Final Firestore rules are in firestore.rules.
Access policy:
- default deny on all paths
- only authenticated owner can read/write under users/{uid}/...
- profile, favorites, generated content are accessible only to matching uid

Deploy rules to make live environment match repository:
- firebase login
- firebase use <your-project-id>
- firebase deploy --only firestore:rules

## Suggested reviewer verification path
No shared demo user is included in this repository.

Recommended validation flow:
1. Register a new account in the app.
2. Create business profile in onboarding.
3. Generate ideas, post, weekly plan, and image.
4. Save favorites and verify they appear in library.
5. Logout/login and verify user-scoped data persists.

## Quality status (finalization pass)
- Frontend build: OK
- Frontend unit tests: OK (34 files, 49 tests)
- API build: OK
- API test script: OK (typecheck-based)

## Dependency audit status
- Frontend: npm audit -> 0 vulnerabilities after dependency updates.
- API: 8 low vulnerabilities remain in transitive dependencies of firebase-admin.
  - Current npm suggested fix is npm audit fix --force to firebase-admin@10.3.0 (semver-major downgrade), which is not safe to apply automatically in finalization.
  - These findings are currently low severity and mostly in optional/transitive cloud helper packages.

## Known limitations
- API is hosted on free-tier Render; cold start may cause slower first response.
- Frontend initial bundle is around ~593 kB; production warning budget was aligned to current size.
- API test currently validates compilation/type safety; no dedicated endpoint integration suite yet.



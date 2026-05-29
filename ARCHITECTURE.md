# James Maruti Portfolio — Architecture Overview

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: TailwindCSS (design tokens from Stitch "Architectural Precision" system)
- **Auth**: Firebase Authentication (Email/Password + Google OAuth)
- **Database**: Firestore (real-time subscriptions)
- **Fonts**: Hanken Grotesk (display/headings) · Inter (body) · JetBrains Mono (labels/code)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — wraps AuthProvider, loads fonts
│   ├── page.tsx                # Public portfolio homepage
│   ├── globals.css             # TailwindCSS base + custom utilities
│   │
│   ├── auth/
│   │   ├── sign-in/page.tsx    # Email/password + Google sign-in
│   │   └── sign-up/page.tsx    # New account registration
│   │
│   ├── contact/page.tsx        # Contact form → Firestore contactSubmissions
│   │
│   ├── dashboard/
│   │   ├── layout.tsx          # Auth guard + Sidebar layout
│   │   ├── page.tsx            # Overview: MetricCards + activity feed
│   │   ├── metrics/page.tsx    # Edit & view real-time metrics
│   │   ├── activity/page.tsx   # Firestore activity log (live)
│   │   └── settings/page.tsx   # Profile + password management
│   │
│   └── api/
│       ├── login/route.ts      # POST /api/login  (token validation)
│       ├── logout/route.ts     # POST /api/logout (cookie clear)
│       ├── metrics/route.ts    # GET|POST /api/metrics
│       └── settings/route.ts   # GET|PUT /api/settings
│
├── components/
│   ├── TopBar.tsx              # Glassmorphism nav, responsive, auth-aware
│   ├── Sidebar.tsx             # Dashboard fixed sidebar with role badge
│   ├── BottomNav.tsx           # Mobile-only bottom nav (portfolio pages)
│   └── MetricCard.tsx          # Reusable stat card (accent + standard variants)
│
├── context/
│   └── AuthContext.tsx         # Firebase Auth state, signIn/signUp/Google/logout
│
└── lib/
    ├── firebase.ts             # App init, auth, db, googleProvider exports
    └── firestore.ts            # Typed helper functions + schema docs
```

---

## Firestore Schema

```
users/{uid}
  uid: string
  email: string
  displayName: string
  photoURL: string | null
  role: "admin" | "user"
  createdAt: Timestamp
  updatedAt: Timestamp

metrics/{docId}
  userId: string        ← ref to users/{uid}
  sitespeedImprovement: number
  satisfactionRate: number
  customAssets: number
  followers: number
  connections: number
  updatedAt: Timestamp

activityLogs/{docId}
  userId: string
  action: string        ← "login" | "logout" | "signup" | "profile_update" | ...
  metadata: object
  timestamp: Timestamp

contactSubmissions/{docId}
  name: string
  email: string
  message: string
  submittedAt: Timestamp
  status: "new" | "read" | "replied"
```

---

## Routing Map

| Route                  | Access    | Description                        |
|------------------------|-----------|------------------------------------|
| `/`                    | Public    | Portfolio homepage                 |
| `/contact`             | Public    | Contact form                       |
| `/auth/sign-in`        | Public    | Email + Google sign-in             |
| `/auth/sign-up`        | Public    | New account registration           |
| `/dashboard`           | Auth only | Metrics overview + activity log    |
| `/dashboard/metrics`   | Auth only | Edit/view real-time metrics        |
| `/dashboard/activity`  | Auth only | Live Firestore activity log        |
| `/dashboard/settings`  | Auth only | Profile & password settings        |
| `/api/login`           | Server    | POST — validate Firebase ID token  |
| `/api/logout`          | Server    | POST — clear session cookie        |
| `/api/metrics`         | Server    | GET public / POST admin (Bearer)   |
| `/api/settings`        | Server    | GET + PUT user settings (Bearer)   |

---

## Role-Based Access Control

Roles are stored in `users/{uid}.role` in Firestore:
- **`user`** — default, can view/edit own metrics and profile
- **`admin`** — full access, can call protected API routes

The Sidebar shows the user's role badge. API routes (commented stubs) verify the role
via Firebase Admin SDK `verifyIdToken()` before allowing mutations.

---

## Real-time Data Flow

```
Firestore ──onSnapshot──► subscribeToMetrics() ──► MetricCard display
           ──onSnapshot──► subscribeToActivityLogs() ──► Activity log
```

All dashboard pages subscribe on mount and clean up on unmount — no polling needed.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure Firebase
cp .env.local.example .env.local
# Fill in your Firebase project values

# 3. Enable in Firebase Console:
#    - Authentication: Email/Password + Google
#    - Firestore Database (production mode)

# 4. Deploy Firestore security rules (see below)

# 5. Run development server
npm run dev
```

### Firestore Security Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /metrics/{docId} {
      allow read, write: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }
    match /activityLogs/{docId} {
      allow read: if request.auth != null
        && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
    match /contactSubmissions/{docId} {
      allow create: if true; // public form
      allow read, update: if request.auth != null; // admin only in production
    }
  }
}
```

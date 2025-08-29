# Superhero Database

A full-stack web application for managing superheroes.  
You can create, edit, delete, and view superheroes, each with images, descriptions, and powers.  

---

## Features
- **CRUD operations** for superheroes
- **Image management** (upload/remove) using [Cloudinary](https://cloudinary.com/)
- **Postgres database** hosted on [Neon](https://neon.tech/)
- **List view**:
  - Displays superhero nickname + one image
  - Pagination (5/10/25/50 items per page)
  - Filter by nickname
- **Detail view**:
  - Full info (real name, origin, powers, catchphrase, images)
  - Edit and delete actions
- **Unit tests** for core logic

---

## Tech Stack
- **Backend**: Node.js + Express.js
- **Frontend**: React, RTK, RHF
- **Shared**: Zod
- **Database**: PostgreSQL (Neon)
- **File Storage**: Cloudinary
- **Testing**: Jest

---

## Assumptions
- Filtering is implemented **only by nickname**.  
- **Full validation** is present in create/update forms — no fields are optional.  
- No **Authentication & Authorization** is implemented (open access).  
- The app is hosted on **Render (free tier)**, so cold starts may cause up to ~1 minute delay when first opening.  
- **Unit tests** cover only backend logic (not frontend).  


## Getting Started

### 1. Clone the repo
### 2. Setup environment variables

Rename:

```bash
packages/server/.env.example → packages/server/.env
```

I don't know the better way to pass this data to you, but all services are free so don't worry.

### 3. Install dependencies

```bash
npm install
```

### 4. Run the app

Backend:

```bash
npm run dev:s
```

Frontend:

```bash
npm run dev:c
```

### 5. Run tests

```bash
npm run test
```

---

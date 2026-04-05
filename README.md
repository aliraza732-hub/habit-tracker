# 🎯 Habit Tracker

A full stack habit tracking app built with Next.js, Prisma, and PostgreSQL. Track your daily habits, build streaks, and monitor your progress.

## ✨ Features

- ✅ Email & password authentication
- ✅ Google sign in
- ✅ Create and delete habits
- ✅ Daily check-off system
- ✅ Streak counter 🔥
- ✅ Progress & stats page
- ✅ Profile page
- ✅ Fully responsive design

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, Tailwind CSS |
| Backend | Next.js API Routes, Server Actions |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | NextAuth.js v5 |
| Deployment | Vercel |

## 📁 Project Structure


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or Supabase)
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables — create a `.env` file:
```env
DATABASE_URL="your-postgresql-url"
DIRECT_URL="your-direct-postgresql-url"
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. Push database schema:
```bash
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📱 Pages

| Page | URL | Description |
|---|---|---|
| Login | `/login` | Sign in with email or Google |
| Register | `/register` | Create a new account |
| Dashboard | `/dashboard` | View and check off habits |
| Add Habit | `/dashboard/add` | Create a new habit |
| Progress | `/dashboard/progress` | Stats and streaks |
| Profile | `/dashboard/profile` | User info and sign out |

## 🗄️ Database Schema
```prisma
User        → stores user accounts
Habit       → stores user habits
Completion  → tracks daily check-offs
Account     → NextAuth Google accounts
Session     → NextAuth sessions
```

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection URL (pooled) |
| `DIRECT_URL` | PostgreSQL direct connection URL |
| `NEXTAUTH_URL` | Your app URL |
| `AUTH_SECRET` | NextAuth secret key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

## 📦 Deployment

This app is deployed on Vercel with Supabase as the database.

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy! 🚀

## 👨‍💻 Author

**Ali Raza**
- GitHub: [Ali Mubarak](https://github.com/aliraza732-hub)
- Email: alirazamehar732@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
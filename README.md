## 🚀 Overview

- **Dashboard**: Hard coded data since the calculation formula is not clearly provided.
- **Data Manager**: CRUD, Infinite Scroll Pagination, Global State.

## 🏗️ Tech Stack

| Technology       | Version | Purpose                              |
| ---------------- | ------- | ------------------------------------ |
| **Next.js**      | 15+     | React framework with App Router      |
| **Supabase**     | 2.5+    | Backend & PostgreSQL Database        |
| **Zustand**      | 5+      | State Management                     |
| **TypeScript**   | 5+      | Type safety and developer experience |
| **Tailwind CSS** | 4+      | Utility-first CSS framework          |

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Jaegeroo/irg.git
cd irg

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# App Configuration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

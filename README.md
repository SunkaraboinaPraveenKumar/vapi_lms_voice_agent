# LMS SaaS Platform

This is a Next.js application designed as a Learning Management System (LMS) or a platform for interacting with AI companions/tutors. It features user authentication, companion management, session tracking, and a newly implemented bookmarking system.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Folder Structure](#folder-structure)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Environment Variables](#environment-variables)
    -   [Database Setup (Supabase)](#database-setup-supabase)
    -   [Running the Development Server](#running-the-development-server)
-   [Deployment](#deployment)

## Features

*   **User Authentication:** Secure user sign-in and sign-up powered by Clerk.
*   **Companion Management:** Users can create, view, and interact with AI companions.
*   **Session History:** Tracks past interactions and sessions with companions.
*   **Bookmarking:** Users can bookmark their favorite companions for easy access.
*   **Subscription Features:** (Indicated by `app/subscription` route) - Placeholder for potential premium features.
*   **Dynamic Routing:** Leverages Next.js App Router for structured routing.
*   **Responsive UI:** Built with Tailwind CSS and Shadcn UI for a modern and adaptive interface.

## Technologies Used

*   **Next.js 14+:** React framework for building server-rendered and statically generated web applications.
*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Type-safe JavaScript superset.
*   **Clerk:** User authentication and management solution.
*   **Supabase:** Open-source Firebase alternative for database (PostgreSQL), authentication, and more.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Shadcn UI:** Reusable UI components built with Radix UI and Tailwind CSS.
*   **Sentry:** Error tracking and performance monitoring.
*   **VAPI SDK:** (Indicated by `lib/vapi.sdk.ts`) - Potentially for voice API integration.

## Folder Structure

Here's a high-level overview of the project's directory structure:

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn
*   Git
*   A Supabase project
*   A Clerk account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd lms_saas
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual credentials.

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

### Database Setup (Supabase)

1.  **Create a Supabase Project:** If you don't have one, create a new project on the [Supabase website](https://supabase.io/).
2.  **Get your credentials:** From your Supabase project settings, get your `Project URL` and `Anon Key` and add them to your `.env.local` file.
3.  **Create `companions` table:** (If not already present)
    ```sql
    -- Example schema, adjust as needed
    CREATE TABLE companions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      topic TEXT NOT NULL,
      subject TEXT NOT NULL,
      duration INTEGER NOT NULL,
      color TEXT NOT NULL,
      author TEXT NOT NULL, -- Clerk user ID
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );
    ```
4.  **Create `session_history` table:**
    ```sql
    CREATE TABLE session_history (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id TEXT NOT NULL, -- Clerk user ID
        companion_id UUID REFERENCES public.companions(id) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );
    ```
5.  **Create `bookmarks` table:**
    ```sql
    CREATE TABLE bookmarks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id TEXT NOT NULL, -- Clerk user ID
        companion_id UUID REFERENCES public.companions(id) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );
    ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


├── .next/ # Next.js build output
├── .git/ # Git version control
├── app/ # Application routes and server components
│ ├── (auth)/ # Authentication routes (sign-in, sign-up)
│ ├── api/ # API routes (e.g., sentry-example-api)
│ ├── my-journey/ # User's personalized dashboard
│ ├── subscription/ # Subscription-related pages
│ ├── companions/ # Companion-specific routes
│ ├── globals.css # Global stylesheets
│ ├── layout.tsx # Root layout for the application
│ └── page.tsx # Main landing page
├── components/ # Reusable React components
│ ├── ui/ # Shadcn UI components
│ ├── CompanionCard.tsx # Displays individual companion details
│ ├── CompanionsList.tsx # Renders a list of companions
│ ├── CTA.tsx # Call-to-action component
│ ├── NavBar.tsx # Navigation bar
│ ├── NavItems.tsx # Navigation links
│ └── SubjectFilter.tsx # Filter component for companions
├── constants/ # Application-wide constants
├── lib/ # Utility functions, server actions, and Supabase client
│ ├── actions/ # Server actions for database interactions (e.g., companion.actions.ts)
│ ├── supabase.ts # Supabase client initialization
│ ├── utils.ts # General utility functions
│ └── vapi.sdk.ts # VAPI SDK integration
├── public/ # Static assets (images, icons)
├── types/ # TypeScript type definitions
├── .gitignore # Files/directories to ignore in Git
├── next.config.ts # Next.js configuration
├── package.json # Project dependencies and scripts
├── package-lock.json # Locked dependency versions
├── postcss.config.mjs # PostCSS configuration for Tailwind CSS
├── tsconfig.json # TypeScript configuration
├── instrumentation.ts # OpenTelemetry instrumentation
└── sentry..config.ts # Sentry configuration files



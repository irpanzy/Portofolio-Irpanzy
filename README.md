# 🚀 Irfan Muria (Irpanzy) - Modern Portfolio & Admin CMS

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript%206-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS%203-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query%20v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand%20v5-4338CA?style=for-the-badge&logo=react&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Motion%20v12-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<p align="center">
  A high-performance, dynamic personal portfolio and comprehensive administrative Content Management System (CMS) built with <strong>Next.js 15 (App Router, Turbopack)</strong>, <strong>React 19</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, <strong>TanStack Query v5</strong>, and <strong>Framer Motion</strong>.
</p>

[**🌐 Live Website**](https://irpanzy.vercel.app) • [**✨ Report Bug**](https://github.com/irpanzy/Portofolio-Irpanzy/issues) • [**💡 Request Feature**](https://github.com/irpanzy/Portofolio-Irpanzy/issues)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Packages Breakdown](#-tech-stack--packages-breakdown)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Contact & Author](#-contact--author)
- [License](#-license)

---

## 📖 Overview

This repository powers **Irfan Muria's** personal portfolio and full-featured headless administrative CMS. It showcases modern web applications, career experiences, educational background, certifications, and technical proficiencies with smooth animations and dark/light mode aesthetics.

The integrated **Admin CMS Dashboard** allows real-time content management, soft-deletion/restoration, interactive drag-and-drop ordering, and automatic cascade synchronization with backend REST APIs.

---

## 🌟 Key Features

### 💻 Client Portfolio

- **Aesthetic Glassmorphism & Ambient Glow**: Modern dark & light theme with custom blur effects, soft ambient lighting, and refined typography.
- **Dynamic Content Delivery**: Asynchronous data caching, instant updates, and background revalidation via TanStack Query v5.
- **Interactive Project Showcase**: Responsive cards displaying live demo triggers, GitHub repositories, and tech stack tags with icons.
- **Categorized Skills Matrix**: 7-category breakdown (_Languages, Frontend, Backend, Mobile, Database, DevOps & Cloud, Tools_) with proficiency rating indicators.
- **Interactive Timeline & Education Gallery**: Career milestones and academic journey with multi-file certificate lightbox view dialogs.
- **Micro-Animations & Smooth Scrolling**: Powered by Framer Motion (`motion`) with scroll-triggered entrance animations and interactive hover effects.
- **Interactive Contact & Chat Form**: Integrated messaging system with Web3Forms & custom backend endpoints.

### 🛡️ Admin Dashboard CMS (`/admin`)

- **Protected Authentication**: Secure JWT-based authentication with route middleware guards and automatic token refresh.
- **Drag & Drop Interactive Reordering**:
  - 🔄 **Project Tech Stack Reordering**: Drag & drop or arrow buttons to change tech stack order directly in project modals without deleting/re-adding.
  - 🔄 **Tech Stack Dashboard Reordering**: Drag & drop technology cards inside their respective categories with instant backend order persistence.
  - 🔄 **Project, Experience, & Education Reordering**: One-click sequence adjustments.
- **Tech Stack Cascade Update**: Renaming or updating tech stack names/icons automatically synchronizes across all assigned portfolio projects.
- **Multi-Category Tech Stack Selector**: Searchable combobox dropdown (`cmdk` + Radix UI Popover) with custom text support and library icons.
- **Image & Icon Management**: Integrated asset uploads via ImageKit CDN with real-time previews.
- **Recycle Bin (Trash System)**: Soft-deletion architecture with restore and permanent force-delete capabilities.

---

## 🛠️ Tech Stack & Packages Breakdown

### 1. Core Framework & Runtime

| Package                                           | Version   | Description                                                          |
| :------------------------------------------------ | :-------- | :------------------------------------------------------------------- |
| **[Next.js](https://nextjs.org/)**                | `15.1.11` | React Framework with App Router, Turbopack, and SSR/SSG capabilities |
| **[React](https://react.dev/)**                   | `^19.0.0` | Frontend UI library with concurrent rendering                        |
| **[React DOM](https://react.dev/)**               | `^19.0.0` | React Document Object Model renderer                                 |
| **[TypeScript](https://www.typescriptlang.org/)** | `^6.0.3`  | Static type checking and enhanced developer experience               |

### 2. Styling, UI Primitives & Design System

| Package                                                         | Version    | Description                                                                                                                           |
| :-------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **[Tailwind CSS](https://tailwindcss.com/)**                    | `^3.4.1`   | Utility-first CSS framework with custom design tokens                                                                                 |
| **[PostCSS](https://postcss.org/)**                             | `^8`       | CSS transformation tooling                                                                                                            |
| **[Autoprefixer](https://github.com/postcss/autoprefixer)**     | `^10.4.22` | Automatic vendor prefix management                                                                                                    |
| **[clsx](https://github.com/lukeed/clsx)**                      | `^2.1.1`   | Utility for constructing conditional class names                                                                                      |
| **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** | `^3.6.0`   | Merge Tailwind CSS classes without style conflicts                                                                                    |
| **[class-variance-authority (CVA)](https://cva.style/)**        | `^0.7.1`   | Type-safe component variant generation                                                                                                |
| **[Radix UI Primitives](https://www.radix-ui.com/)**            | `Latest`   | Accessible unstyled UI primitives (`dialog`, `popover`, `dropdown-menu`, `switch`, `checkbox`, `toast`, `separator`, `slot`, `label`) |
| **[Base UI](https://base-ui.com/)**                             | `^1.6.0`   | Accessible component building blocks                                                                                                  |
| **[cmdk](https://cmdk.paco.me/)**                               | `^1.1.1`   | Fast, accessible, unstyled command menu & searchable combobox                                                                         |
| **[Lucide React](https://lucide.dev/)**                         | `^0.509.0` | Clean and lightweight modern icon collection                                                                                          |

### 3. State Management & Data Fetching

| Package                                                                 | Version    | Description                                                                    |
| :---------------------------------------------------------------------- | :--------- | :----------------------------------------------------------------------------- |
| **[@tanstack/react-query](https://tanstack.com/query/latest)**          | `^5.101.4` | Powerful asynchronous server-state manager with caching and cache invalidation |
| **[@tanstack/react-query-devtools](https://tanstack.com/query/latest)** | `^5.101.4` | Dedicated inspection panel for React Query cache                               |
| **[Zustand](https://github.com/pmndrs/zustand)**                        | `^5.0.14`  | Small, fast, and scalable client-side global state management                  |
| **[Axios](https://axios-http.com/)**                                    | `^1.18.1`  | Promise-based HTTP client with request/response interceptors                   |

### 4. Animations & Micro-interactions

| Package                                           | Version    | Description                               |
| :------------------------------------------------ | :--------- | :---------------------------------------- |
| **[Motion (Framer Motion)](https://motion.dev/)** | `^12.11.0` | Production-ready motion library for React |

### 5. Forms & Validation

| Package                                                                 | Version    | Description                                             |
| :---------------------------------------------------------------------- | :--------- | :------------------------------------------------------ |
| **[React Hook Form](https://react-hook-form.com/)**                     | `^7.83.0`  | Performant, flexible forms with easy state subscription |
| **[Zod](https://zod.dev/)**                                             | `^3.25.76` | TypeScript-first schema declaration and data validation |
| **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** | `^5.5.7`   | Zod validation resolver for React Hook Form             |

### 6. Development, Linting & Formatting

| Package                                                                                        | Version  | Description                                        |
| :--------------------------------------------------------------------------------------------- | :------- | :------------------------------------------------- |
| **[Prettier](https://prettier.io/)**                                                           | `^3.9.6` | Opinionated code formatter                         |
| **[prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)** | `^0.8.1` | Automatic class sorting for Tailwind CSS           |
| **[ESLint](https://eslint.org/)**                                                              | `^9`     | Code analysis tool with `eslint-config-next` rules |

---

## 📁 Project Architecture & Directory Structure

```text
Portofolio-Irpanzy/
├── app/                             # Next.js App Router root
│   ├── admin/                       # Admin CMS Protected Modules
│   │   ├── about/                   # About / Bio management
│   │   ├── dashboard/               # Main statistics dashboard
│   │   ├── education/               # Education & activity records
│   │   ├── experiences/             # Work experiences management
│   │   ├── hero/                    # Hero greeting & avatar settings
│   │   ├── login/                   # Admin authentication portal
│   │   ├── projects/                # Portfolio projects CRUD & ordering
│   │   ├── services/                # Services offering management
│   │   ├── techstack/               # Tech stack & skill matrix management
│   │   └── trash/                   # Recycle Bin (Restore / Force Delete)
│   ├── components/                  # Public portfolio section components
│   │   ├── About.tsx                # Bio & quick facts
│   │   ├── Contact.tsx              # Contact form & social links
│   │   ├── Education.tsx            # Academic timeline & lightbox viewer
│   │   ├── Experience.tsx           # Career timeline
│   │   ├── Header.tsx               # Hero header section
│   │   ├── Navbar.tsx               # Navigation bar & theme switch
│   │   ├── Services.tsx             # Services bento grid
│   │   ├── Skills.tsx               # Categorized skills matrix
│   │   └── Work.tsx                 # Project showcase grid
│   ├── globals.css                  # Global styles & Tailwind layers
│   ├── layout.tsx                   # App root layout with providers
│   └── page.tsx                     # Landing page assembly
├── components/                      # Shared Reusable UI Components
│   ├── ui/                          # Radix / shadcn UI primitives (Dialog, Badge, etc.)
│   ├── ImageUpload.tsx              # ImageKit file upload handler
│   ├── LoadingSpinner.tsx           # Page & component loading indicators
│   ├── RouteLoadingBar.tsx          # Top route progression bar
│   └── TechStackSelector.tsx        # Drag & drop multi-format tech stack selector
├── hooks/                           # Custom React Hooks
│   ├── use-toast.ts                 # Toast notification dispatch hook
│   ├── useApi.ts                    # TanStack Query queries & mutations
│   └── useGlobalLoading.ts          # Global overlay loading trigger
├── lib/                             # Utility & Service Configurations
│   ├── api.ts                       # Typed API endpoints mapping
│   ├── axios.ts                     # Axios client instance with auth interceptor
│   └── utils.ts                     # Tailwind class merge utility (cn)
├── store/                           # Zustand Global State Stores
│   ├── authStore.ts                 # Authentication session state
│   ├── chatStore.ts                 # Interactive chatbot dialogue state
│   └── uiStore.ts                   # UI preferences & modal states
├── types/                           # TypeScript Domain Models & Interfaces
│   ├── hero.ts                      # Hero domain types
│   ├── project.ts                   # Project models & tech stack union types
│   ├── techStack.ts                 # Tech stack categories & proficiency types
│   └── ...                          # Experience, education, service & common types
└── public/                          # Static assets, favicon, & public images
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: `v18.18+` or `v20.x+` (Recommended)
- **npm** (or `pnpm` / `yarn` / `bun`)

### 2. Clone & Install

```bash
# Clone the repository
git clone https://github.com/irpanzy/Portofolio-Irpanzy.git

# Navigate into directory
cd Portofolio-Irpanzy

# Install project dependencies
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Site Public URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Web3Forms Public Access Key (Contact Form)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the client portfolio, or [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to access the Admin Panel.

---

## 📜 Available Scripts

| Script           | Command                | Purpose                                                          |
| :--------------- | :--------------------- | :--------------------------------------------------------------- |
| **Dev**          | `npm run dev`          | Starts development server with Next.js Turbopack                 |
| **Build**        | `npm run build`        | Compiles optimized production build                              |
| **Start**        | `npm run start`        | Runs the production build server                                 |
| **Format**       | `npm run format`       | Formats all workspace files using Prettier                       |
| **Format Check** | `npm run format:check` | Verifies formatting compliance without writing                   |
| **Type Check**   | `npm run type-check`   | Executes TypeScript type checking (`tsc --noEmit`)               |
| **Lint**         | `npm run lint`         | Runs ESLint analysis                                             |
| **Lint Fix**     | `npm run lint:fix`     | Automatically fixes autofixable ESLint issues                    |
| **Validate**     | `npm run validate`     | Runs full CI validation (`type-check` + `lint` + `format:check`) |

---

## 📬 Contact & Author

- **Author**: Irfan Muria (Irpanzy)
- **GitHub**: [@irpanzy](https://github.com/irpanzy)
- **LinkedIn**: [Irfan Muria](https://linkedin.com/in/irfanmuria)
- **Email**: [irfanmuria04@gmail.com](mailto:irfanmuria04@gmail.com)
- **Portfolio Website**: [irpanzy.vercel.app](https://irpanzy.vercel.app)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <sub>Designed & Developed with ❤️ by <strong>Irfan Muria</strong></sub>
</div>

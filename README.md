# Hands-on React Application Architecture

In this workshop, we will explore how to build and improve the architecture of a React app inside a monorepo. Learn how to structure app features, add routing with React Router, handle client and server state, fetch and update API data with TanStack Query, and create robust forms with React Hook Form and Zod.

Designed for developers who know the basics of React and want more practice with real application structure, this workshop gives you practical skills for building React applications that can grow across apps and shared packages.

## Getting started

**Requirements:** Node.js v20.19+ (CI runs on v22 — `nvm`/`fnm` users get this automatically via the bundled `.nvmrc`).

Use the participant repo link shared by the instructor.

```bash
git clone <participant-repo-url>
cd <participant-repo-name>
```

Open the `.code-workspace` file in VS Code so the repo settings and recommended extensions are applied.

```bash
npm install
npm run db:seed
npm run dev
```

`npm run dev` starts all apps at once via Turborepo.

| App         | URL                   |
| ----------- | --------------------- |
| Arena (SPA) | http://localhost:5173 |
| API + docs  | http://localhost:3001 |
| medix.com   | http://localhost:3000 |

Workshop tasks are listed in [exercises/](exercises/).

Finished reference repo:
[react-monorepo-workshop](https://github.com/aurorascharff/react-monorepo-workshop)

## Monorepo structure

```text
apps/
  arena/        - React SPA (workshop target)
  api/          - Hono REST API (pre-written, OpenAPI + Scalar docs)
  medix.com/    - Next.js marketing site (reference)
packages/
  ui/           - Shared design system (@medix/ui)
```

## Tech stack

| Layer         | Tool                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| UI framework  | [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)                                     |
| Routing       | [React Router v7](https://reactrouter.com) (SPA mode)                                                                        |
| Data fetching | [TanStack Query v5](https://tanstack.com/query)                                                                              |
| Forms         | [React Hook Form](https://react-hook-form.com) + [Zod v4](https://zod.dev)                                                   |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com) + shadcn-style component library                                                  |
| API           | [Hono](https://hono.dev) + [Drizzle ORM](https://orm.drizzle.team) + SQLite (pre-written)                                    |
| Monorepo      | [Turborepo](https://turbo.build) + npm workspaces                                                                            |
| Testing       | [Vitest](https://vitest.dev), [React Testing Library](https://testing-library.com), and [Playwright](https://playwright.dev) |

## Commands

```bash
npm run dev           # Start all apps
npm run build         # Build all apps
npm run lint          # ESLint across all apps
npm run typecheck     # TypeScript check across all apps
npm run format        # Prettier write
npm run format:check  # Prettier check
npm run test          # Vitest across apps and packages
npm run e2e           # Playwright smoke tests
npm run test:all      # Vitest + Playwright
npm run db:seed       # Reset database to seed data
```

## Testing

The starter includes the test setup and a few small smoke/mock tests so you can run the tools before adding more coverage.

```bash
npm run test  # Unit and component tests
npm run e2e   # Browser tests for Arena + API
```

The first `npm run e2e` downloads the Chromium binary Playwright needs (~150 MB). Subsequent runs reuse it.

## AI

Includes nested `AGENTS.md` files that scope context to each part of the monorepo. Read the nearest `AGENTS.md` before editing.

GitHub Copilot is configured via `.github/copilot-instructions.md`, and the [`vercel-react-best-practices`](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) skill is available as `/react-best-practices` in Copilot Chat.

## CI

GitHub Actions runs `lint`, `typecheck`, `test`, `build`, and `e2e` on every push and pull request to `main`.

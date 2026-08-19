# 04 — Grouped Tasks (2023)

**[Live demo](https://code-samples.raullazaro.com/demo/04-grouped-tasks/)**

**Stack:** React 18, styled-components.

## The challenge

Build a UI that presents a set of tasks grouped into sections, tracks completion
progress per section, and lets the user expand/collapse each group to inspect or
toggle its tasks.

## What it demonstrates

- React 18 functional components with hooks (`useState`, `useEffect`, context)
- Component composition (`GroupedTask → Group → ListTasks`)
- Styled-components theming
- Progressive completion calculation and rendering
- Unit tests with React Testing Library

## How it runs

Purely client-side — mock task data is bundled in `public/mock-data.json` and
fetched at runtime.

> Note: the original project brief was not preserved in the source repository,
> so this description summarizes what the implementation does.

```bash
npm install
npm run build   # outputs build/
```

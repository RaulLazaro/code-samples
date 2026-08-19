# 03 — Live City Rankings (2023)

**[Live demo](https://code-samples.raullazaro.com/demo/03-city-rankings/)**

**Stack:** React 17, RxJS, styled-components, Server-Sent Events (mocked).

## The challenge

Build a live-updating dashboard of cities ranked by a pollution metric. The
backend streams updated rankings to the client in real time via Server-Sent
Events; the UI must update automatically, support filtering by country,
population range and name, sorting, and pagination, and provide a per-city
detail view.

## What it demonstrates

- **Real-time streaming:** the original Express backend emitted SSE updates
  every second, recomputing each city's metric and re-ranking the full list.
  That behaviour is reproduced in full by an in-browser **service worker**
  (`public/sw.js`) using `ReadableStream` + `text/event-stream`, seeded from the
  real 500-city dataset (`public/data.json`) — no server required.
- React functional components, RxJS observables, styled-components theming
- Table sorting/filtering (country, population range, name) and pagination
- Per-city detail route

## How it runs

Open the demo: the service worker seeds the 500-city dataset and immediately
starts streaming live re-rankings. On the very first visit the page reloads once
so the service worker can take control (standard first-load service-worker
behaviour).

> Note: the original project brief was not preserved in the source repository,
> so this description summarizes what the implementation does.

```bash
npm install
npm run build   # outputs build/
```

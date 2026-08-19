# Code Samples

A collection of anonymized front-end and full-stack technical challenges I've
completed over the years. Each folder is a self-contained demo that deploys as
static files — any original Express backend has been replaced by an in-browser
mock, so every demo runs fully static with zero servers.

**[→ Live site](https://code-samples.raullazaro.com)**

> Original company names, branding and private data have been removed. Each
> demo keeps its original date and honestly shows what it demonstrates.

## Demos

| # | Demo | Year | Stack | What it shows | Live |
|---|------|------|-------|---------------|------|
| 01 | Product Cart | 2020 | Angular 8 | Angular components, services, shopping cart | [Live](https://code-samples.raullazaro.com/demo/01-product-cart/) |
| 02 | Image Manager | 2021 | Webpack, JS (ES6) | JS bundling, data display & inline editing | [Live](https://code-samples.raullazaro.com/demo/02-image-manager/) |
| 03 | City Rankings | 2023 | React 17, SSE (mocked) | Server-Sent Events, streaming data, reactive UI | [Live](https://code-samples.raullazaro.com/demo/03-city-rankings/) |
| 04 | Grouped Tasks | 2023 | React 18 | Component design, grouped task progress | [Live](https://code-samples.raullazaro.com/demo/04-grouped-tasks/) |

## Skills demonstrated

- **JavaScript / TypeScript**: ES6 modules, async/await, `fetch`, DOM APIs,
  event delegation, bundling with Webpack and Babel.
- **Frameworks**: Angular 8 (components, services, DI), React 17 & 18
  (function components, hooks, context, styled-components) and React Router.
- **Reactive / real-time**: RxJS observables and a faithful reproduction of a
  Server-Sent Events stream (re-ranking every second) in a service worker.
- **Architecture & testing**: separation of services, reusable components,
  unit tests (Karma/Jasmine, React Testing Library).
- **Tooling & build**: Webpack, Create React App, Angular CLI, production
  bundles committed and served as a fully static site.

## Run locally

Each demo is a self-contained project pinned to Node 16 (see its `.nvmrc`):

```bash
cd <folder>
nvm use      # or: nvm install
npm install
npm run build
```

The aggregated static site can be generated and served with:

```bash
node scripts/assemble.mjs   # builds the site/ directory
cd site && npx serve .
```

## How the backends work

- **Demo 02 (Image Manager)** and **Demo 03 (Live City Rankings)** originally had
  an Express backend. Their endpoints are now reproduced in an in-browser
  **service worker** that intercepts the requests — no server required.
- **Demo 02** implements the CRUD `GET` / `PATCH` image API over the original
  dataset.
- **Demo 03** reproduces the original Server-Sent Events stream (re-ranking a
  500-city dataset every second), served from the aggregated static bundle.

## Deploy

The repo aggregates prebuilt static bundles into `site/` via
`scripts/assemble.mjs`, then serves them through a single Cloudflare Pages
project — one sub-path per demo (`/demo/<id>/`). A custom `404.html` with links
back to each demo is included.


#!/usr/bin/env node
// Aggregate each demo's built static output into a single deployable `site/`
// directory, one sub-path per demo, plus a root index. Run with:
//   node scripts/assemble.mjs

import { cpSync, mkdirSync, rmSync, copyFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const siteDir = join(root, 'site')

// demo sub-path -> source build directory (relative to repo root)
const demos = [
  { id: '01-product-cart', src: '01-product-cart/dist/angular-product-cart', title: 'Product Cart', subtitle: 'Angular 8 · 2020' },
  { id: '02-image-manager', src: '02-image-manager/dist', title: 'Image Manager', subtitle: 'Webpack, ES6 · 2021' },
  { id: '03-city-rankings', src: '03-city-rankings/build', title: 'City Rankings', subtitle: 'React 17, SSE · 2023' },
  { id: '04-grouped-tasks', src: '04-grouped-tasks/build', title: 'Grouped Tasks', subtitle: 'React 18 · 2023' },
]

rmSync(siteDir, { recursive: true, force: true })
mkdirSync(siteDir, { recursive: true })

const indexLinks = demos
  .map(
    (d, i) =>
      `      <a class="card" href="/demo/${d.id}/">
        <span class="num">0${i + 1}</span>
        <span class="label">${d.title}</span>
        <span class="subtitle">${d.subtitle}</span>
      </a>`
  )
  .join('\n')

writeFileSync(
  join(siteDir, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Code Samples — Technical challenges</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0; min-height: 100vh; font-family: system-ui, sans-serif;
      display: grid; place-items: center; background: #f4f5f7; color: #1b1f23;
    }
    main { max-width: 720px; width: 100%; padding: 3rem 1.5rem; }
    h1 { font-size: 1.6rem; margin: 0 0 .4rem; }
    p.sub { color: #6a737d; margin: 0 0 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: .75rem; }
    .card {
      display: flex; flex-direction: column; gap: .5rem; padding: 1.25rem;
      background: #fff; border: 1px solid #e1e4e8; border-radius: 10px;
      text-decoration: none; color: #1b1f23; transition: border-color .15s, box-shadow .15s;
    }
    .card:hover { border-color: #0969da; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .num { font-size: .75rem; font-weight: 700; color: #0969da; }
    .label { font-weight: 600; }
    .subtitle { font-size: .8rem; color: #6a737d; }
    .gh-link { display: inline-flex; align-items: center; gap: .5rem; margin: 1.5rem 0 2rem; padding: .5rem 1rem; font-size: .9rem; color: #24292f; text-decoration: none; border: 1px solid #d0d7de; border-radius: 6px; background: #f6f8fa; transition: border-color .15s, box-shadow .15s; }
    .gh-link:hover { border-color: #0969da; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    .gh-link svg { width: 16px; height: 16px; fill: currentColor; }
  </style>
</head>
<body>
  <main>
    <h1>Code Samples</h1>
    <p class="sub">Technical challenges. Pick a demo to open it.</p>
    <a class="gh-link" href="https://github.com/RaulLazaro/code-samples" target="_blank" rel="noopener" data-cfasync="false">
      <svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
      View source on GitHub
    </a>
    <div class="grid">
${indexLinks}
    </div>
  </main>
</body>
</html>
`
)

for (const demo of demos) {
  const dest = join(siteDir, 'demo', demo.id)
  mkdirSync(dest, { recursive: true })
  cpSync(join(root, demo.src), dest, { recursive: true })
  console.log(`✔ /demo/${demo.id} <- ${demo.src}`)
}

// Copy the root README for reference at /README.md
copyFileSync(join(root, 'README.md'), join(siteDir, 'README.md'))

// Custom 404 page (Cloudflare Pages serves this with cache-control: no-store)
writeFileSync(
  join(siteDir, '404.html'),
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 — Not found · Code Samples</title>
  <style>
    * { box-sizing: border-box; }
    body { margin:0; min-height:100vh; font-family:system-ui,sans-serif; display:grid; place-items:center; background:#f4f5f7; color:#1b1f23; }
    main { text-align:center; padding:3rem 1.5rem; }
    h1 { font-size:1.4rem; margin:0 0 .5rem; }
    p { color:#6a737d; margin:0 0 1.5rem; }
    a { color:#0969da; text-decoration:none; font-weight:600; }
    a:hover { text-decoration:underline; }
  </style>
</head>
<body><main>
  <h1>404 — Page not found</h1>
  <p>The page you're looking for doesn't exist.</p>
  <p><a href="/demo/01-product-cart/">Product Cart</a> ·
     <a href="/demo/02-image-manager/">Image Manager</a> ·
     <a href="/demo/03-city-rankings/">City Rankings</a> ·
     <a href="/demo/04-grouped-tasks/">Grouped Tasks</a></p>
  <p><a href="https://github.com/RaulLazaro/code-samples" style="font-weight:400;font-size:.85rem">GitHub ↗</a></p>
</main></body></html>
`
)

console.log(`\nSite ready at ${siteDir}`)

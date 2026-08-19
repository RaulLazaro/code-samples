# 02 — Image Manager (2021)

**[Live demo](https://code-samples.raullazaro.com/demo/02-image-manager/)**

**Stack:** Webpack 5, JavaScript (ES6), Babel.

## The challenge (original brief)

> We want to display the data from a list of images in a web interface with a
> structured response table format.
>
> Using modern JavaScript (ES6 or, if preferred, TypeScript), implement an
> application to display the data list of an XML/JSON sample document, where we
> can edit the fields that are not related to the image metadata and the
> information is saved in the XML/JSON document.
>
> To deliver a solution we must take into account the following aspects:
> - Deliver the code ready for production.
> - Provide a solution that can be easy to grow and easy to add new features.
> - The code must be self-explanatory and, where necessary, include notes
>   explaining the solution and why certain things are included or left out.

## What it demonstrates

- ES6 modules, async/await, `fetch` with `GET` / `PATCH`
- Webpack bundling, Babel transpilation, HTML/CSS extraction
- DOM construction, event delegation, dynamic form fields (checkbox, number, textarea)

## How it runs

The original brief expected an Express API. Here the API is served by an
in-browser **service worker** (`public/sw.js`) that intercepts `GET /images` and
`PATCH /images/:id`, backed by the original 10-record dataset
(`public/images_data.json`) kept fully in memory. No server required.

```bash
npm install
npm run build   # outputs dist/ (includes sw.js + images_data.json)
```

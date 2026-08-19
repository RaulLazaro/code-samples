# 01 — Product Cart (2020)

**[Live demo](https://code-samples.raullazaro.com/demo/01-product-cart/)**

**Stack:** Angular 8, TypeScript, RxJS, Angular CLI.

## The challenge

Build a product shopping-cart UI: list products with quantity controls, keep a
live order summary that recomputes as quantities change, and allow completing
the order through a confirmation modal. Products are loaded from a JSON asset.

## What it demonstrates

- Angular components, services and dependency injection
- Loading product data from `src/assets/cartData.json`
- Reactive recomputation of the order summary and total
- Modal component for the checkout flow
- Unit tests (`ng test`)

## How it runs

Purely client-side — data is read from a local JSON asset, no backend.

> Note: the original project brief was not preserved in the source repository,
> so this description summarizes what the implementation does.

```bash
npm install
npx ng build --prod   # outputs dist/angular-product-cart/
```

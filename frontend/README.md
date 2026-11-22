# AfterSchool frontend — Tailwind CSS only

A Vue 3 + Vite frontend for after-school lessons and administration. This version retains the
existing backend `fetch` services, composables, and component/view folder architecture.

## Tailwind-only styling

- **There are no custom or legacy CSS files.** All visual styling is written as Tailwind utility
  classes inside each `.vue` template. You can edit each component's design directly in its `class`.
- The **only** stylesheet, `src/assets/css/tailwind.css`, contains exactly `@import "tailwindcss";`.
  Tailwind v4 needs this single import file to generate its styles; it is not an external/custom stylesheet.
- The Tailwind Vite plugin is enabled in `vite.config.js`.
- Responsive styles use `sm:`, `md:`, `lg:`, `xl:` utilities, with Tailwind hover, focus, transition,
  loading, and motion-safe animation utilities. No `<style>` sections or `@apply` components are used.

## Run locally

Requires Node.js compatible with the `engines` field in `package.json`.

```bash
npm install
npm run dev
```

For a production build, run `npm run build`.

## Backend

This frontend uses the same service/API contracts as before:

- `src/services/api.js`: lessons, teachers, enrolment, and orders.
- `src/services/adminApi.js`: admin authentication, lessons, teachers, and orders.
- `src/composables/`: cart, lesson state, and admin authentication.

The backend base URL comes from `.env`, using `VITE_API_URL`. Use a `.env.local` for your
own local endpoint if you do not want to edit the shared setting.

```env
VITE_API_URL=https://afternoon-lesson.onrender.com
```

**Check that your Express backend is running and CORS is configured** before testing live
calls. API endpoint connectivity and a full production build could not be verified in the
artifact environment because npm registry access was unavailable.

## Folder structure

```text
after-school-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/css/
│   │   └── tailwind.css        # ONLY @import "tailwindcss";
│   ├── components/
│   │   ├── admin/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── layout/
│   │   └── lessons/
│   ├── composables/
│   ├── services/
│   │   ├── api.js
│   │   └── adminApi.js
│   ├── utils/
│   ├── views/
│   │   ├── admin/
│   │   └── user/
│   ├── App.vue
│   └── main.js
├── .env
├── index.html
├── package.json
└── vite.config.js
```

## Important checks

1. Search for lessons and filter by teacher; check sorting and unavailable spaces.
2. Add lessons to cart; increase/decrease quantity and submit a checkout form.
3. Log in as admin; create and edit lessons, add teachers, and review orders.
4. Test navigation and tables at 320px, 375px, tablet, and desktop widths.
5. Run `npm run build` in an environment where dependencies can be installed.

# Frontend Take-Home Challenge — Filterable List View

Thanks for taking the time! This is a short, practical Angular exercise meant to
take **1–2 hours**. It mirrors the kind of screen we build day to day.

**Stack:** Angular, TypeScript, SCSS.

> **Versions (for reference only):** we use **Angular 21** and **TypeScript 5.9**
> internally, on **Node 20+**. You're welcome to use the same, but it's **not a
> requirement** — the latest stable Angular is perfectly fine. Use whatever you're
> comfortable with.

---

## The task

Build a screen that lists **applications** and lets the user search and filter
them. The catch: the list is **large (~50,000 records)**, so it has to stay
smooth — scrolling, typing in the search, and changing the filter must not lag.

1. Load the applications on startup (see *Data* below) and show them in a
   scrollable list.
2. Show each one as a card or row: **applicant name**, **status**, **date**, **loan amount**.
3. Add two filters that work together:
   - a **text search** on the applicant name;
   - a **status** dropdown (`draft`, `submitted`, `approved`, `rejected`, and "All").
4. The list updates as the user types / changes the filter — and stays responsive.
5. Handle **loading**, **empty** (no results) and **error** states.

**This is the core of the challenge:** rendering and filtering 50k rows naively
will jank. We want to see you make it fast — e.g. **virtual scrolling** so only
visible rows are in the DOM, a **debounced** search, `OnPush`/signals and
`trackBy`. Choose the techniques you think fit and be ready to justify them.

## Getting started

The project is **already set up** — Angular, TypeScript, SCSS and the test runner
(Vitest) are configured, and the data is ready. Just get your copy, install, and
start building. **No `ng new`, no config** — spend your time on the feature itself.

**1. Clone the repo I've shared with you and install**

  ```bash
  git clone https://github.com/<your-username>/<your-repo>.git
  cd <your-repo>
  npm install
  ```

**2. Run it**

```bash
npm start        # then open http://localhost:4200
```

You'll see a placeholder screen telling you where to build. **That's where your
work goes.**

**3. Run the tests**

```bash
npm test
```

Two example tests already pass (for the app shell and the data service) — use them
as a starting point.

## Data (already provided)

You don't need to build or fetch any data — a ready-to-use service is included:

- `src/app/applications/application.model.ts` — the `Application` type.
- `src/app/applications/applications.service.ts` — `ApplicationsService`, which
  returns **~50,000 applications** asynchronously (simulating a slow network call).

Use it from your component like this:

```ts
private readonly _applications = inject(ApplicationsService);

// ...
this._applications.getApplications().subscribe(/* ... */);
```

To exercise the **error** state, call `getApplications({ fail: true })`. You can
also pass `{ count: 100 }` to work with a smaller list while developing.

You're free to change the service if you want — but you shouldn't need to.

## Ground rules

Please follow these — they reflect how we work:

- Standalone component, **inline template**, styles in an external `.scss`.
- Use **signals**; the filtered list should be a `computed()`, not a method called from the template.
- **No `any`** — type the application model.
- Import RxJS only from `'rxjs'`.
- No hardcoded colors / font sizes in SCSS — use CSS variables you define.

## What to hand in

- A project that runs with `npm install && npm start`.
- Unit tests on the interesting logic (e.g. combined filters, empty state).
- **Optional:** a short **NOTES.md** at the root with a few notes on your solution
  (see *How to submit* for what to include). It's optional — if you skip it, we'll
  just cover the same points in the follow-up chat.

Please commit incrementally rather than in one big commit.

## Nice to have (optional)

Sortable columns or a result count · filters persisted in the URL ·
currency/date formatting via a pure pipe.

## Using AI tools

You're welcome to use AI assistants (Copilot, ChatGPT, Claude, etc.) — we use them
too. Two conditions: you must **understand and be able to explain every line** you
submit, and we ask you to briefly note where AI helped. We'll go through the code
together in a short follow-up chat, so submit only what you can stand behind.

## How to submit

1. Commit your work to the repo I've shared with you, committing incrementally as
   you go.
2. *(Optional but appreciated)* Add a short **NOTES.md** at the root. If you write
   one, a few lines on each of these is plenty — no need for a long document:
   - how to run it (if anything differs from `npm install && npm start`);
   - the performance techniques you chose, and **why**;
   - any key trade-offs or things you'd do differently with more time;
   - where AI tools helped (see *Using AI tools* above).

   If you skip it, no problem — we'll talk through the same points together.
3. Do a final check that the app runs cleanly (`npm install && npm start`), then
   **email me to let me know you're done** — I already have access to the repo.

That's it — please don't spend more than ~2 hours on it. We'd rather see a small,
clean, well-explained solution than a large unfinished one.

## Before you submit — quick checklist

- [ ] The app runs from a **fresh clone** with `npm install` then `npm start`.
- [ ] The list shows name, status, date and loan amount.
- [ ] Search + status filter work together.
- [ ] The **50k list scrolls and filters smoothly** (this is the main point).
- [ ] Loading, empty (no results) and error states are handled.
- [ ] A couple of unit tests pass with `npm test`.
- [ ] *(Optional)* a short `NOTES.md`.

## Questions?

If anything here is unclear, please just reach out to your contact at LendWell
(reply to the email thread you received this from). There are no trick questions —
we're happy to clarify anything before or while you work on it.

---

*Focus on quality over quantity — a small, clean, well-tested solution beats a
large unfinished one. If you assume something, note it down.*

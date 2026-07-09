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

There is no starter project on purpose — set up the Angular app yourself, so we
can see how you structure things from scratch. Keep it to a single, focused screen.

**1. Get your own copy of this repo**

- Click the green **"Use this template" → "Create a new repository"** button at the
  top of this page, and create it under **your own** GitHub account.
  *(Alternatively, clone this repo and push it to a fresh repository of yours —
  please don't open pull requests against this template.)*
- Clone your new repository locally:
  ```bash
  git clone https://github.com/<your-username>/<your-repo>.git
  cd <your-repo>
  ```

**2. Create the Angular app inside it**

```bash
# install the Angular CLI if you don't have it
npm install -g @angular/cli

# scaffold the app (pick your own options; standalone is the default)
ng new app --style=scss --routing=false
```

You can keep the app at the repo root or in a subfolder — just make sure the run
commands below work from a clean clone.

**3. Run it**

```bash
npm install
npm start        # then open http://localhost:4200
```

**4. Run the tests**

```bash
npm test
```

## Data

You don't get a 50k JSON file — **generate the dataset in code** so the list is
large. A minimal generator (adapt as you like):

```ts
type ApplicationStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

interface Application {
  id: string;
  applicantName: string;
  status: ApplicationStatus;
  submittedAt: string; // ISO date
  loanAmount: number;
}

const STATUSES: ApplicationStatus[] = ['draft', 'submitted', 'approved', 'rejected'];
const NAMES = ['Aoife Byrne', 'Liam Kelly', 'Saoirse Nolan', 'Conor Walsh', 'Niamh Doyle', 'Cian Murphy'];

function makeApplications(count = 50_000): Application[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    applicantName: `${NAMES[i % NAMES.length]} ${i}`,
    status: STATUSES[i % STATUSES.length],
    submittedAt: new Date(2026, 0, 1 + (i % 300)).toISOString().slice(0, 10),
    loanAmount: 50_000 + (i % 40) * 7_500,
  }));
}
```

Load it through a small **service** that returns it asynchronously (e.g. wrapped
in an observable/promise with a short delay), so loading/error states are real.
Feel free to add an artificial failure path to exercise the error state.

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

## What we expect at a senior level

The task is deliberately compact — we care about *how* you build it. Show us the
judgment we'd rely on day to day:

- **Performance under load:** the 50k list scrolls and filters smoothly. You can
  explain *what* would jank without your approach and *why* your fix works
  (virtualization, debounce, `OnPush`/signals, `trackBy`).
- **Robust states:** loading vs. empty-dataset vs. no-results vs. error — and a
  retry path. No silent failures.
- **Testing strategy:** not just line coverage — what's worth testing and why.
- **Architecture:** clean separation (data access vs. presentation), a typed model,
  and abstractions that would survive real growth without over-engineering today.

We'll walk through these decisions together in a follow-up conversation.

## Nice to have (optional)

Sortable columns or a result count · filters persisted in the URL ·
currency/date formatting via a pure pipe · a note on how you'd move the filtering
server-side if the data no longer fit in memory.

## Using AI tools

You're welcome to use AI assistants (Copilot, ChatGPT, Claude, etc.) — we use them
too. Two conditions: you must **understand and be able to explain every line** you
submit, and we ask you to briefly note where AI helped. We'll go through the code
together in a short follow-up chat, so submit only what you can stand behind.

## How to submit

1. Commit your work to **your** repository (the one you created in *Getting
   started*), committing incrementally as you go.
2. *(Optional but appreciated)* Add a short **NOTES.md** at the root. If you write
   one, a few lines on each of these is plenty — no need for a long document:
   - how to run it (if anything differs from `npm install && npm start`);
   - the performance techniques you chose, and **why**;
   - any key trade-offs or things you'd do differently with more time;
   - where AI tools helped (see *Using AI tools* above).

   If you skip it, no problem — we'll talk through the same points together.
3. Double-check that a **fresh clone** works end to end:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git test-clone
   cd test-clone
   npm install
   npm start
   ```
4. Send us the **link to your repository**. If it's private, invite us / share it
   so we can access it. No repo? A zip that **includes the `.git` folder** (so we
   can see your commit history) also works.

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

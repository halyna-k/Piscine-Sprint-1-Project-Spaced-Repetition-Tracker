# :brain: Spaced Repetition Tracker

A simple web app that helps track study topics using the **spaced repetition** technique.
Built with **HTML** and **JavaScript (no CSS)** as part of the CodeYourFuture project.

---

## :clipboard: Project Overview

**Spaced repetition** is a learning method where you review information at increasing time intervals:
1 week → 1 month → 3 months → 6 months → 1 year.
This project helps users keep track of what topic should be revised next.
Each user can:

- Select their name from a dropdown (5 users total)
- Add a new topic and a start date
- Automatically generate the revision schedule for that topic
- View upcoming revision dates in chronological order
- Skip past revision dates automatically

---

## :jigsaw: Features

- **User Selection:** Dropdown with 5 users, no user selected on page load.
- **Agenda Display:** Shows upcoming revision dates, past dates are hidden, shows “No data” if empty.
- **Add Topic:** Form with topic name and date picker, validates inputs, calculates repetition dates, stores data in `storage.mjs`.
- **Data Storage:** Uses `getData`, `addData`, and `clearData` functions from `storage.mjs`.
- **Accessibility:** Fully accessible, Lighthouse score: 100%, keyboard navigable.
- **Unit Tests:** Tests for date calculation, form submission, and past date filtering.
- **Deployment:** Live version hosted online on Netlify.

---

## :toolbox: Technologies Used

- HTML5
- JavaScript (ES Modules)
- Local Storage API
- No CSS (logic-focused project)

---

## :rocket: Running Locally

1. Clone the repo:

```bash
  git clone https://github.com/halyna-k/Piscine-Sprint-1-Project-Spaced-Repetition-Tracker
  cd Piscine-Sprint-1-Project-Spaced-Repetition-Tracker
```

2. Install a simple HTTP server:

```bash
  npm install -g http-server
```

3. Run the app:

```bash
  http-server
```

## Open the URL displayed in your browser (usually http://localhost:8080)

## :globe_with_meridians: Live Demo

[View Live Project on Netlify](https://spaced-repetition-tracker.netlify.app)

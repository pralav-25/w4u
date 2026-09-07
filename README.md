# Websites4U

[![Checks](https://github.com/pralav-25/w4u/actions/workflows/ci.yml/badge.svg)](https://github.com/pralav-25/w4u/actions/workflows/ci.yml)

A responsive web-agency experience designed to help businesses understand
services, shape a project scope, and send a useful enquiry without a long sales
form.

[View the live site](https://w4u-indol.vercel.app)

## Highlights

- Interactive project estimator with presets, feature options, budget ranges,
  and delivery guidance
- Service filtering and separate sections for work, pricing, process, and FAQs
- Prefilled email handoff for estimates and project briefs
- Responsive desktop and mobile navigation
- Keyboard-visible focus states and screen-reader state for menus, filters,
  pricing presets, and FAQ controls
- Motion that respects the user's reduced-motion preference

## Stack

- Semantic HTML
- Modern CSS
- Vanilla JavaScript
- GSAP for motion
- Lucide icons

## Run locally

No build step is required. Clone the repository and serve the directory with any
static file server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Project status

This is a front-end portfolio project. Pricing is illustrative, and the enquiry
flow opens the visitor's email client rather than sending data to a backend.

## Validation and estimate model

```bash
python3 scripts/check_site.py
node --test tests/*.test.cjs
```

Requires Python 3 and Node.js 22+. The pure calculation in
`scripts/estimator.js` is shared by the page and tests. It validates page counts,
prices, and multipliers, and includes a combined adjustment line so the visible
breakdown always adds up to the final estimate. Tests cover presets, modifiers,
range bounds, rush timing, and invalid inputs. GitHub Actions runs both checks.

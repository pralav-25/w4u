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

## Try the estimator

1. Open the site and find **Build a smarter estimate**.
2. Choose a preset such as **Business site**, then adjust the page count and features.
3. Compare the budget range, delivery guidance, and line-item breakdown as the scope changes.
4. Select **Email estimate** to review the prepared estimate in your email application.

For the separate contact form, **Download brief (.txt)** saves a copy of the
entered brief when an email application is unavailable. Opening an email draft
does not send it; review and send it from your email application.

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

The contact form retains the brief after opening the email application. Visitors
can download a plain-text copy when email is unavailable, or use the displayed
contact address. A status message distinguishes preparing a draft from sending it.

### Keep an estimate

**Download estimate (.txt)** saves the current preset, page count, design and
content choices, features, budget range, timeline, and itemized price breakdown.
The email action uses the same summary. Neither action sends information to a
backend, and the downloaded file identifies the prices as illustrative.

# Bonario Project Report

Static report for documenting completed Bonario projects, their business value,
operating status, technical context, source repos, and next priorities.

## Current Report Structure

- Fixed top navigation.
- Opening summary with readiness score and headline KPIs.
- KPI cards for total projects, live status, high-impact scope, and quality.
- Summary strip for business coverage and operating signals.
- Reading-focus section for the projects that should be read first.
- Narrative section that explains the overall project landscape.
- Value map grouped by business function and operating area.
- Operating model section showing data sources, business apps, automation layer,
  and management value.
- Technical/source section for Docker runtime, data layer, integrations, and
  Markdown report coverage.
- Analysis section with category coverage, reading priority, and items that need
  more detail before handover.
- Search, category filter, and impact filter.
- Responsive project cards.
- Clickable project detail modal with outcomes, stack, source repo, report file,
  runtime URL, missing references, score, and report notes.
- Narrative fields per project: what it is, how it works, key functions,
  practical usage, business value, and performance impact.
- Impact/effort matrix.
- Summary table with mapped Markdown report file for each project.
- Completion plan for content, data sync, and deployment.
- Scroll reveal, hover states, active navigation, and animated dashboard visuals.

## Run

Open `index.html` directly in a browser.

No package install is required for the current version.

## Data Contract

The UI reads project data from `data/projects.js` via `window.reportProjects`.
The current dataset was shaped from the Markdown reports in this folder. The
data sync step can replace the array with parsed data from Markdown,
JSON, CSV, Notion export, or any internal project source.

Expected project fields:

- `id`
- `name`
- `category`
- `status`
- `quarter`
- `impact`
- `effort`
- `owner`
- `duration`
- `stack`
- `summary`
- `outcomes`
- `narrative.what`
- `narrative.operation`
- `narrative.features`
- `narrative.practicalUse`
- `narrative.businessValue`
- `narrative.performance`
- `metrics.delivery`
- `metrics.adoption`
- `metrics.quality`

## Completion Plan

1. Source mapping: collect source files, screenshots, metrics, and owner approvals.
2. Data sync: replace `data/projects.js` with generated project data.
3. QA: review responsive layout, missing fields, and report wording.
4. Deploy: host as static files on Vercel, Netlify, GitHub Pages, or internal hosting.

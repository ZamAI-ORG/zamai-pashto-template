# ZamAI Pashto Maintainer README

This file mirrors the platform documentation page and is intended for repository-level onboarding.

## Scope

- Platform architecture and runtime interfaces
- Versioned library publishing flow
- Editor-controlled contribution workflow
- Operational file map for maintainers

## Runtime Overview

The current platform is organized around three layers:

- Frontend: React and Vite power the public tools, resources, and documentation surface.
- Backend: Express handles auth, submission persistence, moderation, and import or export operations.
- Content layer: approved library data is versioned while runtime submission data remains operational.

## API Surface

The frontend communicates with the backend through a stable set of routes for auth, submissions, collection reads, moderation, and library sync.

- Auth routes establish and validate editor sessions.
- Submission routes receive new public contributions.
- Collection routes expose approved public resource entries.
- Admin routes handle review actions, import, and export.

### Example: health

Request:

```bash
curl http://localhost:3001/api/health
```

Response:

```json
{
  "status": "ok"
}
```

### Example: auth login

Request:

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "editor@example.com",
    "password": "your-password"
  }'
```

Response:

```json
{
  "token": "<jwt-token>",
  "editor": {
    "email": "editor@example.com"
  }
}
```

### Example: public resource collection

Request:

```bash
curl http://localhost:3001/api/resources/poetry
```

Response:

```json
[
  {
    "id": "submission-id",
    "collection": "poetry",
    "title": "A village landay about departure",
    "titlePashto": "...",
    "summary": "Short public summary",
    "body": "Full approved body text",
    "tags": ["landay", "oral-tradition"],
    "region": "Kandahar",
    "contributor": "Contributor name",
    "verificationStatus": "community-approved"
  }
]
```

## Versioned Data Export

Approved entries are exported into a versioned library file so content can be reviewed in git and deployed consistently across environments.

- Runtime submissions stay separate from the public approved library.
- Editors export approved content into `data/community-library.json`.
- The versioned file becomes the reviewable public dataset for the site.
- Import support allows the backend to restore approved entries from versioned state.

### Example: export approved entries

Request:

```bash
curl -X POST http://localhost:3001/api/admin/export-approved \
  -H "Authorization: Bearer <token>"
```

Response:

```json
{
  "path": "data/community-library.json",
  "exportedAt": "2026-03-21T17:00:00.000Z",
  "count": 2,
  "library": {
    "exportedAt": "2026-03-21T17:00:00.000Z",
    "entries": {
      "poetry": [],
      "books": [],
      "names": [],
      "media": []
    }
  }
}
```

## Contribution Workflow

The platform accepts submissions openly, but publication stays editor-controlled through a review queue and versioned export step.

- Contributors submit poetry, books, names, and media entries from the resources page.
- Editors review context, quality, duplication, and usage notes before approval.
- Only approved entries appear on public collection pages.
- Editorial notes provide a documented path for corrections or resubmission.

## Maintainer File Map

- `server/index.js`: API route registration for auth, submissions, collections, moderation, import, and export.
- `server/auth.js`: Editor authentication, password verification, JWT issuing, and protected middleware.
- `server/dataStore.js`: Runtime persistence, submission review state, and versioned library import/export behavior.
- `src/lib/communityStorage.ts`: Frontend client wrapper for auth, collection reads, submissions, and moderation actions.
- `data/community-library.json`: Versioned approved public library content intended for review and commit.
- `data/community-submissions.json`: Operational submission state used by the moderation workflow at runtime.

## Operational Pages

- Platform docs page: `/docs`
- Data pipeline: `/pipeline`
- Resources and contribution entry: `/resources#contribute`
- Moderation workspace: `/resources/moderation`

# Change: Add CAPTCHA to user login

- **Slug:** `2026-07-05-login-captcha`
- **Date opened:** 2026-07-05
- **Owner:** (your name)
- **Size:** large
- **Status:** Docs in review

## Summary

Add a CAPTCHA challenge to the user login flow to reduce credential-stuffing and
brute-force attempts. This changes the business rule for how a login attempt is
validated.

## Pipeline

- [x] Product          — PRD updated (docs/product/prd/auth.md)
- [x] Prototype        — login screen prototype updated
- [ ] Architecture     — auth flow + CAPTCHA provider integration
- [ ] Frontend         — CAPTCHA widget, error states, retry logic
- [ ] Backend          — verify token with provider, rate limiting, thresholds
- [ ] DevOps           — provider keys as secrets, env config
- [ ] Project management — task registered in progress.md
- [ ] Implementation   — code written against approved docs

## Affected files

- product/prd/auth.md
- product/prototype/login-flow.md
- architecture/auth-flow.md
- frontend/login.md
- backend/auth-service.md
- devops/secrets-and-env.md

## Snapshot (large changes only)

- Archived to: `docs/_archive/2026-07-05-login-captcha/`
- Manifest: `docs/_archive/2026-07-05-login-captcha/MANIFEST.md`

## Notes / decisions

- Trigger CAPTCHA only after N failed attempts rather than on every login, to
  balance security and UX. Final threshold to be set in the backend design.
- Provider choice (e.g. self-hosted vs third-party) is an architecture decision;
  see architecture/auth-flow.md once drafted.
- This is a worked example. Delete it once you understand the pattern.

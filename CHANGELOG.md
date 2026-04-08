# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

- Placeholder for upcoming changes and planned features

---

## [2.0.0] – 2026-04-08

### ⚠️ Breaking Changes

- API calls are now handled via Netlify Functions instead of client-side requests

### Added

- `CHANGELOG.md` created to track project changes
- Basic `favicon.ico` added
- `.gitignore` added to keep the repository clean
- Clickable header: icon and title now link to homepage
- `rel="noopener noreferrer"` added to external links for improved security
- Local `.env` support added for environment-based configuration
- Netlify Functions added for server-side API requests
- `netlify.toml` added for local and deployment function setup
- Local development workflow documented using Netlify Dev

### Changed

- Changed the app name from `My Bootstrap Weather App` to `ClimaSense - a weather app`
- Weather and forecast API requests moved from client-side to serverless functions
- Forecast implementation updated to use OpenWeather 5-day `/forecast` endpoint (replacing deprecated/limited endpoints)
- External CDN usage updated to pinned versions (no `latest`)
- Subresource Integrity (SRI) added for external scripts and styles
- Deployment setup updated to support environment variables and serverless architecture
- HTML structure improved for semantic correctness and maintainability

### Fixed

- HTML validation errors resolved
- Broken or invalid markup corrected
- Empty and invalid elements adjusted for better accessibility and validation
- API keys removed from frontend code
- Local development corrected to use `Netlify Dev` instead of `Live Server`
- Forecast errors (401 Unauthorized) resolved by switching to supported API endpoint

### Security

- API keys removed from client-side code and stored in environment variables
- API requests routed through Netlify Functions to prevent key exposure
- External dependencies secured with SRI hashes

### Notes

- Project upgraded to a more secure, maintainable, and production-ready architecture
- Improved separation between frontend and backend logic

---

## Legend

- **Added**: new features or components
- **Changed**: updates to existing behavior
- **Deprecated**: soon-to-be removed features
- **Removed**: deprecated features now gone
- **Fixed**: bug fixes
- **Security**: security-related fixes or enhancements
- **Notes**: related comments, limitations, or clarifications

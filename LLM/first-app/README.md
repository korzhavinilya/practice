# Innowise Interview Coach

Dark-mode React interview simulator that captures spoken answers, evaluates them for selected IT roles, and provides senior-level feedback.

## Setup

```bash
npm install
npm run dev
```

## Optional AI Provider

Copy `.env.example` to `.env` and configure:

- `VITE_OPENAI_API_KEY`
- `VITE_OPENAI_BASE_URL`
- `VITE_OPENAI_MODEL`

If no API key is provided, the app uses a local role-based evaluation engine.

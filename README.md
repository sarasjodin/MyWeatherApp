# ClimaSense - My Bootstrap Weather App

## 🚀 Local development

This project uses **Netlify Functions** and environment variables.

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```
OPENWEATHER_API_KEY=your_key_here
OPENWEATHER_FORECAST_API_KEY=your_key_here
```

`.env` is ignored by git and must not be committed.

### 3. Run the project

```
npm run dev
```

With `package.json`:

```
{
  "scripts": {
    "dev": "netlify dev"
  }
}
```

The app will be available at:

`http://localhost:8888`

Do not use `Live Server` or `open index.html` directly.

Netlify Functions only work when running:

```bash
npx netlify dev
```

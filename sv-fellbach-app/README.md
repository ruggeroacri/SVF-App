# SV Fellbach App (Vercel-ready)

Dieses Repository enthält:
- **React-Frontend** (Vite)
- **Serverless Proxy-APIs** unter `/api` (Vercel Functions) mit Cheerio
- **Verifier-Skript** `npm run verify:selectors` (+ `sample/team.html`)

## Deployment (Vercel)
1. Repository zu GitHub/GitLab pushen.
2. Auf https://vercel.com → „New Project“ → Repo wählen.
3. Build Command: `npm run build` (wird automatisch erkannt)
4. Output: `dist` (Vite Standard)
5. Funktionen liegen automatisch unter `/api/*`.

## Lokale Entwicklung
```bash
npm install
npm run dev
# App: http://localhost:5173
# API (in Vercel-Umgebung live). Lokal kannst du die Functions nicht direkt über Vite ausführen.
```

## Selektoren verifizieren
1. Öffne die SV-Fellbach Team-Seite auf fussball.de (Saison 2025/26).
2. Seite als HTML speichern und in `sample/team.html` einfügen.
3. Ausführen:
```bash
npm run verify:selectors
```
Das Skript gibt „Next Match“, Anzahl der Spiele und die ersten Tabellenzeilen aus.

## Hinweise / Fair Use
- Prüfe die **Nutzungsbedingungen** von fussball.de.
- Setze **Caching**: Die Functions senden `s-maxage` Header (60–300s). Bei Bedarf anpassen.
- Selektoren können sich ändern (CSS-Klassen). In dem Fall diese im `/api` und `scripts/verify-selectors.js` anpassen.

Viel Erfolg & Forza SVF! ⚽

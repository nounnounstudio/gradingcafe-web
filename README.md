# gradingcafe.de

Webseite und Browserspiel des Grading Café (Rothenburg ob der Tauber).
Gehostet über **GitHub Pages** aus dem Branch `main`, Ordner `/` (root).

## Wichtige Dateien

| Datei / Ordner | Zweck |
|---|---|
| `index.html` | Die komplette Webseite (Texte, Design, Skripte) |
| `zurueck.js` | Zurück-Taste (Browser/System-Zurück schließt Fenster, springt zum vorherigen Bereich) |
| `spiel/index.html` | Das 3D-Spiel (Stand v2.3) – erreichbar unter gradingcafe.de/spiel |
| `spiel/three.min.js`, `spiel/fonts/` | 3D-Bibliothek und Schriften lokal (keine externen Server, DSGVO) |
| `spiel/manifest.webmanifest`, `spiel/sw.js`, `spiel/icons/` | Installierbar als App + offline spielbar. **Bei jedem Spiel-Update `CACHE` in `sw.js` hochzählen** |
| `KOOP.md` | Wie die Koop-Grundlage funktioniert und was für Online-Koop noch fehlt |
| `media/` | Trailer, Screenshots, Vorschaubild (`og.jpg`), Favicon (`icon.png`) |
| `CNAME` | Enthält `gradingcafe.de` – **nicht löschen**, sonst ist die Domain weg |
| `.nojekyll` | Sagt GitHub, dass die Dateien unverändert ausgeliefert werden |

## Domain (IONOS)

DNS bei IONOS für gradingcafe.de:

- A @ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- CNAME www → nounnounstudio.github.io
- MX-Einträge (E-Mail) bleiben unverändert

In GitHub unter Settings → Pages: Custom domain `gradingcafe.de`, „Enforce HTTPS“ an.

## Häufige Änderungen

- **Instagram-Feed automatisch:** In `index.html` bei `BEHOLD_FEED_ID` die Feed-ID von behold.so eintragen.
  Alternativ einzelne Posts in `INSTA_POSTS` als Links eintragen.
- **Screenshots tauschen:** Bilder in `media/` ersetzen, Liste `SHOTS` in `index.html`.
- **Spiel aktualisieren:** neue Version nach `spiel/index.html` kopieren (Schriften und three.js bleiben lokal).
- **Warteliste (Supabase):** `SUPABASE` in `index.html` ausfüllen.

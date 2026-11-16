# Grading Café – App (Android & iOS)

Gebaut mit **Capacitor 6**. Der App-Inhalt ist das Spiel aus `../spiel/` (wird beim Sync nach `www/` kopiert).

## Wichtige Daten (für jedes Update gleich lassen!)

| Was | Wert |
|---|---|
| Paketname / Bundle-ID | `de.gradingcafe.spiel` |
| App-Name | Grading Café |
| Android-Projekt | `app/android/` (Version in `android/app/build.gradle`: `versionCode` bei jedem Update +1, `versionName`) |
| iOS-Projekt | `app/ios/App/` (Version in Xcode/`Info.plist`: `CFBundleShortVersionString`, Build-Nummer +1) |
| Icons & Splash (Quelle) | `app/assets/` → neu erzeugen mit `npm run assets` |
| Ausrichtung | fest Hochformat (AndroidManifest + Info.plist) |
| Zurück-Taste | Android-Zurück → Browser-Verlauf (`zurueck.js`), auf der Startseite beendet sie die App |
| Signatur-Schlüssel (Android) | **noch anlegen** – Datei `grading-cafe.keystore` + Passwörter sicher aufbewahren, NIE ins Repo |

## Ablauf bei einem Spiel-Update

1. Neues Spiel nach `spiel/index.html` (und in `spiel/sw.js` die CACHE-Version hochzählen)
2. Im Ordner `app/`: `npm install` (einmalig) und `npm run sync`
3. Versionsnummern erhöhen (siehe oben) und bauen (z. B. über Codemagic)

# Grading Café – App (Android & iOS)

Gebaut mit **Capacitor 8** (Android-Ziel-API 36, iOS mit Swift Package Manager, nur iPhone). Der App-Inhalt ist das Spiel aus `../spiel/` (wird beim Sync nach `www/` kopiert).

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
| Signatur-Schlüssel (Android) | `grading-cafe-upload.jks`, Alias `upload` – liegt NICHT im Repo (öffentlich!). Bei Jason gespeichert + in Codemagic als Keystore `grading_cafe_upload` |
| Builds | Codemagic, Datei `codemagic.yaml` im Repo-Hauptordner: Workflows `android-release` (AAB) und `ios-release` (IPA → App Store Connect, API-Schlüssel „Kratzbaum ASC“) |
| Versionsnummer | `VERSION_NAME` in `codemagic.yaml`; Build-Nummer zählt Codemagic automatisch hoch |
| Store-Name | Grading Café: Karten & Kaffee (kostenlos, ohne Werbung, Ko-fi nur im Web) |

## Ablauf bei einem Spiel-Update

1. Neues Spiel nach `spiel/index.html` (und in `spiel/sw.js` die CACHE-Version hochzählen)
2. Im Ordner `app/`: `npm install` (einmalig) und `npm run sync`
3. Versionsnummern erhöhen (siehe oben) und bauen (z. B. über Codemagic)

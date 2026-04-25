# Projekt-Status

## Was ist das?

Eine Einkaufslisten-App für das Handy — Einträge hinzufügen, abhaken, löschen und die ganze Liste auf einmal leeren.

## Typ

PWA (Progressive Web App)

## Version

0.2.0-dev9

## Dateien

- `index.html` — Hauptseite mit HTML-Struktur und Service-Worker-Registrierung
- `style.css` — Alle Styles (Mobile-First, CSS-Variablen für Farben)
- `app.js` — App-Logik (Einträge verwalten, localStorage, Rendering)
- `manifest.json` — PWA-Manifest für Installation auf dem Homescreen
- `service-worker.js` — Offline-Fähigkeit mit Network-First Strategie
- `icons/icon.svg` — App-Icon als SVG
- `SPEC.md` — Technische Spezifikation
- `README.md` — Projektbeschreibung

## Aktueller Stand

Alle geplanten Features sind implementiert:

- ✅ Einträge hinzufügen (Eingabefeld + Button/Enter)
- ✅ Einträge abhaken (Checkbox mit Durchstreichen)
- ✅ Einzelne Einträge löschen (✕-Button)
- ✅ Ganze Liste löschen (mit Sicherheitsabfrage)
- ✅ Daten bleiben nach dem Schließen gespeichert (localStorage)
- ✅ Offline-Nutzung (Service Worker)
- ✅ Installierbar auf dem Handy (PWA)

## Veröffentlichung

- GitHub Pages: aktiv
- URL: https://andrebell.github.io/einkaufsliste/
- PWA: ja

## Offene Punkte

- GitHub Pages einrichten, damit die App auf dem Handy nutzbar ist
- Mögliche Erweiterungen: Kategorien, Sortierung, Mengenangaben

## Letzte Änderung

25.04.2026 — iPhone Safe Areas (Notch/Home-Bereich) farblich angepasst

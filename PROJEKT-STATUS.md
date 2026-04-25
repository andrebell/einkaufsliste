# Projekt-Status

## Was ist das?

Eine Einkaufslisten-App für das Handy — Einträge hinzufügen, abhaken, löschen und die ganze Liste auf einmal leeren.

## Typ

PWA (Progressive Web App)

## Version

0.3.0

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
- ✅ Einträge bearbeiten (Tippen auf den Namen)
- ✅ Ganze Liste löschen (mit Sicherheitsabfrage)
- ✅ Erledigte löschen
- ✅ Alphabetisch sortieren (A–Z)
- ✅ Nutzername einrichten und ändern (☰ Menü im Header)
- ✅ Name bei Einträgen anzeigen (nur bei fremden Einträgen)
- ✅ Liste teilen per Web Share API / Link (Import mit Vorschau-Dialog)
- ✅ Hamburger-Menü (☰) für Aktionen (Teilen, Sortieren, Löschen, Name ändern)
- ✅ Daten bleiben nach dem Schließen gespeichert (localStorage)
- ✅ Offline-Nutzung (Service Worker)
- ✅ Installierbar auf dem Handy (PWA)

## Veröffentlichung

- GitHub Pages: aktiv
- URL: https://andre-bell.de/einkaufsliste/
- PWA: ja

## Offene Punkte

Keine

## Letzte Änderung

25.04.2026 — Version 0.3.0 veröffentlicht

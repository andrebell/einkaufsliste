# Spezifikation: Einkaufsliste

## Überblick

Eine einfache Einkaufslisten-App für den persönlichen Gebrauch auf dem Handy. Einträge können hinzugefügt, abgehakt, einzeln gelöscht und die gesamte Liste auf einmal geleert werden. Die Daten bleiben auch nach dem Schließen der App erhalten.

## Typ

PWA (Progressive Web App) — läuft im Browser, kann auf dem Handy installiert werden und funktioniert auch offline.

## Features

1. **Eintrag hinzufügen** — Eingabefeld mit Bestätigung per Button oder Enter-Taste. Der Eintrag erscheint sofort in der Liste.
2. **Eintrag abhaken** — Per Tippen auf die Checkbox wird ein Eintrag als erledigt markiert. Abgehakte Einträge werden durchgestrichen dargestellt.
3. **Eintrag löschen** — Jeder Eintrag hat einen Löschen-Button, der ihn einzeln von der Liste entfernt.
4. **Ganze Liste löschen** — Ein Button löscht alle Einträge auf einmal. Vor dem Löschen wird eine Sicherheitsabfrage angezeigt.
5. **Daten speichern** — Die Liste wird automatisch im lokalen Speicher des Geräts gespeichert und beim nächsten Öffnen wiederhergestellt.
6. **Offline-Nutzung** — Die App funktioniert auch ohne Internetverbindung (Service Worker mit Network-First Strategie).

## Benutzeroberfläche

- **Kopfbereich**: App-Name "Einkaufsliste" mit einem Einkaufswagen-Symbol
- **Eingabebereich**: Textfeld zum Eintippen + "Hinzufügen"-Button daneben
- **Listenbereich**: Die Einkaufseinträge untereinander. Jeder Eintrag hat links eine Checkbox und rechts einen Löschen-Button.
- **Aktionsbereich**: "Alles löschen"-Button unterhalb der Liste (nur sichtbar wenn Einträge vorhanden)
- **Fußzeile**: Versionsnummer der App

Das Design ist schlicht, mobilfreundlich und gut lesbar mit ausreichend großen Touch-Zielen.

## Technische Details

### Dateien

- `index.html` — Hauptseite mit HTML-Struktur, Meta-Tags und Service-Worker-Registrierung
- `style.css` — Alle Styles, Mobile-First
- `app.js` — Gesamte App-Logik (Einträge verwalten, localStorage, Rendering)
- `manifest.json` — PWA-Manifest für Installation auf dem Homescreen
- `service-worker.js` — Caching mit Network-First Strategie
- `icons/icon.svg` — App-Icon als SVG

### Datenspeicherung

Die Einträge werden als JSON-Array im `localStorage` des Browsers gespeichert. Jeder Eintrag hat eine ID, einen Namen und einen Status (abgehakt oder nicht).

### Technologien

- HTML5, CSS3, JavaScript (Vanilla, kein Framework)
- localStorage für Persistenz
- Service Worker für Offline-Fähigkeit

## Offene Fragen

Keine — die App ist für den persönlichen Gebrauch und hat einen klar definierten Funktionsumfang.

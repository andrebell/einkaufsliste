# Spezifikation: Einkaufsliste

## Überblick

Eine einfache Einkaufslisten-App für den persönlichen Gebrauch auf dem Handy. Einträge können hinzugefügt, abgehakt, einzeln gelöscht und die gesamte Liste auf einmal geleert werden. Die Daten bleiben auch nach dem Schließen der App erhalten.

## Typ

PWA (Progressive Web App) — läuft im Browser, kann auf dem Handy installiert werden und funktioniert auch offline.

## Features

1. **Eintrag hinzufügen** — Eingabefeld mit Bestätigung per kompaktem „+“-Button oder Enter-Taste. Neue Einträge werden oben in der Liste eingefügt und kurz in Blau hervorgehoben (Fade-Animation).
2. **Eintrag abhaken** — Per Tippen auf die Checkbox wird ein Eintrag als erledigt markiert. Abgehakte Einträge werden durchgestrichen dargestellt und gleiten mit einer Slide-Animation ans Ende der Liste.
3. **Eintrag löschen** — Jeder Eintrag hat einen Löschen-Button, der ihn einzeln von der Liste entfernt.
4. **Ganze Liste löschen** — Ein Button löscht alle Einträge auf einmal. Vor dem Löschen wird eine Sicherheitsabfrage angezeigt.
5. **Erledigte löschen** — Ein Button entfernt nur die abgehakten Einträge, die offenen bleiben erhalten.
6. **Alphabetisch sortieren** — Ein Button sortiert die Liste von A–Z. Abgehakte Einträge bleiben unten, werden aber ebenfalls untereinander sortiert. Verwendet deutsche Sortierung (Umlaute korrekt).
7. **Daten speichern** — Die Liste wird automatisch im lokalen Speicher des Geräts gespeichert und beim nächsten Öffnen wiederhergestellt.
8. **Offline-Nutzung** — Die App funktioniert auch ohne Internetverbindung (Service Worker mit Network-First Strategie).

## Benutzeroberfläche

- **Kopfbereich**: App-Name "Einkaufsliste" mit einem Einkaufswagen-Symbol
- **Eingabebereich**: Textfeld zum Eintippen + kompakter „+“-Button daneben
- **Listenbereich**: Die Einkaufseinträge untereinander. Jeder Eintrag hat links eine Checkbox und rechts einen Löschen-Button. Neue Einträge erscheinen oben, abgehakte wandern nach unten.
- **Aktionsbereich**: „A–Z Sortieren"-, „Erledigte löschen"- und „Alles löschen"-Button nebeneinander, sticky am unteren Bildschirmrand fixiert (nur sichtbar wenn Einträge vorhanden)
- **Fußzeile**: Versionsnummer der App

## Design

Farbschema: Metallisches Anthrazit (`#3a3f47`) mit kaltem Blau (`#4a90d9`) als Akzentfarbe. Das Design ist schlicht, mobilfreundlich und gut lesbar mit ausreichend großen Touch-Zielen.

## Offene Fragen

Keine — die App ist für den persönlichen Gebrauch und hat einen klar definierten Funktionsumfang.

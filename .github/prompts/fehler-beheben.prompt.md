---
description: "Hilfe bei Fehlern — wenn etwas nicht funktioniert, nicht richtig aussieht oder eine Fehlermeldung erscheint."
agent: "agent"
argument-hint: "Beschreibe was nicht funktioniert, z.B.: Die Seite zeigt nichts an"
---

Der Nutzer hat ein Problem mit seinem Projekt. Hilf ihm auf Deutsch, den Fehler zu finden und zu beheben.

Lies zuerst die `PROJEKT-STATUS.md` und `SPEC.md` (falls vorhanden), um den Kontext des Projekts zu verstehen.

## Dein Vorgehen

1. **Verstehe das Problem**: Frage nach, was genau passiert (oder nicht passiert). Wenn der Nutzer eine Fehlermeldung hat, lass sie dir zeigen.
2. **Finde die Ursache**: Lies die relevanten Dateien und suche nach dem Fehler. Erkläre dem Nutzer in einfachen Worten, was das Problem ist.
3. **Erkläre den Fehler**: Sage nicht nur was falsch ist, sondern auch WARUM es nicht funktioniert. Nutze einfache Vergleiche.
4. **Dokumentation aktualisieren**: Falls der Fehler eine Änderung an der Funktionsweise verursacht, aktualisiere zuerst die `README.md`, dann die `SPEC.md` und erst dann den Code.
5. **Behebe den Fehler**: Nimm die nötige Änderung am Code vor und erkläre was du geändert hast.
6. **Dev-Version erhöhen**: Erhöhe die Dev-Nummer in `APP_VERSION` (z.B. `0.2.0-dev0` → `0.2.0-dev1`). Bei PWAs auch die Cache-Version im Service Worker anpassen.
7. **Changelog aktualisieren**: Füge einen neuen Eintrag in der `CHANGELOG.md` unter `## [Unreleased]` → `### Fixed` ein (auf Englisch, z.B. `- Empty items could be added to the list`). Falls die Section `### Fixed` dort noch nicht existiert, erstelle sie. Einträge anderer Kategorien kommen unter ihre jeweilige Section (`### Added`, `### Changed`, etc.).
8. **Aktualisiere `PROJEKT-STATUS.md`**: Trage den behobenen Fehler und den aktuellen Stand ein.
9. **Zeige wie man prüft**: Erkläre dem Nutzer, wie er sehen kann ob das Problem gelöst ist.
10. **Veröffentlichen**: Wenn in `PROJEKT-STATUS.md` steht dass GitHub Pages aktiv ist, committe mit beschreibender Nachricht ohne Versionsprefix (z.B. `Fixed display error with empty list`) und pushe — damit der Nutzer auf dem Handy testen kann.
11. **Release anbieten**: Frage ob der Nutzer zufrieden ist. Falls ja, biete an eine neue Version zu schneiden (siehe Best Practices für den Release-Ablauf).
12. **Vorbeugung**: Gib einen kurzen Tipp, wie man diesen Fehler in Zukunft vermeiden kann.

## Wichtige Regeln

- Mache dem Nutzer keine Vorwürfe — Fehler gehören zum Lernen
- Erkläre englische Fehlermeldungen auf Deutsch
- Ändere nur das Nötigste, nicht den ganzen Code umschreiben

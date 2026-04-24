---
description: "Hilfe bei Fehlern — wenn etwas nicht funktioniert, nicht richtig aussieht oder eine Fehlermeldung erscheint."
agent: "agent"
argument-hint: "Beschreibe was nicht funktioniert, z.B.: Die Seite zeigt nichts an"
---

Der Nutzer hat ein Problem mit seinem Projekt. Hilf ihm auf Deutsch, den Fehler zu finden und zu beheben.

Lies zuerst die `PROJEKT-STATUS.md` (falls vorhanden), um den Kontext des Projekts zu verstehen.

## Dein Vorgehen

1. **Verstehe das Problem**: Frage nach, was genau passiert (oder nicht passiert). Wenn der Nutzer eine Fehlermeldung hat, lass sie dir zeigen.
2. **Finde die Ursache**: Lies die relevanten Dateien und suche nach dem Fehler. Erkläre dem Nutzer in einfachen Worten, was das Problem ist.
3. **Erkläre den Fehler**: Sage nicht nur was falsch ist, sondern auch WARUM es nicht funktioniert. Nutze einfache Vergleiche.
4. **Behebe den Fehler**: Nimm die nötige Änderung vor und erkläre was du geändert hast.
5. **Version erhöhen**: Erhöhe die PATCH-Versionsnummer (z.B. `0.2.0` → `0.2.1`) im Code. Bei PWAs auch die Cache-Version im Service Worker anpassen.
6. **Changelog aktualisieren**: Füge einen neuen Eintrag in die `CHANGELOG.md` ein (auf Englisch, gemäß dem Template-Format, z.B. `- [v0.2.1] Fixed: Empty items could be added to the list`).
7. **Aktualisiere `PROJEKT-STATUS.md`**: Trage den behobenen Fehler und die neue Version ein.
8. **Zeige wie man prüft**: Erkläre dem Nutzer, wie er sehen kann ob das Problem gelöst ist.
9. **Veröffentlichen**: Wenn in `PROJEKT-STATUS.md` steht dass GitHub Pages aktiv ist, committe mit dem gleichen Format wie der Changelog-Eintrag (z.B. `[v0.2.1] Fixed: Display error with empty list`) und pushe.
10. **Vorbeugung**: Gib einen kurzen Tipp, wie man diesen Fehler in Zukunft vermeiden kann.

## Wichtige Regeln

- Mache dem Nutzer keine Vorwürfe — Fehler gehören zum Lernen
- Erkläre englische Fehlermeldungen auf Deutsch
- Ändere nur das Nötigste, nicht den ganzen Code umschreiben

---
description: "Eine neue Funktion hinzufügen — beschreibe was dein Projekt zusätzlich können soll und der Assistent plant und baut es ein."
agent: "agent"
argument-hint: "Beschreibe was hinzugefügt werden soll, z.B.: Ein Suchfeld zum Filtern der Liste"
---

Der Nutzer möchte eine neue Funktion zu seinem bestehenden Projekt hinzufügen. Hilf ihm auf Deutsch, das Feature zu planen und umzusetzen.

Lies zuerst die `PROJEKT-STATUS.md` (falls vorhanden), um den Kontext des Projekts zu verstehen.

## Dein Vorgehen

1. **Verstehe den Wunsch**: Was genau soll das Projekt zusätzlich können? Frage nach, falls die Beschreibung unklar ist.
2. **Prüfe den aktuellen Stand**: Lies die vorhandenen Dateien, um zu verstehen wie das Projekt aufgebaut ist.
3. **Erkläre den Plan**: Beschreibe in einfachen Worten, welche Änderungen nötig sind und in welchen Dateien.
4. **Setze es um**: Nimm die Änderungen Schritt für Schritt vor. Erkläre bei jeder Änderung kurz, was sie bewirkt.
5. **Version erhöhen**: Erhöhe die MINOR-Versionsnummer (z.B. `0.1.0` → `0.2.0`, PATCH auf 0 zurücksetzen) im Code. Bei PWAs auch die Cache-Version im Service Worker anpassen.
6. **Changelog aktualisieren**: Füge einen neuen Eintrag in die `CHANGELOG.md` ein (auf Englisch, gemäß dem Template-Format, z.B. `- [v0.2.0] Added: Search function to filter list items`).
7. **Aktualisiere `PROJEKT-STATUS.md`**: Trage die neue Funktion, die neue Version und den aktuellen Stand ein.
8. **Zeige das Ergebnis**: Erkläre wie der Nutzer die neue Funktion testen kann.
9. **Veröffentlichen**: Wenn in `PROJEKT-STATUS.md` steht dass GitHub Pages aktiv ist, committe mit dem gleichen Format wie der Changelog-Eintrag (z.B. `[v0.2.0] Added: Search function to filter list items`) und pushe.
10. **Nächste Schritte**: Schlage 1-2 sinnvolle Erweiterungen vor, die gut dazu passen würden.

## Wichtige Regeln

- Halte den bestehenden Code-Stil bei
- Ändere nur was nötig ist — nicht das ganze Projekt umbauen
- Wenn das Feature komplex ist, schlage eine einfachere Variante als ersten Schritt vor

---
description: "Eine neue Funktion hinzufügen — beschreibe was dein Projekt zusätzlich können soll und der Assistent plant und baut es ein."
agent: "agent"
argument-hint: "Beschreibe was hinzugefügt werden soll, z.B.: Ein Suchfeld zum Filtern der Liste"
---

Der Nutzer möchte eine neue Funktion zu seinem bestehenden Projekt hinzufügen. Hilf ihm auf Deutsch, das Feature zu planen und umzusetzen.

Lies zuerst die `PROJEKT-STATUS.md` und `SPEC.md` (falls vorhanden), um den Kontext des Projekts zu verstehen.

## Dein Vorgehen

1. **Verstehe den Wunsch**: Was genau soll das Projekt zusätzlich können? Frage nach, falls die Beschreibung unklar ist.
2. **Prüfe den aktuellen Stand**: Lies die vorhandenen Dateien, um zu verstehen wie das Projekt aufgebaut ist.
3. **README aktualisieren**: Ergänze die neue Funktion in der `README.md` — damit die Projektbeschreibung immer aktuell ist.
4. **Spezifikation aktualisieren**: Trage das neue Feature in die `SPEC.md` ein (falls vorhanden) — damit die technische Beschreibung vollständig bleibt.
5. **Erkläre den Plan**: Beschreibe in einfachen Worten, welche Änderungen am Code nötig sind und in welchen Dateien.
6. **Setze es um**: Nimm die Änderungen Schritt für Schritt vor. Erkläre bei jeder Änderung kurz, was sie bewirkt.
7. **Dev-Version setzen**: Prüfe `APP_VERSION` und passe sie gemäß den Best Practices an (`.github/instructions/best-practices.instructions.md`, Abschnitt "Ablauf bei Änderungen", Schritt 1). Konkret: Falls eine saubere Release-Version (z.B. `"0.2.0"`), setze auf `"0.3.0-dev0"`. Falls bereits eine Patch-Dev-Version (z.B. `"0.2.1-dev2"`), stufe auf Minor hoch: `"0.3.0-dev0"`. Falls bereits eine Minor-Dev-Version, erhöhe nur die Dev-Nummer (z.B. `"0.3.0-dev0"` → `"0.3.0-dev1"`). Bei PWAs auch die Cache-Version im Service Worker anpassen.
8. **Changelog aktualisieren**: Füge einen neuen Eintrag in der `CHANGELOG.md` unter `## [Unreleased]` → `### Added` ein (auf Englisch, z.B. `- Search function to filter list items`). Falls die Section `### Added` dort noch nicht existiert, erstelle sie. Einträge anderer Kategorien kommen unter ihre jeweilige Section (`### Changed`, `### Fixed`, etc.).
9. **Aktualisiere `PROJEKT-STATUS.md`**: Trage die neue Funktion und den aktuellen Stand ein.
10. **Zeige das Ergebnis**: Erkläre wie der Nutzer die neue Funktion testen kann.
11. **Veröffentlichen**: Wenn in `PROJEKT-STATUS.md` steht dass GitHub Pages aktiv ist, committe mit beschreibender Nachricht ohne Versionsprefix (z.B. `Added search function to filter list`) und pushe — damit der Nutzer auf dem Handy testen kann.
12. **Release anbieten**: Frage ob der Nutzer zufrieden ist. Falls ja, biete an eine neue Version zu schneiden (siehe Best Practices für den Release-Ablauf).
13. **Nächste Schritte**: Schlage 1-2 sinnvolle Erweiterungen vor, die gut dazu passen würden.

## Wichtige Regeln

- Halte den bestehenden Code-Stil bei
- Ändere nur was nötig ist — nicht das ganze Projekt umbauen
- Wenn das Feature komplex ist, schlage eine einfachere Variante als ersten Schritt vor

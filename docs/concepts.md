# Entscheidungen und Designüberlegungen — Vibe Starter

Dieses Dokument fasst alle Überlegungen, Entscheidungen und Abläufe zusammen, die bei der Entwicklung des Vibe-Starter Templates getroffen wurden. Es dient als Referenz für zukünftige Weiterentwicklungen.

---

## 1. Ziel des Repositories

Das Vibe-Starter Repo ist ein **Template**, von dem Anfänger ohne Programmiererfahrung eigene Apps entwickeln können — komplett Copilot-gestützt ("Vibe Coding"). Jedes neue Projekt entsteht als **Fork** dieses Templates.

---

## 2. Dokumentationsstruktur

### Problem

Die `README.md` enthielt die vollständige Anleitung zur Nutzung des Repos. Beim Erstellen einer neuen App überschreibt der `@projektstart`-Agent die README mit der App-Beschreibung → Anleitung geht verloren.

### Lösung

- **`README.md`** (Stammverzeichnis): Kurz, motivierend, ~40 Zeilen. Erklärt in einem Satz was Vibe Starter ist, zeigt die 4 Schritte zum Start, listet die Befehle auf, verlinkt auf die ausführliche Anleitung.
- **`docs/README.md`**: Die vollständige Schritt-für-Schritt Anleitung (VS Code installieren, Fork erstellen, Clonen, Extensions, Agenten/Prompts, Live Server, Tipps, Veröffentlichung). Überlebt das Überschreiben durch den Projektstart-Agent.

### Prinzip

Der `docs/`-Ordner wird von keinem Agenten berührt. Alles im Stammverzeichnis kann sich ändern.

---

## 3. Versionierung — Zwei-Phasen-Modell

### Grundentscheidung

Semantic Versioning (`MAJOR.MINOR.PATCH`), aber mit klarer Trennung zwischen **Entwicklung** und **Release**.

### Entwicklungsphase

- Version hat ein `-devX` Suffix: `0.2.0-dev0`, `0.2.0-dev1`, `0.2.0-dev2`
- Jeder Commit erhöht die Dev-Nummer um 1
- Commits haben **keine** Versionsprefix-Nachricht: `Added search field to filter list`
- Alle Changelog-Einträge landen unter `## [Unreleased]`
- GitHub Pages zeigt den aktuellen Entwicklungsstand
- Im Footer steht z.B. `v0.2.0-dev2` → User weiß: Entwicklungsversion

### Release-Phase

- `-devX` Suffix wird entfernt → saubere Version `0.2.0`
- `[Unreleased]`-Einträge wandern unter `## [0.2.0] - Datum`
- Neuer leerer `## [Unreleased]`-Block wird darüber eingefügt
- Release-Commit mit Prefix: `[v0.2.0] Added: Search and filter, Fixed: Empty list`
- Im Footer steht z.B. `v0.2.0` → User weiß: stabiler Release

### Wann wird die Dev-Version gesetzt?

**Zu Beginn der nächsten Änderung** — nicht nach dem Release. So gibt es keine uncommitteten lokalen Änderungen und bei einem Re-Clone ist alles sauber.

### Beispiel-Ablauf

```
0.1.0-dev0      ← Neues Projekt, erste Entwicklung
0.1.0-dev1      ← Weiterer Commit
0.1.0           ← Erster Release
0.2.0-dev0      ← Nächste Änderung beginnt → Dev-Version wird gesetzt
0.2.0-dev1      ← Weiterer Commit
0.2.0-dev2      ← Bugfix während der Entwicklung
0.2.0           ← Release — alles getestet, fertig
0.3.0-dev0      ← Nächste Änderung beginnt
```

---

## 4. Versions-Upgrade-Regeln

### Die höchste Stufe gewinnt immer

| Aktuelle Dev-Version       | Neue Änderung          | Ergebnis                   |
| -------------------------- | ---------------------- | -------------------------- |
| Sauberer Release (`0.1.0`) | Feature                | `0.2.0-dev0`               |
| Sauberer Release (`0.1.0`) | Bugfix                 | `0.1.1-dev0`               |
| Patch-Dev (`0.1.1-devX`)   | Feature                | **Upgrade** → `0.2.0-dev0` |
| Minor-Dev (`0.2.0-devX`)   | Bugfix                 | Bleibt → `0.2.0-dev(X+1)`  |
| Minor-Dev (`0.2.0-devX`)   | Feature                | Bleibt → `0.2.0-dev(X+1)`  |
| Jede Version               | Major (User bestätigt) | `1.0.0-dev0`               |

### Begründung

- Ein Feature ist "größer" als ein Bugfix → stuft hoch
- Ein Bugfix innerhalb einer Minor-Entwicklung repariert etwas, das noch nicht released wurde → keine Herabstufung
- Major wird **nie automatisch** entschieden — nur auf Rückfrage

### Major-Releases

- Nur bei umfangreichen Updates (3+ Features oder große Umbauten) fragt der Agent nach: "Soll das eine neue Hauptversion werden?"
- Bei wenigen Änderungen (1–2 Features, ein paar Bugfixes) wird nicht gefragt — der Agent bestimmt die Version automatisch

---

## 5. Changelog-Format

### Entscheidung: Keep a Changelog mit Sections

Einträge werden **immer gruppiert** nach Kategorie-Sections (`### Added`, `### Fixed`, etc.) — auch unter `[Unreleased]`. Nicht chronologisch pro Commit.

### Vorteil

Beim Release muss nichts umgebaut werden — die `## [Unreleased]`-Überschrift wird einfach durch `## [0.2.0] - Datum` ersetzt, die Sections bleiben wie sie sind.

### Arbeitsweise

- Neuer Eintrag kommt unter die passende Section-Überschrift
- Falls die Section noch nicht existiert, wird sie angelegt
- Beim Release: Überschrift ersetzen, neuen leeren `## [Unreleased]`-Block darüber einfügen

### Beispiel

```markdown
## [Unreleased]

### Added

- Dark mode toggle in settings

## [0.2.0] - 2026-04-25

### Added

- Search function to filter list items
- Sorting by date and name

### Fixed

- Display error with empty list

## [0.1.0] - 2026-04-20

### Added

- Initial shopping list with add/remove items
```

---

## 6. Testing-Strategie

### Verworfene Optionen

| Option                            | Warum verworfen                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **VS Code Port Forwarding**       | Firewalls, Netzwerkprobleme, Rechte-Einschränkungen — nicht anfängertauglich                                 |
| **Feature Flags (dev/prod Modi)** | Jede Änderung muss ein- und ausgepackt werden. Beim Release vergessene Flags = kaputte App. Unlesbarer Code. |
| **Zwei Ordner (Root + /dev/)**    | Dateien doppelt, Pfad-Fehlerquelle, kein Build-Tool zum Sync                                                 |

### Gewählte Lösung: GitHub Pages IST die Testumgebung

- Jeder Push geht direkt auf GitHub Pages
- Im Footer steht die Versionsnummer mit `-dev` Suffix
- User öffnet die URL auf dem Handy → sieht den aktuellen Stand
- Kein Extra-Setup, keine Firewalls, funktioniert überall

---

## 7. Commit-Strategie

### Während der Entwicklung

```
Added search field to filter list
Fixed display error with empty items
Updated styles for mobile layout
```

Keine Versionsprefixe. Beschreibend, englisch.

### Beim Release

```
[v0.2.0] Added: Search and filter, Fixed: Empty list display
```

Versionsprefix + Zusammenfassung aller Änderungen.

---

## 8. Agenten und Prompts — Übersicht

### Architektur: Unsichtbare Agenten

Die Agent-Dateien (`.agent.md`) dienen als **Workflow-Bibliotheken** — sie enthalten detaillierte Ablaufbeschreibungen für spezialisierte Aufgaben. Der Nutzer wählt aber KEINEN Agenten manuell aus. Stattdessen:

1. Nutzer tippt im Standard-Chat (Default-Agent)
2. `copilot-instructions.md` erkennt die Situation (Projektstart, Feature, Bugfix, etc.)
3. Der Default-Agent liest die passende Agent-Datei on-demand und befolgt deren Workflow
4. Für den Nutzer sieht es aus, als ob alles ein einziger, schlauerAssistent ist

### Workflow-Dateien (Agenten)

| Datei                       | Workflow                                                     | Tools                            |
| --------------------------- | ------------------------------------------------------------ | -------------------------------- |
| `projektstart.agent.md`     | Interaktiver Projektstart (Interview → README → SPEC → Code) | read, edit, execute, search, web |
| `erklaerer.agent.md`        | Code erklären auf Deutsch mit Analogien. Ändert nie Code.    | read, search                     |
| `veroeffentlichen.agent.md` | GitHub Pages einrichten, PWA, Release schneiden              | read, edit, execute, search      |

### Prompts (Schnellbefehle)

Alle Prompts laufen im Default-Agent und verweisen intern auf die Workflow-Dateien:

| Prompt                 | Liest Workflow aus                | Aufgabe                     |
| ---------------------- | --------------------------------- | --------------------------- |
| `/neue-app`            | `projektstart.agent.md`           | Neues Projekt starten       |
| `/feature-hinzufuegen` | (Universeller Änderungs-Workflow) | Feature planen und einbauen |
| `/fehler-beheben`      | (Universeller Änderungs-Workflow) | Fehler finden und beheben   |
| `/veroeffentlichen`    | `veroeffentlichen.agent.md`       | Projekt veröffentlichen     |

### Workflow-Zusammenspiel

1. `/neue-app` → Erstellt README, SPEC, Code, CHANGELOG, PROJEKT-STATUS
2. `/feature-hinzufuegen` → Dev-Version setzen, Code ändern, Changelog unter [Unreleased], Commit+Push
3. `/fehler-beheben` → Dev-Version setzen, Fix, Changelog unter [Unreleased], Commit+Push
4. Wiederhole 2/3 beliebig oft
5. `/veroeffentlichen` → Version schneiden (Release), Push

---

## 9. Reihenfolge bei Änderungen

Immer: **README → SPEC → Code**

So bleibt die Dokumentation aktuell und neue Chat-Sessions verstehen sofort, was die App tut.

---

## 10. Zentrale Projektdateien

| Datei                 | Zweck                                                                   |
| --------------------- | ----------------------------------------------------------------------- |
| `PROJEKT-STATUS.md`   | "Gedächtnis" des Projekts — wird von allen Agenten gelesen und gepflegt |
| `SPEC.md`             | Formale Spezifikation — technische Grundlage für Implementierung        |
| `README.md`           | App-Beschreibung für GitHub-Besucher                                    |
| `CHANGELOG.md`        | Änderungshistorie im Keep a Changelog Format                            |
| `APP_VERSION` (in JS) | Zentrale Versionsnummer, sichtbar im Footer                             |

---

## 11. Technische Entscheidungen

| Thema         | Entscheidung                        | Begründung                              |
| ------------- | ----------------------------------- | --------------------------------------- |
| Stack         | HTML + CSS + JS, kein Framework     | Anfänger, kein Build-Schritt nötig      |
| PWA-Strategie | Network-First + Cache-Versionierung | User sieht immer die neueste Version    |
| Icons         | SVG als Hauptformat                 | Skaliert auf alle Größen                |
| Hosting       | GitHub Pages                        | Kostenlos, einfach, direkt aus dem Repo |

---

## 12. Robustheit — Warum der Workflow agent-unabhängig funktioniert

### Problem

Vier typische Fehlerszenarien bei Anfängern:

1. **Nutzer wählt keinen Agenten**: Tippt einfach drauf los im Standard-Chat.
2. **Nutzer bleibt im `@projektstart`-Chat**: Nach dem ersten Release werden weitere Wünsche vom Projektstart-Agent behandelt.
3. **Nutzer gibt mehrere Wünsche auf einmal**: "Ich hätte gerne A, B, C und D" → Alles wird gleichzeitig eingebaut.
4. **Nutzer kennt keine Befehle**: Weiß nicht, dass `/feature-hinzufuegen` existiert.

### Lösung: Dreistufige Sicherheitsschicht

#### Stufe 1: Situationserkennung in `copilot-instructions.md`

Da `copilot-instructions.md` von **allen** Agenten und dem Default-Agent gelesen wird, ist sie die zentrale Sicherheitsschicht. Sie enthält:

- **Situationserkennung**: Der Agent erkennt was der Nutzer will und liest die passende Workflow-Datei. Statt den Nutzer aufzufordern, einen Agenten zu wählen, handelt der Agent **selbst**.
- **Universeller Änderungs-Workflow**: Gilt IMMER für Änderungen an bestehenden Projekten — egal welcher Agent aktiv ist. Enthält die Regel "Mehrere Wünsche = einzeln abarbeiten" und die feste Reihenfolge pro Änderung.
- **Projekt-Erkennung**: Wenn `PROJEKT-STATUS.md` existiert → Startphase ist vorbei → Neue Wünsche folgen dem Änderungs-Workflow.

#### Stufe 2: Unsichtbare Agenten (On-Demand Reading)

Agent-Dateien werden nicht vom Nutzer ausgewählt, sondern vom Default-Agent **bei Bedarf gelesen**:

```
Nutzer: "Ich möchte eine Einkaufsliste bauen"
  → copilot-instructions.md erkennt: Projektstart
  → Agent liest projektstart.agent.md
  → Befolgt den Workflow daraus
```

```
Nutzer: "Ich hätte gerne ein Suchfeld"
  → copilot-instructions.md erkennt: Feature (PROJEKT-STATUS.md existiert)
  → Agent befolgt den Universellen Änderungs-Workflow
  → README → SPEC → Code → Version → Changelog → Commit
```

#### Stufe 3: Redundanz in Prompt-Dateien

Auch `feature-hinzufuegen.prompt.md` und `fehler-beheben.prompt.md` enthalten explizit die Regel "Mehrere Wünsche = einzeln abarbeiten". So ist der Ablauf selbst dann gesichert, wenn ein Nutzer einen `/`-Befehl nutzt.

### Warum das funktioniert

| Nutzer macht...                | Was greift                                                               |
| ------------------------------ | ------------------------------------------------------------------------ |
| Tippt einfach drauf los        | `copilot-instructions.md` → Situationserkennung → Agent-Datei lesen      |
| Bleibt im alten Chat           | `copilot-instructions.md` → Projekt erkannt → Änderungs-Workflow         |
| Sagt "ich will A, B, C, D"     | Alle Ebenen sagen: "Einzeln abarbeiten"                                  |
| Nutzt `/feature-hinzufuegen`   | Prompt hat den vollständigen Workflow + Einzelabarbeitungs-Regel         |
| Nutzt `/neue-app` nach Release | `projektstart.agent.md` erkennt bestehendes Projekt → Änderungs-Workflow |

---

## 13. Bekannte offene Punkte

### PWA apple-touch-icon mit SVG

iOS unterstützt **kein SVG** als `apple-touch-icon`. Die Agenten erzeugen aktuell nur SVG-Icons. Für vollständige iOS-Unterstützung müsste ein PNG-Fallback erstellt werden (z.B. per Canvas-Export oder als statische Datei). Mittlerer Aufwand.

### Electron-Workflow

Electron-Apps benötigen `npm install` — ein Fremdkörper in der "kein npm"-Philosophie. Der Agent erklärt den Schritt, aber es bleibt ein Bruch im Workflow.

---

## 14. Dateiübersicht des Templates

```
vibe-starter/
├── .github/
│   ├── copilot-instructions.md        ← Globale Copilot-Regeln
│   ├── agents/
│   │   ├── projektstart.agent.md      ← Projektstart-Workflow (wird on-demand gelesen)
│   │   ├── erklaerer.agent.md         ← Erklärungs-Workflow (wird on-demand gelesen)
│   │   └── veroeffentlichen.agent.md  ← Veröffentlichungs-Workflow (wird on-demand gelesen)
│   ├── instructions/
│   │   ├── best-practices.instructions.md  ← Versionierung, Commits, Changelog, PWA
│   │   └── webentwicklung.instructions.md  ← HTML/CSS/JS Regeln
│   └── prompts/
│       ├── neue-app.prompt.md         ← /neue-app
│       ├── feature-hinzufuegen.prompt.md  ← /feature-hinzufuegen
│       ├── fehler-beheben.prompt.md   ← /fehler-beheben
│       └── veroeffentlichen.prompt.md ← /veroeffentlichen
├── .vscode/
│   ├── settings.json                  ← Anfängerfreundliche VS Code Einstellungen
│   └── extensions.json                ← Empfohlene Extensions
├── docs/
│   └── README.md                      ← Ausführliche Anleitung (überlebt Projektstart)
├── .gitignore                         ← OS-Dateien, Editor-Temps, node_modules
├── CHANGELOG.md                       ← Template mit [Unreleased]-Block
└── README.md                          ← Kompakte, motivierende Startseite
```

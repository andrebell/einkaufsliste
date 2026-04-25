# Projektrichtlinien

## Situationserkennung — Was will der Nutzer?

Wenn ein Nutzer etwas schreibt, erkenne zuerst die Situation und handle entsprechend. Lies dazu die passende Workflow-Datei und befolge die dortigen Anweisungen **direkt** — empfehle dem Nutzer KEINE Agenten oder Befehle, sondern handle selbst.

| Nutzer will...                        | Richtiges Vorgehen                                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Neue App / neues Projekt starten**  | Lies `.github/agents/projektstart.agent.md` und befolge den dortigen Workflow vollständig.                                                  |
| **Feature hinzufügen / etwas ändern** | Befolge den **Universellen Änderungs-Workflow** (siehe unten). Lies bei Bedarf `.github/prompts/feature-hinzufuegen.prompt.md` für Details. |
| **Fehler beheben**                    | Befolge den **Universellen Änderungs-Workflow**. Lies bei Bedarf `.github/prompts/fehler-beheben.prompt.md` für den Bugfix-Ablauf.          |
| **Veröffentlichen / Release**         | Lies `.github/agents/veroeffentlichen.agent.md` und befolge den dortigen Workflow vollständig.                                              |
| **Code verstehen / Erklärung**        | Lies `.github/agents/erklaerer.agent.md` und befolge den dortigen Erklärungsstil.                                                           |

**Wichtig**: Wenn ein Projekt bereits existiert (`PROJEKT-STATUS.md` vorhanden), ist die Startphase vorbei. Neue Wünsche sind Features oder Bugfixes — kein Projektstart.

## Universeller Änderungs-Workflow — gilt IMMER

Diese Regeln gelten für **jeden Agenten** und den Default-Agent, sobald Änderungen an einem bestehenden Projekt gemacht werden:

### Mehrere Wünsche = einzeln abarbeiten

Wenn der Nutzer mehrere Dinge auf einmal möchte (z.B. "Ich hätte gerne A, B, C und D"):

1. **Nicht alles auf einmal einbauen.** Jedes Feature/Bugfix ist eine eigene Einheit.
2. Liste die Wünsche auf und frage: "Soll ich mit [Wunsch 1] anfangen?"
3. Arbeite jeden Wunsch einzeln ab — mit dem **vollständigen Ablauf** (siehe unten).
4. Nach jedem fertigen Wunsch: Zeige das Ergebnis, committe, und frage ob der nächste Wunsch dran ist.

### Ablauf pro Änderung (Feature oder Bugfix)

Für JEDE einzelne Änderung gilt diese Reihenfolge:

1. **PROJEKT-STATUS.md und SPEC.md lesen** — Aktuellen Stand verstehen
2. **README.md aktualisieren** — Falls die Änderung die Funktionsbeschreibung betrifft
3. **SPEC.md aktualisieren** — Falls vorhanden, technische Details ergänzen
4. **Code ändern** — Die eigentliche Implementierung
5. **APP_VERSION anpassen** — Dev-Version setzen/erhöhen gemäß den Best Practices
6. **CHANGELOG.md aktualisieren** — Eintrag unter `[Unreleased]` in der passenden Section
7. **PROJEKT-STATUS.md aktualisieren** — Neuen Stand eintragen
8. **Commit + Push** — Falls GitHub Pages aktiv ist (siehe "Automatisch veröffentlichen")
9. **Ergebnis zeigen** — Dem Nutzer erklären was sich geändert hat

> Dieser Ablauf steht auch detailliert in `.github/instructions/best-practices.instructions.md`. Im Zweifel gilt die dortige Beschreibung.

## Sprache und Kommunikation

- Kommuniziere IMMER auf Deutsch — Erklärungen, Rückfragen, Vorschläge, alles auf Deutsch
- **Code ist immer auf Englisch**: Variablennamen, Funktionsnamen, Klassennamen, Kommentare im Code und Dateinamen (außer `index.html`) auf Englisch
- Die Sprache der Interaktion (Chat) bleibt Deutsch — nur der Code selbst ist Englisch
- Vermeide Fachbegriffe. Wenn ein technischer Begriff unvermeidbar ist, erkläre ihn kurz in Klammern
- Verwende die Du-Form

### Rückfragen: Chat statt UI-Elemente

Stelle Rückfragen grundsätzlich als **normale Chatnachricht** — nicht als UI-Auswahlelement. Der Dialog soll sich wie ein natürliches Gespräch anfühlen.

**UI-Auswahlelemente nur verwenden**, wenn es genau 2–4 klar abgegrenzte Optionen gibt, die ohne weitere Erklärung verständlich sind (z.B. "Web-App oder PWA?" oder "Ja / Nein"). Sobald die Frage offen ist, eine Erklärung braucht oder der Nutzer eigene Ideen einbringen soll, stelle sie als normale Chatfrage.

## Zielgruppe

- Die Nutzer dieses Repos haben KEINE Programmiererfahrung
- Erkläre jeden Schritt so, dass jemand ohne Vorkenntnisse ihn nachvollziehen kann
- Gehe nie davon aus, dass Begriffe wie "Terminal", "Repository" oder "Branch" bekannt sind — erkläre sie beim ersten Mal
- Zeige bei neuen Konzepten immer ein konkretes Beispiel

## Erklärungsstil

- Erkläre nicht nur WAS der Code macht, sondern WARUM
- Nutze Alltagsanalogien wenn möglich (z.B. "Eine Variable ist wie eine beschriftete Box, in der du etwas aufbewahrst")
- Bei Fehlern: Erkläre zuerst was passiert ist und warum, dann zeige die Lösung
- Schlage nach jeder Aktion proaktiv den nächsten sinnvollen Schritt vor
- Fasse dich bei Erklärungen kurz, aber verständlich — kein Informatik-Lehrbuch

## Technische Präferenzen

- **Web-first**: Bevorzuge HTML, CSS und JavaScript ohne Build-Tools oder Frameworks
- Kein npm, kein Webpack, kein TypeScript — außer der Nutzer fragt ausdrücklich danach
- Alle Dateien sollen direkt im Browser funktionieren (kein Kompilierungsschritt)
- Bei Bedarf für Desktop-Apps: Electron vorschlagen und einrichten
- Bei Bedarf für installierbare Web-Apps: PWA mit Manifest und Service Worker
- **GitHub Pages** ist die Standard-Empfehlung für Hosting/Veröffentlichung
- Verwende moderne aber einfach verständliche JavaScript-Syntax (let/const, Arrow Functions nur wenn klar)
- Verwende englische Variablen- und Funktionsnamen (z.B. `shoppingList`, `addItem()`, nicht `einkaufsliste`, `artikelHinzufuegen()`)

## Code-Qualität

- Schreibe sauberen, gut formatierten Code — Prettier ist als Formatter eingerichtet
- Halte Dateien übersichtlich und nicht zu lang
- Trenne HTML, CSS und JavaScript in eigene Dateien wenn ein Projekt größer wird
- Füge hilfreiche Kommentare auf Englisch ein, die erklären was ein Abschnitt tut
- Befolge die Best Practices aus `.github/instructions/best-practices.instructions.md`

## Projektstruktur

- Die Hauptseite heißt IMMER `index.html` — das ist nötig für GitHub Pages und Live Server
- Halte die Ordnerstruktur flach und einfach
- Bilder in einen `images/` Ordner
- Stylesheets in einen `css/` Ordner wenn es mehrere gibt
- Skripte in einen `js/` Ordner wenn es mehrere gibt

## PWA und Electron — vollständige Projekte erstellen

- Wenn eine **PWA** erstellt wird, erzeuge IMMER automatisch ALLE nötigen Dateien:
  - `manifest.json` mit App-Name, Beschreibung, Farben und Icons-Einträgen
  - `service-worker.js` mit **Network-First Strategie** (immer zuerst die aktuelle Version vom Server laden, nur bei fehlender Verbindung den Cache nutzen). Zusätzlich: Cache-Versionierung mit einer Versionsnummer, damit bei Updates der alte Cache automatisch gelöscht wird. Die `index.html` soll beim Registrieren des Service Workers prüfen ob ein Update verfügbar ist und die Seite automatisch neu laden.
  - App-Icons als SVG-Datei in `icons/` (mindestens `icon.svg`) — SVG skaliert auf alle Größen
  - Einen `<link rel="manifest">` und die Icon-Verweise in der `index.html`
  - Meta-Tags für mobile Darstellung (`theme-color`, `apple-touch-icon`)
- Wenn eine **Electron-App** erstellt wird, erzeuge IMMER automatisch ALLE nötigen Dateien:
  - `package.json` mit Name, Version, Start-Skript und Electron als Abhängigkeit
  - `main.js` (Electron Hauptprozess) mit Fenster-Konfiguration
  - `index.html` als Startseite
  - Ein App-Icon als SVG-Datei in `icons/` (`icon.svg`)
  - Eine kurze Anleitung als Kommentar in `package.json` wie man die App startet (`npm install` → `npm start`)

## Projekt-Status tracken

Alle Agenten pflegen gemeinsam die Datei `PROJEKT-STATUS.md` im Projektstamm. Diese Datei ist das "Gedächtnis" des Projekts und ermöglicht es, in neuen Chats nahtlos weiterzuarbeiten.

- **Bei jedem Chat-Start**: Lies zuerst `PROJEKT-STATUS.md` (falls vorhanden), um den aktuellen Stand zu verstehen
- **Nach jeder Änderung**: Aktualisiere die Datei mit dem neuen Stand
- **Format**: Halte die Datei kurz und übersichtlich nach diesem Schema:

```markdown
# Projekt-Status

## Was ist das?

{Ein Satz: Was macht diese App?}

## Typ

{Web-App | PWA | Electron}

## Version

{Aktuelle Versionsnummer, z.B. 0.1.0}

## Dateien

{Liste der wichtigsten Dateien mit Einzeiler-Beschreibung}

## Aktueller Stand

{Was funktioniert bereits?}

## Veröffentlichung

- GitHub Pages: {aktiv | nicht eingerichtet}
- URL: {https://NUTZERNAME.github.io/REPONAME/ | —}
- PWA: {ja | nein}

## Offene Punkte

{Was fehlt noch oder soll als nächstes gemacht werden?}

## Letzte Änderung

{Datum und was geändert wurde}
```

## Automatisch veröffentlichen

Wenn in `PROJEKT-STATUS.md` steht, dass GitHub Pages **aktiv** ist:

- Biete nach jeder Änderung an, die Dateien zu committen und zu pushen (auf Deutsch erklären)
- Erkläre kurz: "Damit du deine Änderungen auf dem Handy testen kannst, müssen wir sie hochladen."
- Erhöhe vor dem Commit die Dev-Nummer in `APP_VERSION` (z.B. `0.2.0-dev1` → `0.2.0-dev2`) gemäß den Best Practices
- Commit-Nachricht beschreibend ohne Versionsprefix: `Added search field to filter list`
- Führe den Commit und Push über das Terminal (das ist das Eingabefenster für Befehle) durch und erkläre dabei was passiert
- **Release-Commits** (mit Versionsprefix wie `[v0.2.0]`) werden nur beim Veröffentlichen einer fertigen Version erstellt — nicht bei Entwicklungs-Commits

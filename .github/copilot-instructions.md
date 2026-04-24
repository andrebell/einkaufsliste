# Projektrichtlinien

## Sprache und Kommunikation

- Kommuniziere IMMER auf Deutsch — Erklärungen, Rückfragen, Vorschläge, alles auf Deutsch
- **Code ist immer auf Englisch**: Variablennamen, Funktionsnamen, Klassennamen, Kommentare im Code und Dateinamen (außer `index.html`) auf Englisch
- Die Sprache der Interaktion (Chat) bleibt Deutsch — nur der Code selbst ist Englisch
- Vermeide Fachbegriffe. Wenn ein technischer Begriff unvermeidbar ist, erkläre ihn kurz in Klammern
- Verwende die Du-Form

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
- Erkläre kurz: "Damit deine Änderungen auch auf der veröffentlichten Seite sichtbar werden, müssen wir sie hochladen."
- Erhöhe vor dem Commit die Versionsnummer (Feature → Minor, Bugfix → Patch) gemäß den Best Practices
- Commit-Nachricht IMMER mit Versionsprefix: `[v0.2.0] Beschreibung der Änderung`
- Führe den Commit und Push über das Terminal (das ist das Eingabefenster für Befehle) durch und erkläre dabei was passiert

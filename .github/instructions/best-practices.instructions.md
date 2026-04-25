---
description: "Best Practices für Versionierung, PWA, Deployment und Commits. Wird von allen Agenten und Prompts referenziert. Enthält bewährte Vorgehensweisen für Projekte in diesem Repo."
applyTo: "**/*.html,**/*.css,**/*.js,**/*.json"
---

# Best Practices

## Reihenfolge bei Änderungen: README → SPEC → Code

Bei jeder Änderung am Projekt gilt die Reihenfolge:

1. **README.md** — Projektbeschreibung aktualisieren (was die App kann, für wen sie ist)
2. **SPEC.md** — Spezifikation aktualisieren (technische Details, Feature-Liste)
3. **Code** — Implementierung anpassen

So bleibt die Dokumentation immer aktuell und Agenten in neuen Chats verstehen sofort, was die App tut und wie sie aufgebaut ist.

## Versionierung

Jedes Projekt hat eine Versionsnummer nach dem Schema `MAJOR.MINOR.PATCH` (z.B. `1.0.0`).

- **Neues Projekt**: Startet bei `0.1.0`
- **Neues Feature hinzugefügt** → MINOR erhöhen: `0.1.0` → `0.2.0` (PATCH auf 0 zurücksetzen)
- **Fehler behoben** → PATCH erhöhen: `0.2.0` → `0.2.1`
- **Große Änderung / erster Release** → MAJOR erhöhen: `0.9.0` → `1.0.0`

### Zwei Phasen: Entwicklung und Release

**Entwicklung**: Nach einem Release bekommt die Version sofort ein `-dev0` Suffix. Jeder weitere Commit während der Entwicklung erhöht die Dev-Nummer: `-dev1`, `-dev2`, usw. So sieht der Nutzer im Footer, ob er den aktuellsten Entwicklungsstand geladen hat.

**Release**: Wenn der Nutzer zufrieden ist und veröffentlichen will, wird das `-devX` Suffix entfernt und eine saubere Versionsnummer vergeben. Die `[Unreleased]`-Einträge im Changelog wandern unter die neue Version.

Beispiel-Ablauf:

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

### Wo die Version gespeichert wird

Die Versionsnummer wird an **einer** zentralen Stelle im JavaScript definiert und von dort aus überall verwendet:

```javascript
// Current app version
const APP_VERSION = "0.1.0";
```

### Version in der App anzeigen

Die Versionsnummer MUSS immer sichtbar in der App angezeigt werden — z.B. klein im Footer oder in einem Info-Bereich. So können Nutzer auf dem Handy prüfen, ob sie die aktuelle Version sehen oder eine veraltete Cache-Version. Wenn `-dev` in der Version steht, weiß der Nutzer: Das ist ein Entwicklungsstand.

Beispiel:

```html
<footer>
  <small class="version-display">v<span id="app-version"></span></small>
</footer>
```

```javascript
document.querySelector("#app-version").textContent = APP_VERSION;
```

### Version bei PWAs im Service Worker

Bei PWAs muss die Versionsnummer auch im `service-worker.js` als Cache-Name verwendet werden:

```javascript
const CACHE_VERSION = "v0.1.0";
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;
```

Bei jedem Versionsupdate (auch bei Dev-Versionen) wird so automatisch der alte Cache gelöscht.

## Commits

### Während der Entwicklung (Dev-Phase)

Commits bekommen eine beschreibende Nachricht **ohne** Versionsprefix:

- `Added search field to filter list`
- `Fixed display error with empty items`
- `Updated styles for mobile layout`

Die Dev-Nummer in `APP_VERSION` wird bei jedem Commit um 1 erhöht (z.B. `0.2.0-dev1` → `0.2.0-dev2`). Bei PWAs wird auch die Cache-Version im Service Worker angepasst.

### Beim Release

Der Release-Commit bekommt die Versionsnummer als Prefix:

- **Format**: `[v0.2.0] Added: Search and filter, Fixed: Empty list display`
- Der Commit enthält: Saubere Version in `APP_VERSION`, aktualisierter Changelog, aktualisierte `PROJEKT-STATUS.md`

### Ablauf bei Änderungen (Feature / Bugfix)

1. **Dev-Version prüfen**: Falls `APP_VERSION` aktuell eine saubere Release-Version ist (z.B. `"0.2.0"` ohne `-dev`), zuerst auf die nächste Dev-Version setzen (z.B. `"0.3.0-dev0"` für Features, `"0.2.1-dev0"` für Bugfixes). Falls bereits eine Dev-Version gesetzt ist, die Dev-Nummer um 1 erhöhen (z.B. `0.3.0-dev0` → `0.3.0-dev1`). **Upgrade-Regel**: Wenn ein Feature hinzukommt und die aktuelle Dev-Version eine Patch-Version ist (z.B. `0.2.1-dev2`), auf Minor hochstufen und Dev-Nummer zurücksetzen (z.B. `0.3.0-dev0`). In die andere Richtung wird nicht herabgestuft — die höchste Stufe gewinnt immer.
2. `README.md` aktualisieren (falls die Änderung die Funktionsbeschreibung betrifft)
3. `SPEC.md` aktualisieren (falls vorhanden)
4. Änderungen am Code vornehmen
5. Bei PWA: Cache-Version im Service Worker ebenfalls anpassen
6. Eintrag unter `[Unreleased]` in `CHANGELOG.md` hinzufügen
7. `PROJEKT-STATUS.md` aktualisieren
8. Commit mit beschreibender Nachricht (ohne Versionsprefix)
9. Bei aktivem GitHub Pages: Push durchführen, damit der Nutzer auf dem Handy testen kann

> **Wichtig**: Die Dev-Version wird immer zu Beginn einer Änderung gesetzt — nicht nach einem Release. So gibt es keine uncommitteten Änderungen auf dem Rechner.

### Ablauf beim Release (Version schneiden)

1. **Major-Prüfung**: Zähle die Einträge unter `[Unreleased]` im Changelog. Wenn es viele Änderungen sind (ab ca. 3+ Features oder umfangreiche Umbauten), frage den Nutzer: "Das ist ein umfangreiches Update. Soll das eine neue Hauptversion werden (z.B. 1.0.0)?" Bei wenigen Änderungen (1–2 Features, ein paar Bugfixes) diese Frage überspringen und die Version automatisch bestimmen.
2. Nächste Versionsnummer bestimmen (Feature → Minor, Bugfix → Patch — oder Major falls vom Nutzer bestätigt)
3. `APP_VERSION` auf die saubere Version setzen (z.B. `"0.2.0"` statt `"0.2.0-dev3"`)
4. Bei PWA: Cache-Version im Service Worker anpassen
5. In `CHANGELOG.md`: `[Unreleased]`-Einträge unter neue Versionsüberschrift verschieben (z.B. `## [0.2.0]`)
6. `PROJEKT-STATUS.md` aktualisieren
7. Release-Commit: `[v0.2.0] Zusammenfassung der Änderungen`
8. Push durchführen

## Changelog

Jedes Projekt führt eine `CHANGELOG.md` im Projektstamm. Sie dokumentiert alle Änderungen chronologisch. Ein Template mit dem Format liegt bereits im Repo.

### Format

Basiert auf [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Sprache: Englisch.

Kategorien:

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

### Arbeitsweise

- **Während der Entwicklung**: Einträge landen unter `## [Unreleased]`, gruppiert nach Kategorie-Sections (`### Added`, `### Fixed`, etc.). Falls eine Section noch nicht existiert, wird sie angelegt. Neue Einträge werden unten in der jeweiligen Section angefügt.
- **Beim Release**: Die `## [Unreleased]`-Überschrift wird durch die neue Versionsüberschrift mit Datum ersetzt (z.B. `## [0.2.0] - 2026-04-25`). Die Sections und Einträge darunter bleiben unverändert. Danach wird ein neuer leerer `## [Unreleased]`-Block darüber eingefügt.
- Mehrere Änderungen können sich unter `[Unreleased]` sammeln → eine gemeinsame Version

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

Beim **Erstellen eines neuen Projekts** wird das vorhandene `CHANGELOG.md` Template beibehalten und der erste Eintrag ergänzt.

## PWA — Network-First Strategie

Service Worker müssen immer die **Network-First Strategie** verwenden:

1. **Zuerst** versuchen, die Datei vom Server zu laden (aktuelle Version)
2. **Nur wenn offline**: Die gespeicherte Version aus dem Cache verwenden
3. **Bei jedem Update**: Alten Cache löschen, neuen Cache anlegen

Der Service Worker soll bei der Installation den alten Cache automatisch aufräumen:

```javascript
// On activation: delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      ),
  );
});
```

Die `index.html` soll bei der Service-Worker-Registrierung auf Updates prüfen und die Seite automatisch neu laden:

```javascript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").then((registration) => {
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "activated") {
          window.location.reload();
        }
      });
    });
  });
}
```

## Barrierefreiheit auf Mobilgeräten

- Eingabefelder (`input`, `textarea`, `select`) brauchen mindestens `font-size: 16px` — sonst zoomt iOS beim Antippen automatisch rein
- Viewport Meta-Tag mit `maximum-scale=5.0` setzen (nicht `1.0` — das verhindert manuelles Zoomen und ist schlecht für die Barrierefreiheit)
- Touch-Ziele (Buttons, Links) mindestens 44×44px groß machen

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

### Wo die Version gespeichert wird

Die Versionsnummer wird an **einer** zentralen Stelle im JavaScript definiert und von dort aus überall verwendet:

```javascript
// Current app version
const APP_VERSION = "0.1.0";
```

### Version in der App anzeigen

Die Versionsnummer MUSS immer sichtbar in der App angezeigt werden — z.B. klein im Footer oder in einem Info-Bereich. So können Nutzer auf dem Handy prüfen, ob sie die aktuelle Version sehen oder eine veraltete Cache-Version.

Beispiel:

```html
<footer>
  <small class="version-display">Version <span id="app-version"></span></small>
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

Bei jedem Versionsupdate wird so automatisch der alte Cache gelöscht.

## Commits und Versionierung

Jeder Commit bekommt die Versionsnummer und Kategorie als Prefix in der Commit-Nachricht — im gleichen Format wie der Changelog:

- **Format**: `[v0.2.0] Added: Search function to filter list items`
- **Bei Fehlerbehebung**: `[v0.2.1] Fixed: Display error with empty list`

### Ablauf bei Änderungen

1. `README.md` aktualisieren (falls die Änderung die Funktionsbeschreibung betrifft)
2. `SPEC.md` aktualisieren (falls vorhanden)
3. Änderungen am Code vornehmen
4. Versionsnummer im Code erhöhen (Feature → Minor, Bugfix → Patch)
5. Bei PWA: Cache-Version im Service Worker ebenfalls anpassen
6. `CHANGELOG.md` aktualisieren (neuen Eintrag oben hinzufügen)
7. `PROJEKT-STATUS.md` aktualisieren
8. Commit mit Versionsprefix erstellen
9. Bei aktivem GitHub Pages: Push durchführen

## Changelog

Jedes Projekt führt eine `CHANGELOG.md` im Projektstamm. Sie dokumentiert alle Änderungen chronologisch. Ein Template mit dem Format liegt bereits im Repo.

- **Bei jeder Änderung** (Feature, Bugfix, Anpassung): Neuen Eintrag **oben** in der Liste anfügen (neueste Änderung zuerst)
- **Sprache**: Englisch (Entwicklungsdokument)
- **Format**: Dem Template in `CHANGELOG.md` folgen — Kategorien wie `Added`, `Changed`, `Fixed`, `Removed` verwenden
- **Beispiel**: `- [v0.2.0] Added: Search function to filter list items`
- Sollten sich mehrere Änderungen in einer Version ansammeln, können sie unter der gleichen Versionsnummer gruppiert werden. Hierfür können die Einträge wie `Added: xyz` oder `Fixed: abc` als eine eingerückte Liste unter der Versionsnummer formatiert werden.

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

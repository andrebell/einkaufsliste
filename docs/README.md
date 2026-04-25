# Vibe Starter — Baue deine eigenen Apps mit KI-Unterstützung

Willkommen! Dieses Projekt ist dein Startpunkt, um mit Hilfe von **GitHub Copilot** eigene Apps, Webseiten und Tools zu bauen — ganz ohne Programmiererfahrung.

## Was ist Vibe Coding?

"Vibe Coding" bedeutet: Du beschreibst in normaler Sprache, was du bauen möchtest, und die KI (GitHub Copilot) schreibt den Code für dich. Du sagst zum Beispiel _"Ich möchte eine Einkaufsliste, bei der ich Sachen abhaken kann"_ — und Copilot erstellt die nötigen Dateien.

Du brauchst dafür **keine** Programmierkenntnisse. Copilot erklärt dir jeden Schritt.

---

## Was du brauchst

1. **Einen Computer** mit Windows, Mac oder Linux
2. **Ein GitHub-Konto** (kostenlos) → [github.com](https://github.com)
3. **GitHub Copilot Zugang** → Kostenlos für Privatpersonen oder über dein Unternehmen/Schule
4. **Visual Studio Code** (kurz "VS Code") → Eine kostenlose App zum Arbeiten mit Code

---

## Einrichtung Schritt für Schritt

### 1. VS Code installieren

VS Code ist die App, in der du arbeiten wirst — eine Art "Werkbank" für dein Projekt.

1. Gehe auf [code.visualstudio.com](https://code.visualstudio.com)
2. Klicke auf den großen Download-Button
3. Installiere die heruntergeladene Datei (einfach den Anweisungen folgen)
4. Öffne VS Code nach der Installation

### 2. Eigene Kopie dieses Projekts erstellen (Fork)

Dieses Projekt (in der Fachsprache "Repository" oder kurz "Repo" — eine Art Projektordner in der Cloud) ist deine **Vorlage**. Für jedes neue Projekt erstellst du eine eigene Kopie davon. Das nennt man "Fork" — wie eine Abzweigung, die dir gehört.

1. Stelle sicher, dass du bei [github.com](https://github.com) eingeloggt bist
2. Klicke oben rechts auf dieser Seite auf den Button **"Fork"**
3. Gib deinem Projekt einen passenden Namen (z.B. `meine-einkaufsliste` oder `rezepte-app`)
4. Klicke auf **"Create fork"** — fertig! Du hast jetzt deine eigene Kopie

### 3. Dein Projekt in VS Code öffnen

Jetzt holst du dein neues Projekt auf deinen Computer:

1. Gehe zu deinem neuen Fork auf GitHub (du wirst automatisch dorthin weitergeleitet)
2. Klicke auf den grünen Button **"<> Code"** und kopiere die angezeigte URL (den Link)
3. Öffne VS Code und drücke **Strg + Umschalt + P** (Windows) bzw. **Cmd + Umschalt + P** (Mac) — es öffnet sich ein Suchfeld oben im Fenster
4. Tippe **"Git: Clone"** ein und wähle den Eintrag aus
5. Füge die kopierte URL ein und drücke Enter
6. Wähle einen Ordner auf deinem Computer, in dem das Projekt gespeichert werden soll
7. VS Code fragt, ob du das Projekt öffnen möchtest — klicke auf **"Öffnen"**

> **Tipp:** Für jedes neue Projekt wiederholst du einfach Schritt 2 und 3 — so hast du immer einen frischen Startpunkt mit allen Voreinstellungen.

### 4. Empfohlene Erweiterungen installieren

Beim ersten Öffnen zeigt VS Code eine Meldung: _"Dieses Repository empfiehlt Erweiterungen..."_

**Klicke auf "Installieren"** — dadurch werden hilfreiche Werkzeuge eingerichtet:

| Erweiterung               | Was sie tut                                                      |
| ------------------------- | ---------------------------------------------------------------- |
| **GitHub Copilot Chat**   | Das Chatfenster, in dem du mit der KI sprechen kannst            |
| **Live Server**           | Zeigt deine Webseite im Browser mit automatischer Aktualisierung |
| **Live Preview**          | Zeigt eine Vorschau direkt in VS Code                            |
| **Prettier**              | Formatiert deinen Code automatisch ordentlich                    |
| **vscode-icons**          | Macht die Dateisymbole schöner und übersichtlicher               |
| **GitHub Pull Requests**  | Hilft bei der Zusammenarbeit über GitHub                         |
| **Deutsches Sprachpaket** | Stellt die VS Code Oberfläche auf Deutsch um                     |

### 5. Copilot Chat öffnen

So öffnest du das Chat-Fenster, in dem du mit der KI sprechen kannst:

- Klicke auf das **Chat-Symbol** in der Titelleiste von VS Code
- Oder drücke **Strg + Umschalt + I** (Windows) bzw. **Cmd + Umschalt + I** (Mac)

---

## So startest du dein erstes Projekt

### Der schnellste Weg: Tippe `/neue-app`

1. Öffne den Copilot Chat (siehe oben)
2. Tippe `/neue-app` und drücke Enter
3. Beschreibe deine Idee, z.B.: _"Eine Einkaufsliste für mein Handy"_
4. Der Assistent stellt dir ein paar Fragen und erstellt dann alles für dich

### Oder starte ein Gespräch

Du kannst auch einfach im Chat beschreiben, was du bauen möchtest. Copilot versteht Deutsch und führt dich durch den Prozess.

---

## Verfügbare Assistenten und Befehle

### Assistenten (Agenten)

In der Agent-Auswahl im Chat findest du spezialisierte Helfer:

| Assistent             | Wann benutzen                                      |
| --------------------- | -------------------------------------------------- |
| **@projektstart**     | Du willst ein neues Projekt starten                |
| **@erklaerer**        | Du willst verstehen, was der Code macht            |
| **@veroeffentlichen** | Du willst dein Projekt im Internet veröffentlichen |

### Schnellbefehle (Prompts)

Tippe `/` im Chat um diese Befehle zu sehen:

| Befehl                 | Wann benutzen                           |
| ---------------------- | --------------------------------------- |
| `/neue-app`            | Ein neues Projekt von Null starten      |
| `/fehler-beheben`      | Etwas funktioniert nicht richtig        |
| `/feature-hinzufuegen` | Du möchtest eine neue Funktion einbauen |
| `/veroeffentlichen`    | Dein Projekt soll online gehen          |

---

## Dein Projekt im Browser ansehen

Nachdem Dateien erstellt wurden, kannst du dein Ergebnis sofort ansehen:

1. Klicke mit der rechten Maustaste auf deine `.html`-Datei
2. Wähle **"Open with Live Server"**
3. Dein Browser öffnet sich automatisch mit deiner Seite
4. Jede Änderung wird sofort sichtbar — du musst nicht neu laden

---

## Tipps für den Anfang

- **Hab keine Angst vor Fehlern** — tippe `/fehler-beheben` und Copilot hilft dir
- **Frag nach Erklärungen** — wähle `@erklaerer` wenn du verstehen willst, was passiert
- **Speichern passiert automatisch** — deine Dateien werden automatisch gespeichert
- **Probiere Sachen aus** — du kannst Änderungen immer rückgängig machen (Strg+Z)
- **Beschreibe was du willst, nicht wie** — "Ich möchte einen Button der die Farbe wechselt" ist besser als "Schreibe eine JavaScript Funktion"

---

## Projekt veröffentlichen

Wenn dein Projekt fertig ist und du es mit anderen teilen möchtest:

1. Tippe `/veroeffentlichen` im Chat
2. Der Assistent prüft dein Projekt und führt dich durch die Veröffentlichung
3. Danach ist deine App unter `https://DEINNAME.github.io/PROJEKTNAME/` erreichbar

---

## Hilfe und Fragen

Wenn du nicht weiter kommst:

1. Beschreibe dein Problem im Copilot Chat — so genau wie möglich
2. Nutze `/fehler-beheben` wenn etwas nicht funktioniert
3. Nutze `@erklaerer` wenn du etwas verstehen möchtest

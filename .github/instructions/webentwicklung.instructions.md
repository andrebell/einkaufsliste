---
description: "Regeln für Webentwicklung mit HTML, CSS und JavaScript. Wird automatisch angewendet wenn HTML-, CSS- oder JS-Dateien erstellt oder bearbeitet werden."
applyTo: "**/*.html,**/*.css,**/*.js"
---

# Webentwicklung — Regeln für HTML, CSS und JavaScript

## HTML

- Verwende semantische HTML-Elemente (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`) statt überall `<div>`
- Setze immer `lang="de"` im `<html>` Tag
- Setze immer `<meta charset="UTF-8">` und `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">`
- Jedes `<img>` braucht ein `alt`-Attribut (Beschreibung des Bildes für Barrierefreiheit)
- Verwende `<button>` für klickbare Elemente, nicht `<div>` mit Click-Event
- Verlinke CSS mit `<link>` und JavaScript mit `<script src="..." defer>`

## CSS

- Verwende einfache, beschreibende Klassennamen auf Englisch (`.main-menu`, `.shopping-item`, `.active`)
- Nutze CSS-Variablen für Farben und wiederkehrende Werte im `:root`-Block
- Verwende `rem` statt `px` für Schriftgrößen (besser für Barrierefreiheit)
- Eingabefelder (`input`, `textarea`, `select`) müssen mindestens `font-size: 16px` haben — sonst zoomt das Handy beim Antippen automatisch rein
- Nutze Flexbox oder Grid für Layouts — kein `float`
- Schreibe Mobile-First: Basis-Styles für Handys, `@media`-Queries für größere Bildschirme
- Halte die Selektoren einfach — keine tief verschachtelten Ketten

## JavaScript

- Verwende `const` für Werte die sich nicht ändern, `let` für Werte die sich ändern. Kein `var`
- Verwende `document.querySelector()` statt `document.getElementById()`
- Nutze `addEventListener()` statt `onclick`-Attribute im HTML
- Schreibe Kommentare im Code auf Englisch
- Verwende englische Variablen- und Funktionsnamen (camelCase: `shoppingList`, `addItem()`)
- Verwende `async/await` statt verschachtelte `.then()`-Ketten wenn Daten geladen werden
- Kein jQuery, kein React, kein Framework — nur reines JavaScript (außer der Nutzer fragt explizit)

## Barrierefreiheit

- Ausreichender Farbkontrast zwischen Text und Hintergrund
- Interaktive Elemente müssen per Tastatur bedienbar sein
- Formulare brauchen `<label>`-Elemente die mit `for` auf das Eingabefeld verweisen

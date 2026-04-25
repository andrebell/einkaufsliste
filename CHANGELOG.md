# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.1] - 2026-04-25

### Fixed

- iPhone notch area now shows dark header color in Safari (body background set to header color, main/footer have their own light background)

## [0.3.0] - 2026-04-25

### Fixed

- Dialogs (name, import) were always visible because CSS `.hidden` class was overridden by `.dialog-overlay`

### Changed

- Header title is now left-aligned
- Action buttons moved from sticky bottom bar into a ☰ hamburger menu in the header
- "Name ändern" is now a menu item instead of a separate icon
- Own name is no longer shown below your own items (only shows for items from others)
- Cleaned up dropdown menu: removed divider lines between items
- Cleaned up import dialog: removed border and lines, using bullet points instead

### Added

- Inline editing: tap on an item name to edit it (confirm with Enter, cancel with Escape)
- Username setup on first visit with dialog prompt
- Settings button (gear icon) in header to change username
- Items now store and display who added them (shown below item name)
- Share button to send the list via Web Share API (AirDrop, WhatsApp, etc.)
- Import dialog: opening a shared link shows a preview and adds items to the list

## [0.2.0] - 2026-04-25

### Added

- New items are inserted at the top of the list
- New items briefly highlight in blue before fading to white
- Checked items animate and move to the bottom of the list
- Sort button to order the list alphabetically (A–Z)
- Button to delete only checked items

### Fixed

- Items no longer appear crossed out but unchecked after animation
- Sort and clear buttons no longer stay dark after tapping on mobile
- iPhone safe area support (notch and home indicator area match app colors)

## [0.1.0] - 2026-04-25

### Added

- Initial shopping list app with add, check off, delete, and clear all functionality
- PWA support with offline capability (Network-First strategy)
- Data persistence using localStorage
- Mobile-friendly responsive design

### Changed

- Color scheme to metallic anthracite with cold blue accents
- Clear all button styled to match anthracite theme (no more red border)
- Replaced "Hinzufügen" button text with compact "+" icon

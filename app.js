// Current app version
const APP_VERSION = "0.3.0-dev9";

// Storage key for localStorage
const STORAGE_KEY = "shopping-list";
const USERNAME_KEY = "user-name";

// Track whether an animation is currently running
let animating = false;

// DOM elements
const addForm = document.querySelector("#add-form");
const itemInput = document.querySelector("#item-input");
const shoppingList = document.querySelector("#shopping-list");
const clearAllBtn = document.querySelector("#clear-all-btn");
const clearCheckedBtn = document.querySelector("#clear-checked-btn");
const sortBtn = document.querySelector("#sort-btn");
const appVersionDisplay = document.querySelector("#app-version");
const settingsBtn = document.querySelector("#settings-btn");
const menuBtn = document.querySelector("#menu-btn");
const dropdownMenu = document.querySelector("#dropdown-menu");
const nameDialog = document.querySelector("#name-dialog");
const nameDialogTitle = document.querySelector("#name-dialog-title");
const nameForm = document.querySelector("#name-form");
const nameInput = document.querySelector("#name-input");
const shareBtn = document.querySelector("#share-btn");
const importDialog = document.querySelector("#import-dialog");
const importInfo = document.querySelector("#import-info");
const importPreview = document.querySelector("#import-preview");
const importConfirmBtn = document.querySelector("#import-confirm-btn");
const importCancelBtn = document.querySelector("#import-cancel-btn");

// Show the app version in the footer
appVersionDisplay.textContent = APP_VERSION;

// ===========================
// Data — Load and save items
// ===========================

// Load the shopping list from localStorage
function loadItems() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save the shopping list to localStorage
function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// The shopping list data (array of item objects)
let items = loadItems();

// ===========================
// Rendering — Display items on screen
// ===========================

// Sort items: unchecked first, checked last (preserving order within each group)
function sortByChecked() {
  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);
  items = [...unchecked, ...checked];
}

// Render the entire shopping list
function renderList() {
  shoppingList.innerHTML = "";

  // Show empty state if no items
  if (items.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.className = "empty-message";
    emptyMsg.textContent = "Deine Liste ist leer — füge etwas hinzu!";
    shoppingList.appendChild(emptyMsg);
    return;
  }

  // Create a list item for each entry
  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "shopping-item" + (item.checked ? " checked" : "");

    // Checkbox to mark as done
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked;
    checkbox.setAttribute("aria-label", "Abhaken: " + item.name);
    checkbox.addEventListener("change", () => toggleItem(item.id));

    // Item name (tap to edit)
    const nameSpan = document.createElement("span");
    nameSpan.className = "item-name";
    nameSpan.textContent = item.name;
    nameSpan.addEventListener("click", () => startEditItem(item.id, nameSpan));

    // Item text container (name + added-by)
    const textContainer = document.createElement("div");
    textContainer.className = "item-text";
    textContainer.appendChild(nameSpan);

    // Show who added the item (only if it's someone else)
    if (item.addedBy && item.addedBy !== loadUsername()) {
      const addedBySpan = document.createElement("span");
      addedBySpan.className = "item-added-by";
      addedBySpan.textContent = item.addedBy;
      textContainer.appendChild(addedBySpan);
    }

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.innerHTML = "✕";
    deleteBtn.setAttribute("aria-label", "Löschen: " + item.name);
    deleteBtn.addEventListener("click", () => deleteItem(item.id));

    li.appendChild(checkbox);
    li.appendChild(textContainer);
    li.appendChild(deleteBtn);
    shoppingList.appendChild(li);
  });
}

// ===========================
// Actions — Add, toggle, delete items
// ===========================

// Add a new item to the list (inserted at the top)
function addItem(name) {
  const trimmedName = name.trim();
  if (trimmedName === "") return;

  const newItem = {
    id: Date.now(),
    name: trimmedName,
    checked: false,
    addedBy: loadUsername() || "",
  };

  items.unshift(newItem);
  saveItems(items);
  renderList();

  // Add highlight class to the new item, then remove it to trigger the fade
  const newElement = shoppingList.firstElementChild;
  if (newElement) {
    newElement.classList.add("highlight");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        newElement.classList.remove("highlight");
      });
    });
  }
}

// Toggle the checked state of an item (with slide animation)
function toggleItem(id) {
  const item = items.find((i) => i.id === id);
  if (!item) return;

  // If an animation is running, finish it immediately and re-render
  if (animating) {
    animating = false;
    sortByChecked();
    saveItems(items);
    renderList();
  }

  item.checked = !item.checked;
  saveItems(items);

  if (!item.checked) {
    // Unchecking: re-sort and render immediately
    sortByChecked();
    saveItems(items);
    renderList();
    return;
  }

  // Get all visible list items and find the one being checked
  const allElements = Array.from(
    shoppingList.querySelectorAll(".shopping-item"),
  );
  const itemIndex = items.indexOf(item);
  const element = allElements[itemIndex];
  if (!element) {
    sortByChecked();
    saveItems(items);
    renderList();
    return;
  }

  // Calculate where it needs to go (last unchecked position)
  const unchecked = items.filter((i) => !i.checked);
  const targetIndex = unchecked.length; // Position after all unchecked items
  const moveBy = targetIndex - itemIndex; // How many positions to slide down

  if (moveBy <= 0) {
    sortByChecked();
    saveItems(items);
    renderList();
    return;
  }

  // Get the height of one item (including margin)
  const itemHeight =
    element.offsetHeight + parseFloat(getComputedStyle(element).marginBottom);

  animating = true;

  // Animate the checked item sliding down
  element.classList.add("checked");
  element.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  element.style.transform = `translateY(${moveBy * itemHeight}px)`;
  element.style.opacity = "0.6";

  // Animate the items between old and new position sliding up
  for (
    let i = itemIndex + 1;
    i <= itemIndex + moveBy && i < allElements.length;
    i++
  ) {
    allElements[i].style.transition = "transform 0.4s ease";
    allElements[i].style.transform = `translateY(-${itemHeight}px)`;
  }

  // After animation ends, re-render with the new order
  let animationDone = false;
  const finishAnimation = () => {
    if (animationDone) return;
    animationDone = true;
    animating = false;
    sortByChecked();
    saveItems(items);
    renderList();
  };

  element.addEventListener("transitionend", finishAnimation, { once: true });

  // Safety timeout in case transitionend doesn't fire
  setTimeout(finishAnimation, 500);
}

// Delete a single item from the list
function deleteItem(id) {
  items = items.filter((i) => i.id !== id);
  saveItems(items);
  renderList();
}

// Edit an item inline (replace span with input field)
function startEditItem(id, spanElement) {
  const item = items.find((i) => i.id === id);
  if (!item) return;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "item-edit-input";
  input.value = item.name;

  // Replace the span with the input
  spanElement.replaceWith(input);
  input.focus();
  input.select();

  // Save on Enter or when leaving the field
  const saveEdit = () => {
    const newName = input.value.trim();
    if (newName !== "" && newName !== item.name) {
      item.name = newName;
      saveItems(items);
    }
    renderList();
  };

  input.addEventListener("blur", saveEdit);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.blur();
    }
    if (e.key === "Escape") {
      input.removeEventListener("blur", saveEdit);
      renderList();
    }
  });
}

// Clear all items from the list
function clearAll() {
  if (confirm("Möchtest du wirklich alle Einträge löschen?")) {
    items = [];
    saveItems(items);
    renderList();
  }
}

// Clear only checked items from the list
function clearChecked() {
  const checkedCount = items.filter((i) => i.checked).length;
  if (checkedCount === 0) return;
  items = items.filter((i) => !i.checked);
  saveItems(items);
  renderList();
}

// Sort the list alphabetically (A–Z), keeping checked items at the bottom
function sortAlphabetically() {
  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);
  const compare = (a, b) => a.name.localeCompare(b.name, "de");
  unchecked.sort(compare);
  checked.sort(compare);
  items = [...unchecked, ...checked];
  saveItems(items);
  renderList();
}

// ===========================
// Username — Load, save, and edit
// ===========================

// Load the saved username
function loadUsername() {
  return localStorage.getItem(USERNAME_KEY) || "";
}

// Save the username
function saveUsername(name) {
  localStorage.setItem(USERNAME_KEY, name);
}

// Show the name dialog (for first setup or editing)
function showNameDialog(isFirstTime) {
  nameDialogTitle.textContent = isFirstTime ? "Wie heißt du?" : "Name ändern";
  nameInput.value = isFirstTime ? "" : loadUsername();
  nameDialog.classList.remove("hidden");
  nameInput.focus();
}

// Handle name form submission
nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (name === "") return;
  saveUsername(name);
  nameDialog.classList.add("hidden");
});

// Handle settings button (edit name)
settingsBtn.addEventListener("click", () => showNameDialog(false));

// ===========================
// Sharing — Export and import lists via URL
// ===========================

// Pending items waiting to be imported
let pendingImport = [];

// Share the current list as a URL
function shareList() {
  const uncheckedItems = items.filter((i) => !i.checked);
  if (uncheckedItems.length === 0) return;

  // Encode only name and addedBy for each item
  const shareData = uncheckedItems.map((i) => ({
    name: i.name,
    addedBy: i.addedBy || loadUsername(),
  }));

  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(shareData))));
  const shareUrl =
    window.location.origin + window.location.pathname + "?import=" + encoded;

  // Use Web Share API if available (AirDrop, WhatsApp, etc.)
  if (navigator.share) {
    navigator
      .share({
        title: "Einkaufsliste",
        text: `${loadUsername()} teilt eine Einkaufsliste mit ${uncheckedItems.length} Einträgen`,
        url: shareUrl,
      })
      .catch(() => {
        // User cancelled sharing — that's ok
      });
  } else {
    // Fallback: copy URL to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link wurde in die Zwischenablage kopiert!");
    });
  }
}

// Check if the URL contains shared list data
function checkForImport() {
  const params = new URLSearchParams(window.location.search);
  const importData = params.get("import");
  if (!importData) return;

  try {
    const decoded = JSON.parse(decodeURIComponent(escape(atob(importData))));

    if (!Array.isArray(decoded) || decoded.length === 0) return;

    // Validate and sanitize imported items
    pendingImport = decoded
      .filter((i) => typeof i.name === "string" && i.name.trim() !== "")
      .map((i) => ({
        name: i.name.trim(),
        addedBy: typeof i.addedBy === "string" ? i.addedBy.trim() : "",
      }));

    if (pendingImport.length === 0) return;

    // Show import dialog with preview
    const senderName = pendingImport[0].addedBy || "Jemand";
    importInfo.textContent = `${senderName} möchte ${pendingImport.length} Einträge mit dir teilen:`;
    importPreview.innerHTML = "";
    pendingImport.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      importPreview.appendChild(li);
    });
    importDialog.classList.remove("hidden");
  } catch (e) {
    // Invalid data — ignore silently
  }

  // Clean the URL (remove import parameter)
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, "", cleanUrl);
}

// Confirm importing shared items
importConfirmBtn.addEventListener("click", () => {
  pendingImport.forEach((importItem) => {
    const newItem = {
      id: Date.now() + Math.random(),
      name: importItem.name,
      checked: false,
      addedBy: importItem.addedBy,
    };
    items.unshift(newItem);
  });
  saveItems(items);
  renderList();
  importDialog.classList.add("hidden");
  pendingImport = [];
});

// Cancel import
importCancelBtn.addEventListener("click", () => {
  importDialog.classList.add("hidden");
  pendingImport = [];
});

// Handle share button
shareBtn.addEventListener("click", shareList);

// ===========================
// Dropdown menu
// ===========================

// Toggle the dropdown menu
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = !dropdownMenu.classList.contains("hidden");
  dropdownMenu.classList.toggle("hidden");
  menuBtn.setAttribute("aria-expanded", !isOpen);
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    !dropdownMenu.classList.contains("hidden") &&
    !dropdownMenu.contains(e.target)
  ) {
    dropdownMenu.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Close dropdown after any action button is clicked
[shareBtn, sortBtn, clearCheckedBtn, clearAllBtn, settingsBtn].forEach(
  (btn) => {
    btn.addEventListener("click", () => {
      dropdownMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  },
);

// ===========================
// Event listeners
// ===========================

// Handle form submit (add new item)
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addItem(itemInput.value);
  itemInput.value = "";
  itemInput.focus();
});

// Handle clear all button
clearAllBtn.addEventListener("click", clearAll);

// Handle clear checked button
clearCheckedBtn.addEventListener("click", clearChecked);

// Handle sort button
sortBtn.addEventListener("click", sortAlphabetically);

// ===========================
// Initial render
// ===========================
renderList();

// Check if someone shared a list with us
checkForImport();

// Ask for username on first visit
if (!loadUsername()) {
  showNameDialog(true);
}

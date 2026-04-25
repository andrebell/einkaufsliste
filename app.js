// Current app version
const APP_VERSION = "0.2.0-dev2";

// Storage key for localStorage
const STORAGE_KEY = "shopping-list";

// DOM elements
const addForm = document.querySelector("#add-form");
const itemInput = document.querySelector("#item-input");
const shoppingList = document.querySelector("#shopping-list");
const clearSection = document.querySelector("#clear-section");
const clearAllBtn = document.querySelector("#clear-all-btn");
const appVersionDisplay = document.querySelector("#app-version");

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
    clearSection.classList.add("hidden");
    return;
  }

  // Show the clear button when there are items
  clearSection.classList.remove("hidden");

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

    // Item name
    const nameSpan = document.createElement("span");
    nameSpan.className = "item-name";
    nameSpan.textContent = item.name;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.innerHTML = "✕";
    deleteBtn.setAttribute("aria-label", "Löschen: " + item.name);
    deleteBtn.addEventListener("click", () => deleteItem(item.id));

    li.appendChild(checkbox);
    li.appendChild(nameSpan);
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
  const allElements = Array.from(shoppingList.querySelectorAll(".shopping-item"));
  const itemIndex = items.indexOf(item);
  const element = allElements[itemIndex];
  if (!element) {
    sortByChecked();
    saveItems(items);
    renderList();
    return;
  }

  // Calculate where it needs to go (last unchecked position)
  const newItems = [...items];
  const unchecked = newItems.filter((i) => !i.checked);
  const targetIndex = unchecked.length; // Position after all unchecked items
  const moveBy = targetIndex - itemIndex; // How many positions to slide down

  if (moveBy <= 0) {
    sortByChecked();
    saveItems(items);
    renderList();
    return;
  }

  // Get the height of one item (including margin)
  const itemHeight = element.offsetHeight + parseFloat(getComputedStyle(element).marginBottom);

  // Animate the checked item sliding down
  element.classList.add("checked");
  element.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  element.style.transform = `translateY(${moveBy * itemHeight}px)`;
  element.style.opacity = "0.6";

  // Animate the items between old and new position sliding up
  for (let i = itemIndex + 1; i <= itemIndex + moveBy && i < allElements.length; i++) {
    allElements[i].style.transition = "transform 0.4s ease";
    allElements[i].style.transform = `translateY(-${itemHeight}px)`;
  }

  // After animation ends, re-render with the new order
  element.addEventListener(
    "transitionend",
    (e) => {
      if (e.propertyName !== "transform") return;
      sortByChecked();
      saveItems(items);
      renderList();
    },
    { once: true },
  );
}

// Delete a single item from the list
function deleteItem(id) {
  items = items.filter((i) => i.id !== id);
  saveItems(items);
  renderList();
}

// Clear all items from the list
function clearAll() {
  if (confirm("Möchtest du wirklich alle Einträge löschen?")) {
    items = [];
    saveItems(items);
    renderList();
  }
}

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

// ===========================
// Initial render
// ===========================
renderList();

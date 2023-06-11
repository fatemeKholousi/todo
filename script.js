const itemInput = document.getElementById("item-input");
const searchItemInput = document.getElementById("filter");

const listElement = document.getElementById("item-list");
const addItemButton = document.getElementById("add-item-btn");
const clearAllButton = document.getElementById("clear");
const filterDiv = document.getElementsByClassName("filter");
let idCounter = 0;
let isEditMode = false;
init();

function init() {
  addItemButton.addEventListener("click", onAddItemSubmit);
  listElement.addEventListener("click", onClickItem);
  clearAllButton.addEventListener("click", clearAllItemsHandler);
  searchItemInput.addEventListener("input", filterItemsHandler);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkUIHandler();
}

function displayItems() {
  let itemsFromStorage = getItemsFromStorageHandler();
  itemsFromStorage?.forEach((item) => addItemToDomHandler(item));
}

function onAddItemSubmit(event) {
  event.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") return;
  if (isEditMode) {
    const itemToEdit = listElement.querySelector(".edit-mode");

    removeItemFromStorageHandler(itemToEdit);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("This item is already exists");
      return;
    }

  }
      // Crete item DOM element
      addItemToDomHandler(newItem);
      // Create item to local Storage
      addItemToStorageHandler(newItem);
  itemInput.value=''
  checkUIHandler();
}

function onClickItem(event) {
  if (event.target.parentElement.classList.contains("remove-item")) {
    removeItemHandler(event.target.parentElement.parentElement);
  } else {
    setItemToEditHandler(event.target);
  }
}

function setItemToEditHandler(item) {
  listElement
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  addItemButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update';
  addItemButton.style.backgroundColor = "#228B22";
  itemInput.value = item.innerText;

  isEditMode = true;
}
// add Item
function addItemToDomHandler(newItem) {
  const liElement = document.createElement("li");
  liElement.innerHTML = newItem;
  liElement.setAttribute("id", `${++idCounter}-item`);
  liElement.appendChild(createButton("remove-item btn-link text-red"));
  listElement.appendChild(liElement);
}

// remove Item
function removeItemHandler(item) {
  if (confirm("Are You Sure?")) {
    // local storage
    removeItemFromStorageHandler(item);

    // DOM
    item.remove();

    checkUIHandler();
  }
}

function removeItemFromStorageHandler(item) {
  let itemsOfLocalStorage = getItemsFromStorageHandler();
  const result = itemsOfLocalStorage.filter((i) => i !== item.textContent );
  localStorage.setItem("items", JSON.stringify(result));
}

function checkIfItemExists(item) {
  const itemFromStorage = getItemsFromStorageHandler();
  return itemFromStorage.includes(item);
}
// filter
function filterItemsHandler(event) {
  const searchTerm = event.target.value;
  const liListArray = listElement.querySelectorAll("li");
  liListArray.forEach((item) => {
    const condition = item.firstChild.textContent
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase());
    if (condition) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// save in local storage
function getItemsFromStorageHandler() {
  let itemsFromStorage;
  if (!localStorage.getItem("items")) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function addItemToStorageHandler(item) {
  let itemsArray = getItemsFromStorageHandler();
  itemsArray.push(item);
  localStorage.setItem("items", JSON.stringify(itemsArray));
}

// removeAll
function clearAllItemsHandler() {
  listElement.innerHTML = "";
  localStorage.removeItem("items");
  checkUIHandler();
}

// ---check ui
function checkUIHandler() {
  itemInput.value = "";
  if (listElement.children[0]?.length === 0) {
    clearAllButton.style.display = "none";
    filterDiv[0].style.display = "none";
  } else {
    clearAllButton.style.display = "inline";
    filterDiv[0].style.display = "inline";
  }
  addItemButton.innerHTML = "<i class=fa-solid fa-plus></i> Add Item";
  addItemButton.style.backgroundColor = "#333";
  isEditMode = false;
}

// ---create button
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// ---create icon
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

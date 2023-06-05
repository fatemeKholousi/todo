const itemInput = document.getElementById('item-input')
const searchItemInput = document.getElementById('filter')

const listElement = document.getElementById('item-list')
const addItemButton = document.getElementById('add-item-btn')
const clearAllButton = document.getElementById('clear')
const filterDiv = document.getElementsByClassName('filter')

addItemButton.addEventListener('click', addItemHandler)
listElement.addEventListener('click', removeItemHandler)
clearAllButton.addEventListener('click', clearAllItemsHandler)
searchItemInput.addEventListener('input', filterItemsHandler)

checkUIHandler()

// add Item
function addItemHandler(event) {
  event.preventDefault()
  if (!itemInput.value) return

  const liElement = document.createElement('li')
  liElement.innerHTML = itemInput.value

  liElement.appendChild(createButton('remove-item btn-link text-red'))
  listElement.appendChild(liElement)
  checkUIHandler()
}

// remove Item
function removeItemHandler(event) {
  if (event.target.parentElement.classList.contains('remove-item')) {
    event.target.parentElement.parentElement.remove()
  checkUIHandler()
  }
}

// filter
function filterItemsHandler(event){
const searchTerm=event.target.value
const liListArray=listElement.querySelectorAll('li')
liListArray.forEach(item=>{
    const condition=item.firstChild.textContent.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    if(condition){
        item.style.display='flex'

    }
    else{
        item.style.display='none'
        
    }

})
}

// save in local storage

// removeAll
function clearAllItemsHandler() {
  listElement.innerHTML = ''
  checkUIHandler()
}

// ---check ui
function checkUIHandler() {
  if (listElement.children.length === 0) {
    clearAllButton.style.display = 'none'
    filterDiv[0].style.display = 'none'
  }
  else{
    clearAllButton.style.display = 'inline'
    filterDiv[0].style.display = 'inline'
  }

}

// ---create button
function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  const icon = createIcon('fa-solid fa-xmark')
  button.appendChild(icon)
  return button
}

// ---create icon
function createIcon(classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}

const itemInput=document.getElementById('item-input')
document.getElementById('add-item-btn').addEventListener('click',addItemHandler)
// add Item
function addItemHandler(event){
    event.preventDefault()
    listElement=document.getElementById('item-list')
    const liElement=document.createElement('li')
    liElement.innerHTML=itemInput.value
    listElement.appendChild(liElement)
}
// remove Item
// filter
// save in local storage


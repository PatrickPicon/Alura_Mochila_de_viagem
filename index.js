const form = document.getElementById('novoItem')
const list = document.getElementById('list')
const items = JSON.parse(localStorage.getItem('items')) || []

items.forEach( element => {
   newElement(element)
});

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = event.target.elements['nome']
    const quantity = event.target.elements['quantidade']

    const item = {
        name: name.value,
        quantity: quantity.value
    }

    const exist = items.find( element => element.name === name.value)

    if(exist){
        item.id = exist.id
        updateElement(item)
        
        items[items.findIndex(element => element.id === exist.id)] = item
    } else{
        item.id = items[items.length -1] ? items[items.length -1].id +1 : 0;
        newElement(item)
        items.push(item)
    }

    localStorage.setItem('items', JSON.stringify(items))
    
    name.value = ''
    quantity.value = ''
})

function newElement(item){
    const listItem = document.createElement('li')
    const listQuantity = document.createElement('strong')

    listItem.classList.add('item')
    listQuantity.innerHTML = item.quantity
    listQuantity.dataset.id = item.id
    listItem.appendChild(listQuantity)
    listItem.innerHTML += item.name
    
    listItem.appendChild(createButton(item.id))

    list.appendChild(listItem)
}

function updateElement(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantity
}

function createButton(id){
    const button = document.createElement('button')
    button.innerText = 'X'
    button.classList.add('list-btn')
    button.addEventListener('click', function(){
        deleteElement(this.parentNode, id)
    })
    return button
}

function deleteElement(tag, id){
    tag.remove()
    
    items.splice(items.findIndex(element => element.id === id) ,1)

    localStorage.setItem('items', JSON.stringify(items))
}
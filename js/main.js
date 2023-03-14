const form = document.querySelector("#novoItem");
const list = document.querySelector("#lista");
const items = JSON.parse(localStorage.getItem("items")) || [];
//Loop arrays creates want add new element
items.forEach( (elemento) => {
    createElement(elemento)
})
//Function add event want button is clicked and add in LocalStorage
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target.elements['nome'];
    const amount = e.target.elements['quantidade']
    const existId = items.find( elemento => elemento.name === name.value) //Checks if the element is already in localStorage
    const currentItens = {
        "name": name.value,
        "amount": amount.value
    }
    if(existId){ //If element exist, update element
        currentItens.id = existId.id
        updateElement(currentItens)
        items[items.findIndex(elemento => elemento.id === existId.id)] = currentItens
    }else { //If element not exist, create a new element
        currentItens.id = items[items.length -1] ? (items[items.length-1]).id + 1 : 0;
        createElement(currentItens)
        items.push(currentItens)
    }
    localStorage.setItem("items", JSON.stringify(items))
    name.value = "";
    amount.value = "";
})
//Function create new element <li> with tag <strong>
function createElement(objItems) {
    const newItem = document.createElement('li');
    newItem.classList.add("item");
    const numberItem = document.createElement('strong');
    numberItem.innerHTML = objItems.amount;
    numberItem.dataset.id = objItems.id;
    newItem.appendChild(numberItem);
    newItem.innerHTML += objItems.name
    newItem.appendChild(buttonDelete(objItems.id))
    list.appendChild(newItem);
}
//Function update element
function updateElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.amount
}
//Function create button delete
function buttonDelete (id) {
    const elementButton = document.createElement("button");
    elementButton.innerText = "X"
    elementButton.addEventListener("click", function () {
        deleteElement(this.parentNode, id)
    })
    return elementButton
}
//Function delete element with button
function deleteElement(tag, id) {
    tag.remove()
    items.splice(items.findIndex(elemento => elemento.id == id), 1);
    localStorage.setItem("items", JSON.stringify(items))
}
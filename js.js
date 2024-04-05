import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "myplayground-f7fc5"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "food")


const addButtonEl = document.querySelector("#add-button");
const inputFieldEl = document.querySelector("#input-field");
const shoppingListEl = document.querySelector(".shopping-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputFieldEl() // call the function, defined bellow
    appendItemToShoppingListEl(inputValue) // call the function, defined bellow
})

onValue(shoppingListInDB, function(snapshot) {

if (snapshot.exists()) {
     let itemsArray = Object.entries(snapshot.val())
    clearShoppingListEl()

for ( let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i]
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]
      appendItemToShoppingListEl(currentItem)
}
  } else {
    shoppingListEl.innerHTML = "Niciun produs adaugat inca ..."
  }
})

function clearShoppingListEl() {
  shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
  inputFieldEl.value = "" // clears the input field when button is pressed
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")

  newEl.textContent = itemValue

  newEl.addEventListener ("click", function() {
    let exactLocationOfItemInDB = ref(database, `food/${itemID}`)
    remove(exactLocationOfItemInDB)
  })

  shoppingListEl.append(newEl)
}

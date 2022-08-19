// declare variables

const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text= document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null? localStorageTransactions : [];

//add transaction function
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim()=== "" || amount.value.trim()=== ""){
    alert("please add a text and amount");
  }

  else{
     const transaction = {
       id: generateID(),
       text : text.value,
       amount : +amount.value,
     };

     transactions.push(transaction);
     addTransactionDOM(transaction);
     updateValues();
     updateLocalStorage();

     text.value = '';
     amount.value = '';
     }
}

// generate a random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}


// add to the DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick= "removeTransaction(${
    transaction.id
  })">x</button>`;
  list.appendChild(item);
}


// update the value of the balance, income and expense

function updateValues(){
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts.filter((item) => item > 0).reduce((acc,item) => (acc += item), 0).toFixed(2);
  const expense = amounts.filter((item) => item < 0).reduce((acc,item) => (acc += item), 0).toFixed(2);
  balance.innerText = `GH₵${total}`;
  money_plus.innerText = `GH₵${income}`;
  money_minus.innerText = `GH₵${expense}`;
}

//remove transaction from the list by using the id

function removeTransaction(id){
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

//update the local storage

function updateLocalStorage(){
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//initalize app

function init(){
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
form.addEventListener("submit", addTransaction);
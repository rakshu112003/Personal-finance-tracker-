const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [
  { id: 1, text: 'Salary', amount: 50000 },
  { id: 2, text: 'Food', amount: -2000 },
  { id: 3, text: 'Rent', amount: -7000 },
  { id: 4, text: 'Electricity', amount: -500 },
  { id: 5, text: 'Travel', amount: -1000 },
  { id: 6, text: 'Shopping', amount: -1000 }
];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add description and amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  text.value = '';
  amount.value = '';
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}₹${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(tx => tx.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const expense = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0).toFixed(2);

  balance.innerText = `₹${total}`;
  money_plus.innerText = `+₹${income}`;
  money_minus.innerText = `-₹${Math.abs(expense)}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  init();
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

form.addEventListener('submit', addTransaction);
init();


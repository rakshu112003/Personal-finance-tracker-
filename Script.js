const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transactions = document.getElementById('transactions');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactionList = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') return;

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value
  };

  transactionList.push(transaction);
  addTransaction(transaction);
  updateValues();
  text.value = '';
  amount.value = '';
});

function generateID() {
  return Math.floor(Math.random() * 100000);
}

function addTransaction(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}₹${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  transactions.appendChild(item);
}

function updateValues() {
  const amounts = transactionList.map(txn => txn.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const inc = amounts.filter(a => a > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const exp = (
    amounts.filter(a => a < 0).reduce((acc, val) => acc + val, 0) * -1
  ).toFixed(2);

  balance.innerText = `₹${total}`;
  income.innerText = `₹${inc}`;
  expense.innerText = `₹${exp}`;
}

function removeTransaction(id) {
  transactionList = transactionList.filter(txn => txn.id !== id);
  transactions.innerHTML = '';
  transactionList.forEach(addTransaction);
  updateValues();
}

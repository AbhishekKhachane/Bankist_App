"use strict";

/////////////////////////////////////////////////
// BANKIST APP
/////////////////////////////////////////////////

// Data
const account1 = {
  owner: "Abhi Khachane",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Atharva Nimbalkar",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Om Chimanpure",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Varun Bagul",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// DISPLAY MOVEMENTS
const displayMovements = function (movements) {
  // First clear the container and then insert
  containerMovements.innerHTML = "";

  movements.forEach(function (mov, i) {
    // Calculate type whether deposit or withdrawal
    const type = mov > 0 ? "deposit" : "withdrawal";

    // Html template
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    // Insert the HTML in movements element
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

// CONCEPT of for-of and forEach Loop
// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for-of Loop ----> Array
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("------------------------");

// for-Each Loop ----> Array
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });

// for-of loop with no of entries ----> Array
// for (const [key, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${key + 1} : You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${key + 1} : You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("------------------------");

// for-Each Loop with entries ----> Array
// movements.forEach(function (movement, key, arr) {
//   if (movement > 0) {
//     console.log(`Movement ${key + 1} : You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${key + 1} : You withdrew ${Math.abs(movement)}`);
//   }
// });

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// for-of loop ----> Map
// for (const [key, value] of currencies) {
//   console.log(`Abbrevation is -> ${key} and its meaning is -> ${value}`);
// }

// console.log("------------------------");

// for-Each loop ----> Map
// currencies.forEach(function (value, key, map) {
//   console.log(`Abbrevation is -> ${key} and its meaning is -> ${value}`);
//   console.log(map);
// });

// for-Each loop ----> Set
// Here as there is no index for Sets so key and value are same for Sets.

// const currenciesUniq = new Set(["USD", "EUR", "GBP", "EUR", "GBP"]);
// currenciesUniq.forEach(function (value, key) {
//   // console.log(key);
//   // console.log(value);
//   // console.log(`${value}: ${key}`);

// });

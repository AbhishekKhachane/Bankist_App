"use strict";

/////////////////////////////////////////////////
// BANKIST APP
/////////////////////////////////////////////////

// *********** DATA *************
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

// ************* ELEMENTS *************
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

// ************* DISPLAY MOVEMENTS *************
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
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    // Insert the HTML in movements element
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// ************* CALCULATE THE BALANCE AND DISPLAY *************
const calcDisplayBalance = function (account) {
  // acc -> accumulator
  account.balance = account.movements.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  // Display on screen
  labelBalance.textContent = `${account.balance}€`;
};

// ************* DISPLAY SUMMARY *************
const calcDisplaySummary = function (account) {
  // Incomes -----------------------------------------------
  const incomes = account.movements
    .filter((mov) => {
      return mov > 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  // Display on screen
  labelSumIn.textContent = `${incomes}€`;

  // Out -----------------------------------------------
  const out = account.movements
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  // Display on screen
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // Interest -----------------------------------------------
  const interest = account.movements
    .filter((mov) => {
      return mov > 0;
    })
    .map((deposit) => {
      return (deposit * account.interestRate) / 100;
    })
    .filter((int, i, arr) => {
      return int > 1;
    })
    .reduce((acc, int) => {
      return acc + int;
    }, 0);

  // Display on screen
  labelSumInterest.textContent = `${interest}€`;
};

// ************* CREATE USERNAME FOR THE USERS *************
const createUserNames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((element) => {
        return element[0];
      })
      .join("");
  });
};

createUserNames(accounts);

// Update UI
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// EVENT HANDLERS
let currentAccount;

// ***************** LOGIN FUNCTION *****************

btnLogin.addEventListener("click", function (event) {
  // Prevent Form from Submitting
  event.preventDefault();

  // Find Username
  currentAccount = accounts.find((acc) => {
    return acc.username === inputLoginUsername.value;
  });

  // Match Pin value
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    // Add Opacity to display
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    // Clear the focus from the pin button
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// ***************** TRANSFER FUNCTION *****************
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const receiverAcc = accounts.find((acc) => {
    return acc.username === inputTransferTo.value;
  });

  const amount = Number(inputTransferAmount.value);

  // Clear the fields
  inputTransferAmount.value = inputTransferTo.value = "";

  // Check whether amount is valid and less than the available balance and we should not be able to transfer to our own acc
  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// ***************** CLOSE THE ACCOUNT *****************
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex((acc) => {
      return acc.username === inputCloseUsername.value;
    });

    // Delete the Acc
    accounts.splice(index, 1);

    // Logout User ---> Do not show the UI / Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

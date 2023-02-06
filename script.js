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

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2023-02-01T23:36:17.929Z",
    "2023-02-05T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Atharva Nimbalkar",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Om Chimanpure",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Varun Bagul",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "mr-IN",
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

// Date
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) {
    return "Today";
  }
  if (daysPassed === 1) {
    return "Yesterday";
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago  `;
  }
  // const day = `${date.getDate()}`.padStart(2, "0");
  // const month = `${date.getMonth() + 1}`.padStart(2, "0");
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

// ************* DISPLAY MOVEMENTS *************
const displayMovements = function (account, sort = false) {
  // First clear the container and then insert
  containerMovements.innerHTML = "";

  // Sort the movements
  const movs = sort
    ? account.movements.slice().sort((a, b) => b - a)
    : account.movements;

  movs.forEach(function (mov, i) {
    // Calculate type whether deposit or withdrawal
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    // Html template
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>

        <div class="movements__value">${mov.toFixed(2)}€</div>
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
  labelBalance.textContent = `${account.balance.toFixed(2)}€`;
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
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  // Out -----------------------------------------------
  const out = account.movements
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  // Display on screen
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

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
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// EVENT HANDLERS
let currentAccount;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

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

    // Add current date
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: "long",
    };

    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, "0");
    // const month = `${now.getMonth() + 1}`.padStart(2, "0");
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, "0");
    // const min = `${now.getMinutes()}`.padStart(2, "0");
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

// ***************** REQUEST LOAN *****************
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => {
      return mov >= amount * 0.1;
    })
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
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

// SORT THE MOVEMENTS
let sortedState = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sortedState);
  sortedState = !sortedState;
});

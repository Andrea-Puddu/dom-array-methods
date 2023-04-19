"use strict";

const main = document.getElementById("main");

const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");
const refreshPageBtn = document.getElementById("refresh-page");

let data = [];

// Refresh page
const refreshPage = () => {
  location.reload();
};

// Render error
const renderError = function (msg) {
  main.insertAdjacentText("beforeend", msg);
};

// Format number as money
const formatMoney = function (number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

// Fetch random user and add money
const getRandomUser = async function () {
  try {
    const res = await fetch(`https://randomuser.me/api`);

    if (!res.ok) throw new Error("Data not available 😢");

    const data = await res.json();

    const user = data.results[0];

    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
  } catch (err) {
    renderError(`💥 Somenthing went wrong: ${err.message}`);
  }
};

// Double everyones money
const doubleMoney = function () {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
};

// Sort users by richest
const sortByRichest = function () {
  data.sort((a, b) => b.money - a.money);

  updateDom();
};

// Filter only millionairs
const showMillionaires = function () {
  data = data.filter((user) => user.money >= 1000000);

  updateDom();
};

// Calculate and render total wealth
const calculateWealth = function () {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.append(wealthEl);
};

// Add new object (newUser) to data array
function addData(obj) {
  data.push(obj);

  updateDom();
}

// Update DOM
const updateDom = function (providedData = data) {
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  // render each single data
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.append(element);
  });
};

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);
refreshPageBtn.addEventListener("click", refreshPage);

getRandomUser();
getRandomUser();
getRandomUser();

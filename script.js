let dollars = 0;
let pizzaSauce = 0;
let ost = 0;
let pølser = 0;
let bacon = 0;
let kebab = 0;
let trøffel = 0;

const upgrades = [
  {
    name: "Pizza sauce",
    amount: 0,
    cost: 10,
    clicks: 1,
  },
  {
    name: "Ost",
    amount: 0,
    cost: 100,
    clicks: 5,
  },
  {
    name: "Pølser",
    amount: 0,
    cost: 500,
    clicks: 10,
  },
  {
    name: "Bacon",
    amount: 0,
    cost: 1000,
    clicks: 20,
  },
  {
    name: "Kebab",
    amount: 0,
    cost: 2500,
    clicks: 25,
  },
  {
    name: "Trøffel",
    amount: 0,
    cost: 5000,
    clicks: 50,
  },
];

const pizza = document.querySelector(".pizza img");
pizza.addEventListener("click", addPoint);

// Event listener for upgrades
const tomatSauceAmount = document.querySelector("#tomatSauceAmount");
const tomatSauceUpgrade = document.querySelector("#tomatSauce");
tomatSauceUpgrade.addEventListener("click", () => {
  buyUpgrade(0);
});

const ostAmount = document.querySelector("#ostAmount");
const ostUpgrade = document.querySelector("#ost");
ostUpgrade.addEventListener("click", () => {
  ost++;
});

const pølserAmount = document.querySelector("#pølserAmount");
const pølserUpgrade = document.querySelector("#pølser");
pølserUpgrade.addEventListener("click", () => {
  pølser++;
});

const baconAmount = document.querySelector("#baconAmount");
const baconUpgrade = document.querySelector("#bacon");
baconUpgrade.addEventListener("click", () => {
  bacon++;
});

const kebabAmount = document.querySelector("#kebabAmount");
const kebabUpgrade = document.querySelector("#kebab");
kebabUpgrade.addEventListener("click", () => {
  kebab++;
});

const trøffelAmount = document.querySelector("#trøffelAmount");
const trøffelUpgrade = document.querySelector("#trøffel");
trøffelUpgrade.addEventListener("click", () => {
  trøffel++;
});

function buyUpgrade(int) {
  if (dollars >= upgrades[int].cost) {
    upgrades[int].amount++;
    upgrades[int].cost = Math.ceil(upgrades[int].cost * 1.05);

    console.log(upgrades[int].cost);
    dollars -= upgrades[int].cost;
    updateUpgrades();
    updateDollar();
  } else {
    alert("You don't have enough money to buy this upgrade!");
  }
}

function updateUpgrades() {
  tomatSauceAmount.textContent = upgrades[0].amount;
  ostAmount.textContent = ost;
  pølserAmount.textContent = pølser;
  baconAmount.textContent = bacon;
  kebabAmount.textContent = kebab;
  trøffelAmount.textContent = trøffel;
}

const dollarCount = document.querySelector("#dollarCount");

function addPoint() {
  dollars++;
  updateDollar();
}

function updateDollar() {
  dollarCount.textContent = dollars;
}

let dollars = 0;
let clicks = 1;

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
  buyUpgrade(1);
});

const pølserAmount = document.querySelector("#pølserAmount");
const pølserUpgrade = document.querySelector("#pølser");
pølserUpgrade.addEventListener("click", () => {
  buyUpgrade(2);
});

const baconAmount = document.querySelector("#baconAmount");
const baconUpgrade = document.querySelector("#bacon");
baconUpgrade.addEventListener("click", () => {
  buyUpgrade(3);
});

const kebabAmount = document.querySelector("#kebabAmount");
const kebabUpgrade = document.querySelector("#kebab");
kebabUpgrade.addEventListener("click", () => {
  buyUpgrade(4);
});

const trøffelAmount = document.querySelector("#trøffelAmount");
const trøffelUpgrade = document.querySelector("#trøffel");
trøffelUpgrade.addEventListener("click", () => {
  buyUpgrade(5);
});

function buyUpgrade(int) {
  if (dollars >= upgrades[int].cost) {
    upgrades[int].amount++;
    clicks = clicks + upgrades[int].clicks;
    dollars -= upgrades[int].cost;
    upgrades[int].cost = Math.ceil(upgrades[int].cost * 1.05);
    updateUpgrades();
    updateStats();
  } else {
    alert("You don't have enough money to buy this upgrade!");
  }
}

function updateUpgrades() {
  tomatSauceAmount.textContent = upgrades[0].amount;
  ostAmount.textContent = upgrades[1].amount;
  pølserAmount.textContent = upgrades[2].amount;
  baconAmount.textContent = upgrades[3].amount;
  kebabAmount.textContent = upgrades[4].amount;
  trøffelAmount.textContent = upgrades[5].amount;
}

const dollarCount = document.querySelector("#dollarCount");
const clickCount = document.querySelector("#clickCount");

function addPoint() {
  dollars += clicks;
  updateStats();
}

function updateStats() {
  dollarCount.textContent = dollars;
  clickCount.textContent = clicks;
}

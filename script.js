let dollars = 0;
let clicks = 1;
let cps = 0;

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
    cost: 1000,
    clicks: 10,
  },
  {
    name: "Bacon",
    amount: 0,
    cost: 2500,
    clicks: 25,
  },
  {
    name: "Kebab",
    amount: 0,
    cost: 5000,
    clicks: 50,
  },
  {
    name: "Trøffel",
    amount: 0,
    cost: 10000,
    clicks: 100,
  },
  {
    name: "Worker",
    amount: 0,
    cost: 5000,
    cps: 1,
  },
  {
    name: "Workspeed",
    amount: 0,
    cost: 2500,
    speed: 0.5,
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

const workerAmount = document.querySelector("#workerAmount");
const workerUpgrade = document.querySelector("#worker");
workerUpgrade.addEventListener("click", () => {
  buyCPSUpgrade(6);
});

const workSpeedAmount = document.querySelector("#workSpeedAmount");
const workSpeed = document.querySelector("#workSpeed");
workSpeed.addEventListener("click", () => {
  buySpeedUpgrade(7);
});

function buyUpgrade(int) {
  if (dollars >= upgrades[int].cost) {
    upgrades[int].amount++;
    clicks = clicks + upgrades[int].clicks;
    dollars -= upgrades[int].cost;
    upgrades[int].cost = Math.ceil(upgrades[int].cost * 1.05);
    updateUpgrades();
    updateStats();
    updateCPS();
  } else {
    alert("You don't have enough money to buy this upgrade!");
  }
}

function buyCPSUpgrade(int) {
  if (dollars >= upgrades[int].cost) {
    upgrades[int].amount++;
    dollars -= upgrades[int].cost;
    upgrades[int].cost = Math.ceil(upgrades[int].cost * 1.5);
    updateUpgrades();
    updateStats();
    updateCPS();
  } else {
    alert("You don't have enough money to buy this upgrade!");
  }
}

function buySpeedUpgrade(int) {
  if (dollars >= upgrades[int].cost) {
    upgrades[int].amount++;
    dollars -= upgrades[int].cost;
    upgrades[int].cost = Math.ceil(upgrades[int].cost * 1.5);
    updateUpgrades();
    updateStats();
    updateCPS();
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
  workerAmount.textContent = upgrades[6].amount;
  workSpeedAmount.textContent = upgrades[7].amount;
}

const dollarCount = document.querySelector("#dollarCount");
const clickCount = document.querySelector("#clickCount");
const cpsCount = document.querySelector("#cpsCount");

function addPoint() {
  dollars += clicks;
  updateStats();
}

function clicksPerSecond() {
  setInterval(() => {
    dollars += getDollarsPerSecond();
    updateStats();
    updateCPS();
  }, 1000);
}

function getSpeedMultiplier() {
  return 1 + upgrades[7].amount * upgrades[7].speed;
}

function getDollarsPerSecond() {
  return upgrades[6].amount * upgrades[6].cps * getSpeedMultiplier() * clicks;
}

function updateStats() {
  dollarCount.textContent = dollars.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  clickCount.textContent = clicks;
  workSpeedAmount.textContent =
    1 + upgrades[7].amount * upgrades[7].speed + "x";
}

function updateCPS() {
  cpsCount.textContent = getDollarsPerSecond().toLocaleString("en-US", {
    maximumFractionDigits: 1,
  });
}

workSpeedAmount.textContent = 1 + upgrades[7].amount * upgrades[7].speed + "x";

clicksPerSecond();

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

const upgradeElements = [
  tomatSauceUpgrade,
  ostUpgrade,
  pølserUpgrade,
  baconUpgrade,
  kebabUpgrade,
  trøffelUpgrade,
  workerUpgrade,
  workSpeed,
];

function updateAffordable() {
  upgradeElements.forEach((element, i) => {
    const canAfford = dollars >= upgrades[i].cost;
    element.classList.toggle("affordable", canAfford);
    element.classList.toggle("expensive", !canAfford);
  });
}

function buyUpgrade(int) {
  if (dollars >= upgrades[int].cost) {
    upgrades[int].amount++;
    clicks = clicks + upgrades[int].clicks;
    dollars -= upgrades[int].cost;
    upgrades[int].cost = Math.ceil(upgrades[int].cost * 1.05);
    addImage(int);
    updateUpgrades();
    updateStats();
    updateCPS();
    saveGame();
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
    saveGame();
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
    saveGame();
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
    dollars += getDollarsPerSecond() * 0.01;
    updateStats();
    updateCPS();
  }, 10);
}

setInterval(() => {
  saveGame();
}, 60000);

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
  updateAffordable();
}

function updateCPS() {
  cpsCount.textContent = getDollarsPerSecond().toLocaleString("en-US", {
    maximumFractionDigits: 1,
  });
}

workSpeedAmount.textContent = 1 + upgrades[7].amount * upgrades[7].speed + "x";

clicksPerSecond();
updateStats();

function addImage(int) {
  const pizzaButton = document.querySelector(".pizza");
  const img = document.createElement("img");
  img.style.maxWidth = "400px";
  img.style.maxHeight = "400px";

  switch (int) {
    case 0:
      img.src = "images/02_tomatsovs.png";
      img.alt = "tomatSauce";
      img.style.zIndex = 1;
      break;
    case 1:
      img.src = "images/03_ost.png";
      img.alt = "ost";
      img.style.zIndex = 2;

      break;
    case 2:
      img.src = "images/04_polser.png";
      img.alt = "pølser";
      img.style.zIndex = 3;
      break;
    case 3:
      img.src = "images/05_bacon.png";
      img.alt = "bacon";
      img.style.zIndex = 3;
      break;
    case 4:
      img.src = "images/06_kebab.png";
      img.alt = "kebab";
      img.style.zIndex = 3;
      break;
    case 5:
      img.src = "images/07_truffel.png";
      img.alt = "trøffel";
      img.style.zIndex = 3;
      break;
  }

  pizzaButton.appendChild(img);
}

const saveKey = "pizzaClicker";

function saveGame() {
  const savedUpgrades = [];
  upgrades.forEach((upgrade) => {
    savedUpgrades.push({
      amount: upgrade.amount,
      cost: upgrade.cost,
    });
  });

  const save = {
    dollars: dollars,
    clicks: clicks,
    upgrades: savedUpgrades,
  };

  const saveText = JSON.stringify(save);
  localStorage.setItem(saveKey, saveText);
}

function loadGame() {
  const saveText = localStorage.getItem(saveKey);

  if (saveText === null) {
    return;
  }

  const save = JSON.parse(saveText);

  dollars = save.dollars;
  clicks = save.clicks;

  upgrades.forEach((upgrade, i) => {
    upgrade.amount = save.upgrades[i].amount;
    upgrade.cost = save.upgrades[i].cost;
  });

  updateUpgrades();
  updateStats();
  updateCPS();
}

loadGame();
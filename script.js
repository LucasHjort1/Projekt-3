let dollars = 0;
let clicks = 1;
let cps = 0;
let imgHeight = 3;
let boosterMultiplier = 1;

const upgrades = [
  {
    name: "Pizza sauce",
    amount: 0,
    cost: 25,
    clicks: 1,
  },
  {
    name: "Ost",
    amount: 0,
    cost: 250,
    clicks: 5,
  },
  {
    name: "Pølser",
    amount: 0,
    cost: 1500,
    clicks: 10,
  },
  {
    name: "Bacon",
    amount: 0,
    cost: 5000,
    clicks: 25,
  },
  {
    name: "Kebab",
    amount: 0,
    cost: 10000,
    clicks: 50,
  },
  {
    name: "Trøffel",
    amount: 0,
    cost: 25000,
    clicks: 100,
  },
  {
    name: "Worker",
    amount: 0,
    cost: 1000,
    cps: 1,
  },
  {
    name: "Workspeed",
    amount: 0,
    cost: 5000,
    speed: 0.5,
  },
];

const pizza = document.querySelector(".pizza img");
pizza.addEventListener("click", addPoint);

// Event listener for upgrades
const tomatSauceAmount = document.querySelector("#tomatSauceAmount");
const tomatSauceUpgrade = document.querySelector("#tomatSauce");
const tomatSauceCost = document.querySelector("#tomatSauceCost");
tomatSauceUpgrade.addEventListener("click", () => {
  buyUpgrade(0);
});

const ostAmount = document.querySelector("#ostAmount");
const ostUpgrade = document.querySelector("#ost");
const ostCost = document.querySelector("#ostCost");
ostUpgrade.addEventListener("click", () => {
  buyUpgrade(1);
});

const pølserAmount = document.querySelector("#pølserAmount");
const pølserUpgrade = document.querySelector("#pølser");
const pølserCost = document.querySelector("#pølserCost");
pølserUpgrade.addEventListener("click", () => {
  buyUpgrade(2);
});

const baconAmount = document.querySelector("#baconAmount");
const baconUpgrade = document.querySelector("#bacon");
const baconCost = document.querySelector("#baconCost");
baconUpgrade.addEventListener("click", () => {
  buyUpgrade(3);
});

const kebabAmount = document.querySelector("#kebabAmount");
const kebabUpgrade = document.querySelector("#kebab");
const kebabCost = document.querySelector("#kebabCost");
kebabUpgrade.addEventListener("click", () => {
  buyUpgrade(4);
});

const trøffelAmount = document.querySelector("#trøffelAmount");
const trøffelUpgrade = document.querySelector("#trøffel");
const trøffelCost = document.querySelector("#trøffelCost");
trøffelUpgrade.addEventListener("click", () => {
  buyUpgrade(5);
});

const workerAmount = document.querySelector("#workerAmount");
const workerUpgrade = document.querySelector("#worker");
const workerCost = document.querySelector("#workerCost");
workerUpgrade.addEventListener("click", () => {
  buyCPSUpgrade(6);
});

const workSpeedAmount = document.querySelector("#workSpeedAmount");
const workSpeed = document.querySelector("#workSpeed");
const workSpeedCost = document.querySelector("#workSpeedCost");
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
    updateCosts();
    saveGame();
    upgradeSound.currentTime = 0;
    upgradeSound.volume = 0.3;
    upgradeSound.play();
  }
}

function buyCPSUpgrade(int) {
  if (dollars >= upgrades[int].cost) {
    upgrades[int].amount++;
    dollars -= upgrades[int].cost;

    if (upgrades[int].amount === 1) {
      upgrades[int].cost = 10000;
    } else {
      upgrades[int].cost = Math.ceil(upgrades[int].cost * 1.5);
    }

    updateUpgrades();
    updateStats();
    updateCPS();
    updateCosts();
    saveGame();
    upgradeSound.currentTime = 0;
    upgradeSound.volume = 0.3;
    upgradeSound.play();
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
    updateCosts();
    saveGame();
    upgradeSound.currentTime = 0;
    upgradeSound.volume = 0.3;
    upgradeSound.play();
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

function updateCosts() {
  tomatSauceCost.textContent =
    upgrades[0].cost.toLocaleString("en-US", { notation: "compact" }) + "$";
  ostCost.textContent =
    upgrades[1].cost.toLocaleString("en-US", { notation: "compact" }) + "$";
  pølserCost.textContent =
    upgrades[2].cost.toLocaleString("en-US", { notation: "compact" }) + "$";
  baconCost.textContent =
    upgrades[3].cost.toLocaleString("en-US", { notation: "compact" }) + "$";
  kebabCost.textContent =
    upgrades[4].cost.toLocaleString("en-US", { notation: "compact" }) + "$";
  trøffelCost.textContent =
    upgrades[5].cost.toLocaleString("en-US", { notation: "compact" }) + "$";
  workerCost.textContent =
    upgrades[6].cost.toLocaleString("en-US", { notation: "compact" }) + "$";
  workSpeedCost.textContent =
    upgrades[7].cost.toLocaleString("en-US", { notation: "compact" }) + "$";
}

const dollarCount = document.querySelector("#dollarCount");
const clickCount = document.querySelector("#clickCount");
const cpsCount = document.querySelector("#cpsCount");

const boosterArea = document.querySelector(".left-side");
const boosterSound = new Audio("sounds/boosterMusic.mp3");

const clickSound = new Audio("sounds/clickSound.mp3");
const upgradeSound = new Audio("sounds/upgradeBuySound.mp3");

function spawnBooster() {
  const booster = document.createElement("img");
  booster.src = "images/booster.webp";
  booster.alt = "Booster";
  booster.style.zIndex = 10;
  booster.classList.add("booster");

  // tilfældig placering i procent, så den altid er inde i sectionen
  booster.style.left = Math.random() * 80 + "%";
  booster.style.top = Math.random() * 80 + "%";

  booster.addEventListener("click", () => {
    boosterSound.play();
    boosterMultiplier = 10;
    booster.remove();
    document.querySelector(".left-side").style.backgroundImage =
      "url('images/boosterimg.png')";

    setTimeout(() => {
      boosterMultiplier = 1;
      boosterSound.pause();
      boosterSound.currentTime = 0;
      document.querySelector(".left-side").style.backgroundImage =
        "url('images/pizzakoekken_1280x1080.webp')";
    }, 10000); // 10 sekunder
  });

  boosterArea.appendChild(booster);

  setTimeout(() => {
    booster.remove();
  }, 15000); // forsvinder efter 15 sekunder
}

function scheduleBooster() {
  const delay = 10000 + Math.random() * 100000; // 10-100 sekunder
  setTimeout(() => {
    spawnBooster();
    scheduleBooster();
  }, delay);
}

scheduleBooster();

function addPoint(event) {
  dollars += clicks * boosterMultiplier;
  updateStats();
  clickSound.currentTime = 0;
  playRandomClickSound(); /*NYE playsound mere creamy*/
  /*clickSound.play();   Dette var den tidligere play sound*/
  showClickEffect(event);
}

function showClickEffect(event) {
  const clickEffect = document.createElement("span");
  clickEffect.classList.add("click-effect");
  clickEffect.textContent = "+" + clicks * boosterMultiplier + "$";

  clickEffect.style.left = event.offsetX + "px";
  clickEffect.style.top = event.offsetY + "px";

  document.querySelector(".pizza").appendChild(clickEffect);

  clickEffect.addEventListener("animationend", () => {
    clickEffect.remove();
  });
}

function clicksPerSecond() {
  setInterval(() => {
    dollars += getDollarsPerSecond() * 0.03;
    updateStats();
    updateCPS();
  }, 30);
}

setInterval(() => {
  saveGame();
}, 60000);

function getSpeedMultiplier() {
  return 1 + upgrades[7].amount * upgrades[7].speed;
}

function getDollarsPerSecond() {
  return (
    upgrades[6].amount *
    upgrades[6].cps *
    getSpeedMultiplier() *
    clicks *
    boosterMultiplier
  );
}

function updateStats() {
  dollarCount.textContent = dollars.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  clickCount.textContent = (clicks * boosterMultiplier).toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 0,
    },
  );

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

function addImage(int) {
  if (upgrades[int].amount != 0 && upgrades[int].amount <= 1) {
    const pizzaButton = document.querySelector(".pizza");
    const img = document.createElement("img");
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    switch (int) {
      case 0:
        img.src = "images/02_tomatsovs.png";
        img.alt = "Pizza Sauce";
        img.style.zIndex = 1;
        img.classList.add("pizzaSauce");
        break;
      case 1:
        img.src = "images/03_ost.png";
        img.alt = "ost";
        img.style.zIndex = 2;
        img.classList.add("cheese");
        break;
      case 2:
        img.src = "images/04_polser.png";
        img.alt = "pølser";
        img.style.zIndex = imgHeight;
        img.classList.add("pølser");
        imgHeight++;
        break;
      case 3:
        img.src = "images/05_bacon.png";
        img.alt = "bacon";
        img.style.zIndex = imgHeight;
        img.classList.add("bacon");
        imgHeight++;
        break;
      case 4:
        img.src = "images/06_kebab.png";
        img.alt = "kebab";
        img.style.zIndex = imgHeight;
        img.classList.add("kebab");
        imgHeight++;
        break;
      case 5:
        img.src = "images/07_truffel.png";
        img.alt = "trøffel";
        img.style.zIndex = imgHeight;
        img.classList.add("trøffel");
        imgHeight++;
        break;
    }
    pizzaButton.appendChild(img);
  } else if (upgrades[int].amount > 1) {
    switch (int) {
      case 2:
        bringToFront(document.querySelector(".pølser"));
        break;
      case 3:
        bringToFront(document.querySelector(".bacon"));
        break;
      case 4:
        bringToFront(document.querySelector(".kebab"));
        break;
      case 5:
        bringToFront(document.querySelector(".trøffel"));
        break;
    }
  }
}

function bringToFront(element) {
  const toppings = Array.from(
    document.querySelectorAll(".pølser, .bacon, .kebab, .trøffel"),
  );

  // Sort toppings by their current z-index (lowest to highest)
  toppings.sort((a, b) => {
    return Number(a.style.zIndex) - Number(b.style.zIndex);
  });

  // Remove the selected element from the array
  const index = toppings.indexOf(element);
  toppings.splice(index, 1);

  // Add it to the end (front)
  toppings.push(element);

  // Reassign z-index values starting at 3
  toppings.forEach((img, i) => {
    img.style.zIndex = i + 3;
  });

  imgHeight = toppings.length + 3;
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

  const classes = [
    ".pizzaSauce",
    ".cheese",
    ".pølser",
    ".bacon",
    ".kebab",
    ".trøffel",
  ];
  const savedUpgradeImg = [];
  for (let i = 0; i < classes.length; i++) {
    const el = document.querySelector(classes[i]);
    if (el) {
      savedUpgradeImg[i] = Number(el.style.zIndex);
    } else {
      savedUpgradeImg[i] = 0;
    }
  }

  const save = {
    dollars: dollars,
    clicks: clicks,
    upgrades: savedUpgrades,
    images: savedUpgradeImg,
  };

  const saveText = JSON.stringify(save);
  localStorage.setItem(saveKey, saveText);
}

function reAddImage(int, zIndex) {
  if (upgrades[int].amount != 0) {
    const pizzaButton = document.querySelector(".pizza");
    const img = document.createElement("img");
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    switch (int) {
      case 0:
        img.src = "images/02_tomatsovs.png";
        img.alt = "Pizza Sauce";
        img.style.zIndex = 1;
        img.classList.add("pizzaSauce");
        break;
      case 1:
        img.src = "images/03_ost.png";
        img.alt = "ost";
        img.style.zIndex = 2;
        img.classList.add("cheese");
        break;
      case 2:
        img.src = "images/04_polser.png";
        img.alt = "pølser";
        img.style.zIndex = zIndex;
        img.classList.add("pølser");
        imgHeight++;
        break;
      case 3:
        img.src = "images/05_bacon.png";
        img.alt = "bacon";
        img.style.zIndex = zIndex;
        img.classList.add("bacon");
        imgHeight++;
        break;
      case 4:
        img.src = "images/06_kebab.png";
        img.alt = "kebab";
        img.style.zIndex = zIndex;
        img.classList.add("kebab");
        imgHeight++;
        break;
      case 5:
        img.src = "images/07_truffel.png";
        img.alt = "trøffel";
        img.style.zIndex = zIndex;
        img.classList.add("trøffel");
        imgHeight++;
        break;
    }
    pizzaButton.appendChild(img);
  }
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

  for (let i = 0; i < save.images.length; i++) {
    if (upgrades[i].amount != 0) {
      reAddImage(i, save.images[i]);
    }
  }

  updateUpgrades();
  updateStats();
  updateCPS();
}

loadGame();
updateCosts();
clicksPerSecond();
updateStats();

const textSaveGame = document.querySelector("#oneMinSaveText");

function showSaveMessage() {
  textSaveGame.classList.add("show");

  setTimeout(() => {
    textSaveGame.classList.remove("show");
  }, 2000);
}

setInterval(() => {
  saveGame();
  showSaveMessage();
}, 60000);

const reset = document.querySelector("#resetButton");
const save = document.querySelector("#saveButton");
const shutDown = new Audio("sounds/window.mp3");

function playShutDown() {
  shutDown.play();
}
save.addEventListener("click", () => {
  saveGame();
  showSaveMessage();
});

reset.addEventListener("click", () => {
  if (confirm("Do you want to reset the game?")) {
    localStorage.removeItem(saveKey);
    sessionStorage.setItem("resetShutDown", "true");
    location.reload();
  }
});

if (sessionStorage.getItem("resetShutDown") === "true") {
  sessionStorage.removeItem("resetShutDown");
  playShutDown();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const click1 = new Audio("sounds/clickSound/click1.mp3");
const click2 = new Audio("sounds/clickSound/click2.mp3");
const click3 = new Audio("sounds/clickSound/click3.mp3");
const click4 = new Audio("sounds/clickSound/click4.mp3");
const click5 = new Audio("sounds/clickSound/click5.mp3");
const click6 = new Audio("sounds/clickSound/click6.mp3");
const click7 = new Audio("sounds/clickSound/click7.mp3");

function playRandomClickSound() {
  click7.volume = 0.2;
  click7.play();
  click7.currentTime = 0;
}

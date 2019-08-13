// need to figure out how to combine choosing a die and an ability
const buttonRollAllDice = document.getElementById("roll-dice");
const buttonResetRolledDice = document.getElementById("reset-rolls");
const buttonResetBoth = document.getElementById("reset-both");
const keptDiceDisplay = document.getElementById("kept-dice");
const rolledDiceDisplay = document.getElementById("rolled-dice");

let keptDice = [];
let rolls = [];

buttonRollAllDice.addEventListener("click", function() {
	rollDice();
});

buttonResetRolledDice.addEventListener("click", function() {
	resetRolls();	
});

buttonResetBoth.addEventListener("click", function() {
	resetBoth();
});

function rollDice(numOfDice = "6") {
	for(let i = 0; i < numOfDice; i ++) {
		rollDie();
	}
	displayRolls();
}

function rollDie() {
	let roll = Math.floor(Math.random() * 6 + 1);
	return rolls.push(roll);
}

function chooseDice(...num) {
	for(let i = 0; i < num.length; i++) {
		keptDice.push(num[i]);
	}
	displayKeptDice();
	displayRolls();
}

function displayRolls() {
	rolls.sort();
	rolledDiceDisplay.innerHTML = "Rolled Dice: <br/>" + changeDiceNumbersToIcons(rolls, rolledDiceDisplay);
}

function displayKeptDice() {
	keptDice.sort();
	keptDiceDisplay.innerHTML = "Kept Dice: <br/>" + changeDiceNumbersToIcons(keptDice, keptDiceDisplay);
}

function createDieIcon(diceArray, diceDisplay) {
	const dieIcon = document.createElement("i");
	dieIcon.innerHTML = changeDiceNumbersToIcons(diceArray);
	diceDisplay.append(dieIcon);
}

function changeDiceNumbersToIcons(diceArray) {
	let icon = "";
	for(let i = 0; i < diceArray.length; i++) {
		if(diceArray[i] === 1) {
			icon += '<i class="fas fa-dice-one large"></i>';
		}
		if(diceArray[i] === 2) {
			icon += '<i class="fas fa-dice-two large"></i>';
		}
		if(diceArray[i] === 3) {
			icon += '<i class="fas fa-dice-three large"></i>';
		}
		if(diceArray[i] === 4) {
			icon += '<i class="fas fa-dice-four large"></i>';
		}
		if(diceArray[i] === 5) {
			icon += '<i class="fas fa-dice-five large"></i>';
		}
		if(diceArray[i] === 6) {
			icon += '<i class="fas fa-dice-six large"></i>';
		}
	}
	return icon;
}

function resetRolls() {
	rolls = [];
	displayRolls();
}

function resetKeptDice() {
	keptDice = [];
	displayKeptDice();
}

function resetBoth() {
	resetRolls();
	resetKeptDice();
}

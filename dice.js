const buttonRollAllDice = document.getElementById("roll-dice");
const buttonResetRolledDice = document.getElementById("reset-rolls");
const buttonResetBoth = document.getElementById("reset-both");
const buttonChooseDice = document.getElementById("choose-dice");
const buttonUnchooseDie = document.getElementById("unchoose-die");
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

buttonUnchooseDie.addEventListener("click", function() {
	let input = prompt("Which die do you want to unchoose? Number 1-6.");
	input = Number.parseInt(input, 10);
	unchooseDie(input);
});

buttonChooseDice.addEventListener("click", function() {
	let diceChoice = [];
	let input = prompt("Input the pip value(s) of the die/dice you want to keep. To choose multiple at once, separate with commas. Numbers 1-6.")

	if(input == null) {
		return;
	}

	if(input.includes(",")) {
		input = input.split(",");

		for(let i = 0; i < input.length; i++) {
			input[i] = Number.parseInt(input[i], 10);
		}

		diceChoice = input;
	} else {
		input = Number.parseInt(input, 10);
		diceChoice.push(input);
	}

	// verifies all chosen dice exist in rolls, then moves selected to keptDice and removes from rolls
	if(checkChosenDiceExist(diceChoice)) {
		chooseDice(diceChoice);
		removeChosenDice(diceChoice);
	} else {
		displayNotificationForShortTime("One or more of your choices is invalid. Try again.");
	}

});

function checkChosenDiceExist(diceChoice) {
	let checked = 0;
	for(let i = 0; i < diceChoice.length; i++) {
		if(rolls.includes(diceChoice[i])) {
			checked++;
		} 
	}

		if(checked === diceChoice.length) {
			return true;
		}
		else {
			return false;
		}
}

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

function chooseDice(num) {
	for(let i = 0; i < num.length; i++) {
		keptDice.push(num[i]);
	}		
	
	displayKeptDice();
	displayRolls();
}

function unchooseDie(input) {
	let chosenDie = input;
	let index = keptDice.indexOf(chosenDie);
	keptDice.splice(index, 1);
	rolls.push(chosenDie);
	displayRolls();
	displayKeptDice();
}

function removeChosenDice(input) {
	let chosenDice = input; // needs to be an array

	for(let i = 0; i < chosenDice.length; i++) {
		rolls.includes(chosenDice[i]);
		let index = rolls.indexOf(chosenDice[i]);
		rolls.splice(index, 1);
	}
	displayRolls();
}

function displayRolls() {
	rolls.sort();
	rolledDiceDisplay.innerHTML = "Rolled Dice: <br/>" + changeDiceNumbersToIcons(rolls, rolledDiceDisplay);
}

function displayKeptDice() {
	keptDice.sort();
	keptDiceDisplay.innerHTML = "Chosen Dice: <br/>" + changeDiceNumbersToIcons(keptDice, keptDiceDisplay);
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

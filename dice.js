// need to figure out how to combine choosing a die and an ability
const buttonRollAllDice = document.getElementById("roll-dice");
const buttonRollSomeDice = document.getElementById("roll-some-dice");
const buttonResetRolledDice = document.getElementById("reset-rolls");
const buttonResetBoth = document.getElementById("reset-both");
const buttonChooseDice = document.getElementById("choose-dice");
const keptDiceDisplay = document.getElementById("kept-dice");
const rolledDiceDisplay = document.getElementById("rolled-dice");

let keptDice = [];
let rolls = [];

buttonRollAllDice.addEventListener("click", function() {
	rollDice();
});

buttonRollSomeDice.addEventListener("click", function() {
	let input = prompt("How many dice to roll? Number 1-6.");
	input = Number.parseInt(input, 10);
	rollDice(input);
});

buttonResetRolledDice.addEventListener("click", function() {
	resetRolls();	
});

buttonResetBoth.addEventListener("click", function() {
	resetBoth();
});

buttonChooseDice.addEventListener("click", function() {
	let diceChoice = [];
	let input = prompt("Input the pip value(s) of the die/dice you want to keep. To choose multiple at once, separate with commas. Numbers 1-6.")

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
	chooseDice(diceChoice);
	removeChosenDice(diceChoice);
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

function chooseDice(num) {
	for(let i = 0; i < num.length; i++) {
		keptDice.push(num[i]);
	}
	displayKeptDice();
	displayRolls();
	// removeChosenDice(num);
}

function removeChosenDice(input) {
// currently, if chosen die doesn't exist in rolls, then last die is spliced out regardless of value
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
	console.log(rolls); // DELETE ME
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

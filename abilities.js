function flipAbility() {
	let input = prompt("Which die do you want to flip? Input 1 through 6.");
	let flippedValue = [];

	if(input === "6") {
		flippedValue = [1];
	}
	if(input === "5") {
		flippedValue = [2];
	}
	if(input === "4") {
		flippedValue = [3];
	}
	if(input === "3") {
		flippedValue = [4];
	}
	if(input === "2") {
		flippedValue = [5];
	}
	if(input === "1") {
		flippedValue = [6];
	}

	input = [Number.parseInt(input, 10)];	
	removeChosenDice(input);
	rolls.push(flippedValue[0]);
	displayRolls();
}

function incDec(clickedElement) {
	// clickedElement comes from useAbility in lanterns.js
	let input = prompt('Which die do you want to increment up or down? Ex: "5 +" or "5 -"');
	let incDecValue = [];

	input = input.split(" ");
	input.sort();
	input[1] = Number.parseInt(input[1], 10);

	if(input[0] === "+" || input[0] === "-") {
		if(input.includes("+")) {
			incDecValue[0] = input[1] + 1;
		}
		if(input.includes("-")) {
			incDecValue[0] = input[1] - 1;
		}
		input.shift();
		removeChosenDice(input);
		rolls.push(incDecValue[0]);
		displayRolls();
	} else {
		alert("You forgot to include + or -");
		resetAbility(clickedElement);
	}
}

function reRollOneDie(clickedElement) {
	// clickedElement comes from useAbility in lanterns.js
	let input = prompt("Which die do you want to re-roll?");
	input = input.split(",");

	if(input.length > 1) {
		alert("You can only re-roll 1 die.");
		resetAbility(clickedElement);
	} else {
		input = [Number.parseInt(input, 10)];
	}

	if(!rolls.includes(input[0])) {
		alert("Choice doesn't exist, try again.");
		resetAbility(clickedElement);
	} else {
		removeChosenDice(input);
		rollDie();
		displayRolls();
	}
}

function reRollAnyDice() {
	let input = prompt("Which dice do you want to re-roll? Input values, separated by commas. Or type ALL to re-roll all remaining dice.");

	if(input = "all") {
		let remaining = rolls.length;
		resetRolls();
		rollDice(remaining);
	} else {
		input = input.split(",");

		for(let i = 0; i < input.length; i++) {
			input[i] = Number.parseInt(input[i], 10);
		}

		// console.log(input); // DELETE ME

		// remove 
		removeChosenDice(input);

		// reroll # of dice
		rollDice(input.length);
	}
}
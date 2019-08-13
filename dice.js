// need to figure out how to combine choosing a die and an ability

let keptDice = [];
let rolls = [];

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
	console.log("Rolls:", rolls);
}

function displayKeptDice() {
	keptDice.sort();
	console.log("Kept Dice:", keptDice);
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
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
	chooseDice(flippedValue);
}

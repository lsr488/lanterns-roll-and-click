const expCircles = document.querySelectorAll('[exp="true"]');
const pathCircles = document.getElementsByClassName("small");
const abilities = document.querySelectorAll('[ability="true"]');

const completedPaths = [...pathCircles];
const completedExp = [...expCircles];
const assignedAbilities = [...abilities];

// excludes camp exp circle from ability circle array
const shortCompletedExp = completedExp.slice(1);
// camp exp circl only
const campExp = completedExp.slice(0,1);

// add event listeners to camp abilities
campExp.forEach(function(item) {
	item.addEventListener("click", function(e) {
		if(item.getAttribute("completed") === "false") {
			useAbility(item);
			appendAbility("reroll-any");
		}
	});
});

// add event listeners to ability circles
// counts when ability circle is used
shortCompletedExp.forEach(function(item) {
	item.addEventListener("click", function(e) {
		if(item.getAttribute("completed") === "false") {
			useAbility(item);
		}
		countUsedExperienceCircles();
	});
});

// sets circles to each ability
// adds event listeners to ability circles
assignedAbilities.forEach(function(item) {
	item.addEventListener("click", function(e) {
		parentElement = e.target.parentNode;

		// sets number of circles
		if(parentElement.getAttribute("set") === "false") {
			const input = prompt("How many circles? Enter a number 1 through 6.", "1");
			if(input > 0 && input < 7) {
				for(let i = 0; i < input; i++) {
					const circle = document.createElement("i");
					setAbility(circle); // creates circle and calls useAbility (changes to closed circle)
					parentElement.append(circle);
				}
			}	else {
				alert("Choose a number 1 through 6.");
			}	

			parentElement.setAttribute("set", "true");
		}
		// countUsedAbilityCircles();
		isGameOver();
	});
});

// add event listeners to path circles
// counts path circles as completed
completedPaths.forEach(function(item) {
	item.addEventListener("click", function(e) {
		// console.log(item);
		// let parentElement = e.target.parentNode;
		let parentId = e.target.parentNode.id;

		// console.log("parentElement:", parentElement);  // DELETE ME
		console.log("parentId:",parentId); // DELETE ME

		// check if kept dice === win condition of level
			// if yes, completePath if statement
			// if no, alert

		if(item.getAttribute("completed") === "false") {
			isPathComplete(e);
			// isPathComplete(parentId);
			// completePath(item);
		}
	});
});

function isPathComplete(item) {
	const parentId = item.target.parentNode.id

	// console.log("item:", item); // DELETE ME
	// console.log("item.target:", item.target.parentNode.parentNode.id); // DELETE ME 

	const pathObjectives = {
		1: {combo: [4, 5, "three-of-a-kind"], total: 3, id: 1},
		2: {combo: [2, 3, 4, "pair"], total: 4, id: 2},
		3: {combo: [3, 4, 5, "three-of-a-kind"], total: 4, id: 3},
		4: {combo: ["three-of-a-kind", "three-of-a-kind"], total: 2, id: 4},
		6: {combo: [2 ,3, 4, "three-of-a-kind"], total: 4, id: 6},
		7: {combo: [4, 5, 6, "three-of-a-kind"], total: 4, id: 7},
		8: {combo: ["all matching"], total: 6, id: 8},
	}
	let count = 0;

	// switch(parentId) { // DELETE ME
	// 	case "1": 
	// 		chooseDice([3,3, 3, 4,5]); 
	// 		break;
	// 	case "2":
	// 		chooseDice([2, 3, 3, 3, 4]);
	// 		break;
	// 	case "3":
	// 		chooseDice([3, 4, 5, 2, 2, 2]);
	// 		break;		
	// 	case "4":
	// 		chooseDice([1, 1, 1, 2, 2, 2]);
	// 		break;
	// 	case "6":
	// 		chooseDice([2, 3, 4, 1, 1, 1]);
	// 		break;
	// 	case "7":
	// 		chooseDice([4, 5, 6, 1, 1, 1]);
	// 		break;
	// 	case "8":
	// 		chooseDice([3, 3, 3, 3, 3, 3]);
	// 		break;
	// 	}

	// console.log("pathObjective:", pathObjectives[parentId]);  // DELETE ME
	console.log(keptDice); // DELETE ME


	let keptDiceCopy = keptDice.slice();
	// console.log(keptDiceCopy); // DELETE ME

	// why doesn't === work, but == does?
	// LEVEL 1, 5 dice / 3-of-a-kind
	if(parentId == 1) {
		// console.log("with obj 4:", keptDiceCopy.includes(pathObjectives[parentId]["combo"][0]));  // DELETE ME

		// does keptDice include first solution element
		if(keptDiceCopy.includes(pathObjectives[parentId]["combo"][0])) {
			count++;
			let i = keptDiceCopy.indexOf(pathObjectives[parentId]["combo"][0]);
			// console.log(i);
			keptDiceCopy.splice(i, 1);
			// console.log(keptDiceCopy);
		}

		// console.log("with obj 5:", keptDiceCopy.includes(pathObjectives[parentId]["combo"][1]));  // DELETE ME

		// does keptDice include second solution element
		if(keptDiceCopy.includes(pathObjectives[parentId]["combo"][1])) {
			count++;
			i = keptDiceCopy.indexOf(pathObjectives[parentId]["combo"][1]);
			keptDiceCopy.splice(i, 1);
			// console.log(keptDiceCopy);
		}
		
		// check for three-of-a-kind
		if(pathObjectives[parentId]["combo"].includes("three-of-a-kind")) {
			if(keptDiceCopy[0] === keptDiceCopy[1] && keptDiceCopy[1] === keptDiceCopy[2] && keptDiceCopy.length > 0) {
				// console.log("three-of-a-kind"); // DELETE ME
				// keptDiceCopy.push("three-of-a-kind"); // DELETE ME
				count++;
			}
		}

		if(count === pathObjectives[parentId]["total"]) {
			console.log(`You completed Path ${pathObjectives[parentId]["id"]}!`);
				completePath(item.target);
				isGameOver();
				resetBoth();
		} else {
			// alert(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`);
			console.log(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`)
			resetPath(item.target);
			// what else happens when you don't have the dice? can you reset the kept dice?
		}
	}

	// LEVEL 2 5 dice / pair
	if(parentId == 2) {
		// console.log("with obj 2:", keptDiceCopy.includes(pathObjectives[parentId]["combo"][0])); // DELETE ME

		// does keptDice include first solution element
		if(keptDiceCopy.includes(pathObjectives[parentId]["combo"][0])) {
			count++;
			let i = keptDiceCopy.indexOf(pathObjectives[parentId]["combo"][0]);
			// console.log(i);

			keptDiceCopy.splice(i, 1);
			// console.log(keptDiceCopy);
		}

		// console.log("with obj 3:", keptDiceCopy.includes(pathObjectives[parentId]["combo"][1])); // DELETE ME

		// does keptDice include second solution element
		if(keptDiceCopy.includes(pathObjectives[parentId]["combo"][1])) {
			count++;
			i = keptDiceCopy.indexOf(pathObjectives[parentId]["combo"][1]);
			keptDiceCopy.splice(i, 1);
			// console.log(keptDiceCopy); // DELETE ME
		}

		// console.log("with obj 4:", keptDiceCopy.includes(pathObjectives[parentId]["combo"][2])); // DELETE ME

		// does keptDice include third solution element
		if(keptDiceCopy.includes(pathObjectives[parentId]["combo"][2])) {
			count++;
			i = keptDiceCopy.indexOf(pathObjectives[parentId]["combo"][2]);
			keptDiceCopy.splice(i, 1);
			// console.log(keptDiceCopy); // DELETE ME
		}
		
		// check for pair
		if(pathObjectives[parentId]["combo"].includes("pair")) {
			if(keptDiceCopy[0] === keptDiceCopy[1] && keptDiceCopy.length > 0) {
				// console.log("pair"); // DELETE ME
				// keptDiceCopy.push("pair"); // DELETE ME
				count++;
			}
		}

		if(count === pathObjectives[parentId]["total"]) {
			console.log(`You completed Path ${pathObjectives[parentId]["id"]}!`);
			completePath(item.target);
			isGameOver();
			resetBoth();
		} else {
			// alert(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`);
			console.log(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`)
			resetPath(item.target);
		}
	}

	// LEVEL 3 & 6 & 7, 6 dice / three-of-a-kind
	if(parentId == 3 || parentId == 6 || parentId == 7) {
		// console.log("with obj 3:", keptDiceCopy.includes(pathObjectives[parentId]["combo"][0])); // DELETE ME

		// does keptDice include first solution element
		if(keptDiceCopy.includes(pathObjectives[parentId]["combo"][0])) {
			count++;
			let i = keptDiceCopy.indexOf(pathObjectives[parentId]["combo"][0]);
			// console.log(i);
			keptDiceCopy.splice(i, 1);
			// console.log(keptDiceCopy);
		}

		// console.log("with obj 4:", keptDiceCopy.includes(pathObjectives[parentId]["combo"][1])); // DELETE ME

		// does keptDice include second solution element
		if(keptDiceCopy.includes(pathObjectives[parentId]["combo"][1])) {
			count++;
			i = keptDiceCopy.indexOf(pathObjectives[parentId]["combo"][1]);
			keptDiceCopy.splice(i, 1);
			// console.log(keptDiceCopy); // DELETE ME
		}

		// console.log("with obj 5:", keptDiceCopy.includes(pathObjectives[parentId]["combo"][2]));  // DELETE ME

		// does keptDice include third solution element
		if(keptDiceCopy.includes(pathObjectives[parentId]["combo"][2])) {
			count++;
			i = keptDiceCopy.indexOf(pathObjectives[parentId]["combo"][2]);
			keptDiceCopy.splice(i, 1);
			// console.log(keptDiceCopy); // DELETE ME
		}
		
		// check for three-of-a-kind
		if(pathObjectives[parentId]["combo"].includes("three-of-a-kind")) {
			if(keptDiceCopy[0] === keptDiceCopy[1] && keptDiceCopy[1] === keptDiceCopy[2] && keptDiceCopy.length > 0) {
				// console.log("three-of-a-kind"); // DELETE ME
				// keptDiceCopy.push("three-of-a-kind"); // DELETE ME
				count++;
			}
		}

		if(count === pathObjectives[parentId]["total"]) {
			console.log(`You completed Path ${pathObjectives[parentId]["id"]}!`);
			completePath(item.target)
			isGameOver();
			resetBoth();
		} else {
			// alert(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`);
			console.log(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`)
			resetPath(item.target);
		}
	}

		// LEVEL 4, 2 three-of-a-kinds
	if(parentId == 4) {
		// check for 1st three-of-a-kind
		if(pathObjectives[parentId]["combo"].includes("three-of-a-kind")) {
			if(keptDiceCopy[0] === keptDiceCopy[1] && keptDiceCopy[1] === keptDiceCopy[2]) {
				count++;
				keptDiceCopy.splice(0, 3);
				// console.log("three-of-a-kind"); // DELETE ME
			}
		}

		// console.log(keptDiceCopy); // DELETE ME

		// check for 2nd three-of-a-kind
		if(pathObjectives[parentId]["combo"].includes("three-of-a-kind")) {
			if(keptDiceCopy[0] === keptDiceCopy[1] && keptDiceCopy[1] === keptDiceCopy[2] && keptDiceCopy.length > 0) {
				count++;
				// console.log("three-of-a-kind"); // DELETE ME
				// keptDiceCopy.slice(0, 2); // DELETE ME
			}
		}

		if(count === pathObjectives[parentId]["total"]) {
			console.log(`You completed Path ${pathObjectives[parentId]["id"]}!`);
			completePath(item.target)
			isGameOver();
			resetBoth();
		} else {
			// alert(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`);
			console.log(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`)
			resetPath(item.target);
		}
	}

	// LEVEL 5
	if(item.target.parentNode.parentNode.id == 5) {
		completePath(item.target);
	}

	// LEVEL 8, all 6 matching
	if(parentId == 8) {
		if(pathObjectives[parentId]["combo"].includes("all matching")) {
			for(let i = 0; i < keptDiceCopy.length; i++) {
				if(keptDiceCopy[0] === keptDiceCopy[i] && keptDiceCopy.length > 0) {
					count++;
				} 
			}
		}

		if(count === pathObjectives[parentId]["total"]) {
			console.log(`You completed Path ${pathObjectives[parentId]["id"]}!`);
			completePath(item.target);
			isGameOver();
			resetBoth();
		} else {
			// alert(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`);
			console.log(`You didn't complete Path ${pathObjectives[parentId]["id"]}.`)
			resetPath(item.target);
		}
	}

	console.log("count:", count); // DELETE ME
}

function completePath(item) {
		item.setAttribute("class", "fas fa-circle small");
		item.setAttribute("completed", "true");

		// reset both kept and rolled dice
		// resetBoth();
}

function resetPath(item) {
		item.setAttribute("class", "far fa-circle small");
		item.setAttribute("completed", "false");

		// reset both kept and rolled dice
		// resetBoth();
}

function useAbility(item) {
		item.setAttribute("class", "fas fa-circle medium");
		item.setAttribute("completed", "true");
		// console.log(item); // DELETE ME

		// ability circles that affect dice
		if(item.parentNode.id == "flip") {
			flipAbility(item);
		}
		if(item.parentNode.id === "inc-dec") {
			incDec(item);
		}
		if(item.parentNode.id === "reroll-1") {
			reRollOneDie(item);
		}
		if(item.parentNode.id === "reroll-any") {
			reRollAnyDice(item);
		}
}

function setAbility(item) {
	item.setAttribute("class", "far fa-circle medium");
	item.setAttribute("completed", "false");
	item.addEventListener("click", function() {
		useAbility(item);
	});
}

function resetAbility(item) {
	// item gets passed from useAbility to the ability function and finally to resetAbility, to get the right circle to reset
	item.setAttribute("class", "far fa-circle medium");
	item.setAttribute("completed", "false");
}

function countUsedExperienceCircles() {
	let count = 0;

	for(let i = 0; i < shortCompletedExp.length; i++) {
		for(let j = 0; j < shortCompletedExp[i].attributes.length; j++) {
			if(shortCompletedExp[i].attributes[j].name == "completed") {
				if(shortCompletedExp[i].attributes[j].value === "true") {
					count++;					
				}		
			} 
		}	
	}
	if(count === 5 || count === 9 || count === 12) {
		increaseAbility();
	}
}

function countCompletedPathCircles() {
	let count = 0;

	for(let i = 0; i < completedPaths.length; i++) {
		for(let j = 0; j < completedPaths[i].attributes.length; j++) {
			if(completedPaths[i].attributes[j].name == "completed") {
				if(completedPaths[i].attributes[j].value === "true") {
					count++;					
				}		
			} 
		}	
	}

	return count;
}

function countUsedAbilityCircles() {
	let abilityCircles = assignedAbilities.slice(2);
	let count = 0;

	for(let i = 0; i < abilityCircles.length; i++) {
		for(let j = 0; j < abilityCircles[i].children.length; j++) {
			// let usedCircles = abilityCircles[i].children[j].classList;
			if(abilityCircles[i].children[j].classList.value === "fas fa-circle medium") {
				count++;
			}
		}
	}
	// console.log("used ability circle count:", count); // DELETE ME
	return count;	
}

function increaseAbility() {
	let input = prompt("Experience row completed! Increase an ability of your choice by 1: flip, inc-dec, reroll-1, reroll-any");

	input = input.toLowerCase();
	appendAbility(input);
}

function appendAbility(input) {
	const selectedAbility = document.getElementById(input);
	const circle = document.createElement("i");	

	for(let i = 0; i < abilities.length; i++) {
		if(abilities[i].id === input) {
			setAbility(circle);
			selectedAbility.append(circle);
		}
	}
}

function scoreGame(assignedAbilities) {
	let scoredAbilities = assignedAbilities.slice(2);
	let count = 0;

	// console.log(scoredAbilities); // DELETE ME

	for(let i = 0; i < scoredAbilities.length; i++) {
		// console.log(scoredAbilities[i].children);
		let children = scoredAbilities[i].children;
		for(let j = 0; j < children.length; j++) {
			// console.log("children:", children[j].classList); // DELETE ME
			let childrenCircles = children[j].classList;
			// console.log("CCV:", childrenCircles.value); // DELETE ME
			if(childrenCircles.value === "fas fa-circle medium") {
				// console.log("CLOSED CIRCLE"); // DELETE ME
				count++;
			}
		}
	}
	console.log("end of game scoring:", count);
	return count;
}

function isGameOver() {
// Game Over if:
	// all 8 paths are complete
	if(countCompletedPathCircles() === 8) {
		console.log("GAME OVER. YOU WIN."); // DELETE ME
		scoreGame(assignedAbilities);
		countUsedAbilityCircles();
	}

	// no unused abilities left
	// total ability circles === used ability circles
	let totalAbilities = assignedAbilities.slice(2);
	let totalAbilityCount = 0;
	let totalUsedAbilities = countUsedAbilityCircles();

	for(let i = 0; i < totalAbilities.length; i++) {
		for(let j = 0; j < totalAbilities[i].children.length; j++) {
			if(totalAbilities[i].children[j].classList.value.includes("circle")) {
				totalAbilityCount++;
			}
		}
	}

	if(totalUsedAbilities === totalAbilityCount && countCompletedPathCircles() < 8) {
		console.log("GAME OVER. NO MOVES LEFT.") // DELETE ME
		scoreGame(assignedAbilities);
	}
}
const expCircles = document.querySelectorAll('[exp="true"]');
const pathCircles = document.getElementsByClassName("small");
const abilities = document.querySelectorAll('[ability="true"]');
const msg = document.getElementById("msg");

const completedPaths = [...pathCircles];
const completedExp = [...expCircles];
const assignedAbilities = [...abilities];

// excludes camp reroll ability circle from experience circle array
const shortCompletedExp = completedExp.slice(1);
// camp reroll ability circle only
const campAbility = completedExp.slice(0,1);

// add event listeners to camp abilities
campAbility.forEach(function(item) {
	item.addEventListener("click", function(e) {
		if(item.getAttribute("completed") === "false") {
			useAbility(item);
			// auotmatically appends reroll ability when camp ability circle clicked
			appendAbility("reroll-any");
			updateAbilityCount(e);
		}
	});
});

// add event listeners to exp circles
	// useAbility == mark exp circle as used
// counts when exp circle is used
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
		console.log("parentElement:", e.target.parentNode);
		console.log("e.target:", e.target);

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
			// console.log(e); // DELETE ME
			// console.log(e.target.children); // DELETE ME
			updateAbilityCount(e);
		}

		isGameOver();
	});
});

		// HERE 8/31/19, figuring out how to get camp exp circle to auto-fill exp in char sheet
		// move camp exp to char sheet on click
		// if(parentElement.id == "camp-exp") {
		// 	moveCampExpToCharacterSheet(item);
		// }
function moveCampExpToCharacterSheet(item) {
	// 	console.log("item:", item.children);
	// // console.log("item kids:", item.children);
	// for(let i = 0; i < item.children.length; i++) {
	// 	// console.log(item.children[i]);
	// 	console.log("kid classlist:", item.children[i].classList);
	// 	if(item.children[i].classList.value.includes("circle")) {
	// 		// useAbility(item);
	// 		console.log("yes");					
	
	// 	}
	// }
}

// add event listeners to path circles
// counts path circles as completed
completedPaths.forEach(function(item) {
	item.addEventListener("click", function(e) {
		// console.log(item);
		// let parentElement = e.target.parentNode;
		let parentId = e.target.parentNode.id;

		// console.log("parentElement:", parentElement);  // DELETE ME
		console.log("parentId:",parentId); // DELETE ME

		if(item.getAttribute("completed") === "false") {
			isPathComplete(e);
		}
	});
});

function displayNotificationForShortTime(notification) {
	// 10000 = 10 seconds
	msg.textContent = notification;
	window.setTimeout(function() {
		msg.textContent = "";
	}, 4000);
}

function keptDiceCheckSpecificValue(keptDiceCopy, pathObjectiveCombo, element) {
	let i = keptDiceCopy.indexOf(pathObjectiveCombo[element]);
	keptDiceCopy.splice(i, 1);
	return keptDiceCopy;
}


function isPathComplete(item) {
	let parentId;
	let pathObjectiveCombo;
	
	// Level 5 parent element ID is two levels up, unlike ever other path that's just 1 level up
	if(item.target.parentNode.parentNode.id == 5) {
		parentId = item.target.parentNode.parentNode.id
	} else {
		parentId = item.target.parentNode.id
	}

	// console.log("item:", item); // DELETE ME
	// console.log("item.target:", item.target.parentNode.parentNode.id); // DELETE ME 

	const pathObjectives = {
		1: {combo: [4, 5, "three-of-a-kind"], total: 3, id: 1},
		2: {combo: [2, 3, 4, "pair"], total: 4, id: 2},
		3: {combo: [3, 4, 5, "three-of-a-kind"], total: 4, id: 3},
		4: {combo: ["three-of-a-kind", "three-of-a-kind"], total: 2, id: 4},
		5: {id: 5},
		6: {combo: [2 ,3, 4, "three-of-a-kind"], total: 4, id: 6},
		7: {combo: [4, 5, 6, "three-of-a-kind"], total: 4, id: 7},
		8: {combo: ["all matching"], total: 6, id: 8},
	}
	let count = 0;

	if(parentId != 5) {
		pathObjectiveCombo = pathObjectives[parentId]["combo"];
	}


	console.log(pathObjectiveCombo);

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

	console.log(keptDice); // DELETE ME


	let keptDiceCopy = keptDice.slice();
	
		// LEVEL 1, 5 dice / 3-of-a-kind
	if(parentId == 1) {
	 // does keptDice include first solution element
		if(keptDiceCopy.includes(pathObjectiveCombo[0])) {
			count++;
			keptDiceCheckSpecificValue(keptDiceCopy, pathObjectiveCombo, 0);
		}

		// does keptDice include second solution element
		if(keptDiceCopy.includes(pathObjectiveCombo[1])) {
			count++;
			keptDiceCheckSpecificValue(keptDiceCopy, pathObjectiveCombo, 1);
		}
		
		// check for three-of-a-kind
		if(pathObjectives[parentId]["combo"].includes("three-of-a-kind")) {
			if(keptDiceCopy[0] === keptDiceCopy[1] && keptDiceCopy[1] === keptDiceCopy[2] && keptDiceCopy.length > 0) {
				count++;
			}
		}

		// display whether path completed or not
		if(count === pathObjectives[parentId]["total"]) {
			pathObjectiveCompleted(pathObjectives[parentId]);
			completePath(item.target);
			isGameOver();
			resetBoth();
		 } else {
		 	pathObjectiveNotCompleted(pathObjectives[parentId]);
			resetPath(item.target);
			// what else happens when you don't have the dice? can you reset abilities?
		}
	}

	// LEVEL 2; 5 dice / pair
	if(parentId == 2) {
	 // does keptDice include first solution element
		if(keptDiceCopy.includes(pathObjectiveCombo[0])) {
			count++;
			keptDiceCheckSpecificValue(keptDiceCopy, pathObjectiveCombo, 0);
		}

		// does keptDice include second solution element
		if(keptDiceCopy.includes(pathObjectiveCombo[1])) {
			count++;
			keptDiceCheckSpecificValue(keptDiceCopy, pathObjectiveCombo, 1);
		}
		
		// does keptDice include third solution element
		if(keptDiceCopy.includes(pathObjectiveCombo[2])) {
			count++;
			keptDiceCheckSpecificValue(keptDiceCopy, pathObjectiveCombo, 2);
		}
		
		// check for pair
		if(pathObjectives[parentId]["combo"].includes("pair")) {
			if(keptDiceCopy[0] === keptDiceCopy[1] && keptDiceCopy.length > 0) {
				count++;
			}
		}

		// display whether path completed or not
		if(count === pathObjectives[parentId]["total"]) {
			pathObjectiveCompleted(pathObjectives[parentId]);
			completePath(item.target);
			isGameOver();
			resetBoth();
		} else {
		 	pathObjectiveNotCompleted(pathObjectives[parentId]);
			resetPath(item.target);
		}
	}

	// LEVEL 3 & 6 & 7, 6 dice / three-of-a-kind
	if(parentId == 3 || parentId == 6 || parentId == 7) {
		// does keptDice include first solution element
		if(keptDiceCopy.includes(pathObjectiveCombo[0])) {
			count++;
			keptDiceCheckSpecificValue(keptDiceCopy, pathObjectiveCombo, 0);
		}

		// does keptDice include second solution element
		if(keptDiceCopy.includes(pathObjectiveCombo[1])) {
			count++;
			keptDiceCheckSpecificValue(keptDiceCopy, pathObjectiveCombo, 1);
		}


		// does keptDice include third solution element
		if(keptDiceCopy.includes(pathObjectiveCombo[2])) {
			count++;
			keptDiceCheckSpecificValue(keptDiceCopy, pathObjectiveCombo, 2);
		}
		
		// check for three-of-a-kind
		if(pathObjectives[parentId]["combo"].includes("three-of-a-kind")) {
			if(keptDiceCopy[0] === keptDiceCopy[1] && keptDiceCopy[1] === keptDiceCopy[2] && keptDiceCopy.length > 0) {
					count++;
			}
		}

		// display whether path completed or not
		if(count === pathObjectives[parentId]["total"]) {
			pathObjectiveCompleted(pathObjectives[parentId]);
			completePath(item.target)
			isGameOver();
			resetBoth();
		} else {
		 	pathObjectiveNotCompleted(pathObjectives[parentId]);
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
			}
		}

		// check for 2nd three-of-a-kind
		if(pathObjectives[parentId]["combo"].includes("three-of-a-kind")) {
			if(keptDiceCopy[0] === keptDiceCopy[1] && keptDiceCopy[1] === keptDiceCopy[2] && keptDiceCopy.length > 0) {
				count++;
			}
		}

		// display whether path completed or not
		if(count === pathObjectives[parentId]["total"]) {
			pathObjectiveCompleted(pathObjectives[parentId]);
			completePath(item.target)
			isGameOver();
			resetBoth();
		} else {
		 	pathObjectiveNotCompleted(pathObjectives[parentId]);
			// displayNotificationForShortTime(notification);
			resetPath(item.target);
		}
	}

	// LEVEL 5
	// TODO: check if all camp circles used, if yes complete, else not complete
	if(parentId == 5) {
		// console.log(path)
		// console.log(`You completed Path ${pathObjectives[item.target.parentNode.parentNode.id]["id"]}!`); // DELETE ME
		// let notification = `You completed Path ${pathObjectives[item.target.parentNode.parentNode.id]["id"]}!`; // DELETE ME
		// displayNotificationForShortTime(notification); // DELETE ME


		// pathObjectiveCompleted(pathObjectives[item.target.parentNode.parentNode.id]); // DELETE ME

		pathObjectiveCompleted(pathObjectives[parentId]);
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

		// display whether path completed or not
		if(count === pathObjectives[parentId]["total"]) {
			pathObjectiveCompleted(pathObjectives[parentId]);
			completePath(item.target);
			isGameOver();
			resetBoth();
		} else {
		 	pathObjectiveNotCompleted(pathObjectives[parentId]);
			resetPath(item.target);
		}
	}
}

function pathObjectiveCompleted(pathObjective) {
		let notification = `You completed Path ${pathObjective["id"]}!`;
		displayNotificationForShortTime(notification);
}

function pathObjectiveNotCompleted(pathObjective) {
		let notification = `You didn't complete Path ${pathObjective["id"]}.`;
		displayNotificationForShortTime(notification);	
}

function completePath(item) {
		item.setAttribute("class", "fas fa-circle small");
		item.setAttribute("completed", "true");
}

function resetPath(item) {
		item.setAttribute("class", "far fa-circle small");
		item.setAttribute("completed", "false");
}

function useAbility(item) {
		item.setAttribute("class", "fas fa-circle medium");
		item.setAttribute("completed", "true");

		// console.log(keptDice); // DELETE ME

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
		// debugger
		useAbility(item);

		// auto fills next available exp circle when camp exp circle clicked
		if(item.parentNode.id == "camp-exp") {
			// console.log("shortCompletedExp:", shortCompletedExp); // DELETE ME
			// for(let i = 0; i < shortCompletedExp.length; i++) {
			// 	console.log(shortCompletedExp[i]);
			// }
			let found = shortCompletedExp.find(function(nextOpenCircle) {
				return nextOpenCircle.classList.value === "far fa-circle medium";
			});
			// console.log("found element:", found); // DELETE ME
			useAbility(found);
			countUsedExperienceCircles();
		}
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

function countTotalAbilityCircles(input) {
	// console.log("countTAC input:", input);
	// console.log("countTAC target:", input.target);
	// console.log("countTAC target parentElement id:", input.target.parentElement.id);
	// let inputCircles = input.target.parentNode;
	// console.log("input Circles:", inputCircles); // DELETE ME
	let abilityCircles = assignedAbilities.slice(2);
	// console.log("ability array:", abilityCircles);
	let count = 0;
	let newAbilityCircles = [];
	let countTACid = input.target.parentElement.id;

	for(let i = 0; i < abilityCircles.length; i++) {
		if(abilityCircles[i].id == (countTACid)) {
			newAbilityCircles.push(abilityCircles[i]);
		}
	}
	// console.log("NEW ability circs:", newAbilityCircles[0].children);
	for(let j = 0; j < newAbilityCircles.length; j++) {
		// console.log(newAbilityCircles[j].children); // DELETE ME
		for(let k = 0; k < newAbilityCircles[j].children.length; k++) {
			if(newAbilityCircles[j].children[k].classList.value.includes("circle")) {
				count++;
			}
		}
	}
	return count;	
}

function appendAbilityCount(input) {
	// input comes from appendAbility()
	let selectedAbility = document.getElementById(input);
	let count = 0;

	for(let i = 0; i < selectedAbility.children.length; i++) {
		if(selectedAbility.children[i].classList.value.includes("circle")) {
			count++;
		}
	}

	selectedAbility.children[0].children[0].textContent = `(${count})`;
}

function updateAbilityCount(input) {
	// input comes from assignedAbilities eventListener
	let item = input.target.children[0];
	let count = countTotalAbilityCircles(input);

	// handles exception case of camp-reroll in level 5
	if(input.target.parentElement.id.includes("camp-reroll")) {
		let newCount = 0;
		// pull target element (reroll-any) from pre-existing array of all abilities
		for(let i = 0; i < assignedAbilities.length; i++) {
			// filter to just reroll-any
			if(assignedAbilities[i].id == "reroll-any") {
				// drill down to count the total number of circles
				for(let j = 0; j < assignedAbilities[i].children.length; j++) {
					if(assignedAbilities[i].children[j].classList.value.includes("circle")) {
						newCount++;
					} 
				}

				// drill down to children of reroll-any
				let newTarget = assignedAbilities[i].children;
				// updates the count textContent
				for(let i = 0; i < newTarget.length; i++) {
					if(newTarget[i].classList.value.includes("sync")) {
						newTarget[i].children[0].textContent = `(${newCount})`;
					}
				}
			}
		}
	}

	// update count for 4 main abilities, not coming from camp/level 5
	if(!input.target.classList.value.includes("book") && !input.target.parentElement.id.includes("camp-reroll")) {
		item.textContent = `(${count})`;
	}
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

	appendAbilityCount(input);
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
	// console.log("end of game scoring:", count); // DELETE ME
	return count;
}

function isGameOver() {
// Game Over if:
	// all 8 paths are complete
	if(countCompletedPathCircles() === 8) {
		// console.log("GAME OVER. YOU WIN."); // DELETE ME
		let finalScore = 	scoreGame(assignedAbilities);
		let notification = "You win! Your score is " + finalScore + ".";
		msg.textContent = notification;
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
		// console.log("GAME OVER. NO MOVES LEFT.") // DELETE ME
		let finalScore = scoreGame(assignedAbilities);
		let notification = "Game Over. No Moves Left. Your score is " + finalScore + ".";
		msg.textContent = notification;
	}
}
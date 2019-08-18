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
		if(item.getAttribute("completed") === "false") {
			completePath(item);
		}
		// countCompletedPathCircles();
		isGameOver();
	});
});

function completePath(item) {
		item.setAttribute("class", "fas fa-circle small");
		item.setAttribute("completed", "true");

		// reset both kept and rolled dice
		resetBoth();
}

function useAbility(item) {
		item.setAttribute("class", "fas fa-circle medium");
		item.setAttribute("completed", "true");
		// console.log(item); // DELETE ME

		// ability circles that affect dice
		if(item.parentNode.id == "flip") {
			flipAbility();
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
	} else {
		// console.log("completed path circles < 8"); // DELETE ME
		// console.log(countCompletedPathCircles()); // DELETE ME
	}

	// no unused abilities left
	// total ability circles === used ability circles
	let totalAbilities = assignedAbilities.slice(2);
	let totalAbilityCount = 0;
	let totalUsedAbilities = countUsedAbilityCircles();
	// console.log("total used:", totalUsedAbilities);  // DELETE ME

	for(let i = 0; i < totalAbilities.length; i++) {
		for(let j = 0; j < totalAbilities[i].children.length; j++) {
			if(totalAbilities[i].children[j].classList.value.includes("circle")) {
				// console.log("circle included");
				totalAbilityCount++;
			}
		}
	}

	// console.log("total ability count:", totalAbilityCount); // DELETE ME

	if(totalUsedAbilities === totalAbilityCount && countCompletedPathCircles() < 8) {
		console.log("GAME OVER. NO MOVES LEFT. YOU LOSE.") // DELETE ME
		scoreGame(assignedAbilities);
	}
}
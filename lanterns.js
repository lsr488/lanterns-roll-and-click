const expCircles = document.querySelectorAll('[exp="true"]');
const pathCircles = document.getElementsByClassName("small");
const abilities = document.querySelectorAll('[ability="true"]');

const completedPaths = [...pathCircles];
const completedExp = [...expCircles];
const assignedAbilities = [...abilities];
const shortCompletedExp = completedExp.slice(1);
const campExp = completedExp.slice(0,1);

campExp.forEach(function(item) {
	item.addEventListener("click", function(e) {
		if(item.getAttribute("completed") === "false") {
			useAbility(item);
		}
	});
});

shortCompletedExp.forEach(function(item) {
	item.addEventListener("click", function(e) {
		if(item.getAttribute("completed") === "false") {
			useAbility(item);
		}
		countUsedExperienceCircles();
	});
});

assignedAbilities.forEach(function(item) {
	item.addEventListener("click", function(e) {
		parentElement = e.target.parentNode;

		if(parentElement.getAttribute("set") === "false") {
			const input = prompt("How many circles? Enter a number 1 through 6.", "1");
			if(input > 0 && input < 7) {
				for(let i = 0; i < input; i++) {
					const circle = document.createElement("i");
					setAbility(circle);
					parentElement.append(circle);
				}
			}	else {
				alert("Choose a number 1 through 6.");
			}	

			parentElement.setAttribute("set", "true");
		}
	});
});

completedPaths.forEach(function(item) {
	item.addEventListener("click", function(e) {
		if(item.getAttribute("completed") === "false") {
			completePath(item);
		}
	});
});

function completePath(item) {
		item.setAttribute("class", "fas fa-circle small");
		item.setAttribute("completed", "true");
}

function useAbility(item) {
		item.setAttribute("class", "fas fa-circle medium");
		item.setAttribute("completed", "true");
}

function setAbility(item) {
	item.setAttribute("class", "far fa-circle medium");
	item.setAttribute("completed", "false");
	item.addEventListener("click", function() {
		useAbility(item);
	});
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

countUsedExperienceCircles();
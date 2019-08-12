const expCircles = document.querySelectorAll('[exp="true"]');
const pathCircles = document.getElementsByClassName("small");
const abilities = document.querySelectorAll('[ability="true"]');

const completedPaths = [...pathCircles];
const completedExp = [...expCircles];
const assignedAbilities = [...abilities];

console.log("expCircles:", expCircles);

function countUsedExperienceCircles() {
	let count = 0;
	// let expCirclesAttributes = expCircles[1].attributes;
	for(let i = 1; i < expCircles.length; i++) {
		// console.log(expCircles[i].attributes); // DELETE ME
		for(let j = 0; j < expCircles[i].attributes.length; j++) {
			if(expCircles[i].attributes[j].name == "completed") {
				// console.log("this is the completed attribute"); // DELETE ME
				// console.log(expCircles[i].attributes[j].value); // DELETE ME
				if(expCircles[i].attributes[j].value === "true") {
					count++;					
				}		
			} 
		}	
	}
	if(count === 5) {
		console.log("First exp row completed.");
	}
	if(count === 9) {
		console.log("Second exp row completed.");
	}
	if(count === 12) {
		console.log("Third exp row completed.");
	}	
	console.log(count);
}
countUsedExperienceCircles();

assignedAbilities.forEach(function(item) {
	item.addEventListener("click", function(e) {
		parentElement = e.target.parentNode;

		if(parentElement.getAttribute("set") === "false") {
			const input = prompt("How many circles? Enter a number 1 through 6.");
			if(input > 0 && input < 7) {
				for(let i = 0; i < input; i++) {
					const circle = document.createElement("i");
					setAbility(circle);
				
					circle.addEventListener("click", function() {
						useAbility(circle);
					});
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

completedExp.forEach(function(item) {
	item.addEventListener("click", function(e) {
		if(item.getAttribute("completed") === "false") {
			useAbility(item);
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
}

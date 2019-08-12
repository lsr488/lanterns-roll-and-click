const expCircles = document.querySelectorAll('[exp="true"]');
const pathCircles = document.getElementsByClassName("small");
const abilities = document.querySelectorAll('[ability="true"]');

const completedPaths = [...pathCircles];
const completedExp = [...expCircles];
const assignedAbilities = [...abilities];

console.log(abilities);

assignedAbilities.forEach(function(item) {
	item.addEventListener("click", function(e) {
		// console.log(e.target); // DELETE ME	
		parentElement = e.target.parentNode;
		console.log(parentElement); // DELETE ME	

		if(parentElement.getAttribute("set") === "false") {
			console.log("not set"); // DELETE ME	
			let input = prompt("How many circles? Enter a number 1 through 6.", "2");
			if(input > 0 && input < 7) {
				for(let i = 0; i < input; i++) {
					const circle = document.createElement("i");
					circle.setAttribute("class", "far fa-circle medium");
					circle.setAttribute("completed", "false");
					circle.addEventListener("click", function() {
						circle.setAttribute("class", "fas fa-circle medium");
						circle.setAttribute("completed", "true");
					});
					parentElement.append(circle);
				}
			}	else {
				alert("Choose a number 1 through 6.");
			}	
			parentElement.setAttribute("set", "true");
			console.log("attribute set");
		}
	});
});

completedPaths.forEach(function(item) {
	item.addEventListener("click", function(e) {
		// console.log(e.target); // DELETE ME

		if(item.getAttribute("completed") === "false") {
			item.setAttribute("class", "fas fa-circle small");
			item.setAttribute("completed", "true");
			console.log(e.target); // DELETE ME			
		}

	});
});

completedExp.forEach(function(item) {
	item.addEventListener("click", function(e) {
		// console.log(e.target); // DELETE ME
		
		if(item.getAttribute("completed") === "false") {
			item.setAttribute("class", "fas fa-circle");
			item.setAttribute("completed", "true");
			console.log(e.target); // DELETE ME			
		}	

	});
});

function markComplete() {}

function checkIfComplete() {}
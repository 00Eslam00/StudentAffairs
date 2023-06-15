import { updateDeptWithLevel } from "./ajax.js"

window.onload = () => {

	let levelInput = document.getElementById("id_level");
	// let oldDeptVal = document.getElementById("id_departments").value;
	// console.log(oldDeptVal);
	levelInput.setAttribute("min", "1");
	levelInput.setAttribute("max", "4");
	updateDeptWithLevel(levelInput.value);
	// document.getElementById("id_departments").value = oldDeptVal;
	// console.log(document.getElementById("id_departments").value);

	// let creditInput = document.getElementById("id_credit");
	// creditInput.setAttribute("min", "0");
	// creditInput.setAttribute("max", "3");


	levelInput.addEventListener("input", function (e) {
		// Get the input value
		let level = parseInt(levelInput.value);
		// console.log(level);
		// Check if the value is valid
		if (isNaN(level) || level < 1 || level > 4) {
			levelInput.value = 1;
			updateDeptWithLevel(1);
		}
		else {
			updateDeptWithLevel(level);
		}
	});


	// creditInput.addEventListener("input", function (e) {
	// 	// Get the input value
	// 	let credit = parseInt(creditInput.value);
	// 	// console.log(credit);
	// 	// Check if the value is valid
	// 	if (isNaN(credit) || credit < 0 || credit > 3) {
	// 		creditInput.value = 0;
	// 	}
	// });

}

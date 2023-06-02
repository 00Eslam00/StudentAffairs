window.onload = () => {

	// Get the input element with the specified ID
	let myInput = document.getElementById("id_level");
	// Set the minimum and maximum values for the input
	myInput.setAttribute("min", "1");
	myInput.setAttribute("max", "4");

	// myInput.addEventListener("input", function (e) {
	// 	// Get the input value
	// 	let value = parseInt(myInput.value);
	// 	console.log("saikooo");
	// 	// Check if the value is valid
	// 	if (isNaN(value) || value < 1 || value > 4) {
	// 		// If the value is invalid, prevent the input
	// 		e.preventDefault();
	// 	}
	// });

}

// Get the table
var table = document.getElementById("myTable");

// Get the th elements
var thList = table.getElementsByTagName("th");

// Loop through the th elements
for (var i = 0; i < thList.length; i++) {
	// Check if the th element has the text "Term"
	if (thList[i].textContent === "Term") {
		// Get the index of the th element
		var index = thList[i].cellIndex;

		// Get the td elements with the same index
		var tdList = table.getElementsByTagName("td");

		// Loop through the td elements and add the class "term"
		for (var j = index; j < tdList.length; j += thList.length) {
			tdList[j].classList.add("term");
		}
	}
}
// Get the table
var table = document.getElementById("myTable");

// Get the th elements
var thList = table.getElementsByTagName("th");

// Loop through the th elements
for (var i = 0; i < thList.length; i++) {
	// Check if the th element has the text "Term"
	if (thList[i].textContent === "Code") {
		// Get the index of the th element
		var index = thList[i].cellIndex;

		// Get the td elements with the same index
		var tdList = table.getElementsByTagName("td");

		// Loop through the td elements and add the class "term"
		for (var j = index; j < tdList.length; j += thList.length) {
			tdList[j].classList.add("code");
		}
	}
}
// Get the table
var table = document.getElementById("myTable");

// Get the th elements
var thList = table.getElementsByTagName("th");

// Loop through the th elements
for (var i = 0; i < thList.length; i++) {
	// Check if the th element has the text "Term"
	if (thList[i].textContent === "Year") {
		// Get the index of the th element
		var index = thList[i].cellIndex;

		// Get the td elements with the same index
		var tdList = table.getElementsByTagName("td");

		// Loop through the td elements and add the class "term"
		for (var j = index; j < tdList.length; j += thList.length) {
			tdList[j].classList.add("year");
		}
	}
}
// Get the table
var table = document.getElementById("myTable");

// Get the th elements
var thList = table.getElementsByTagName("th");

// Loop through the th elements
for (var i = 0; i < thList.length; i++) {
	// Check if the th element has the text "Term"
	if (thList[i].textContent === "Level") {
		// Get the index of the th element
		var index = thList[i].cellIndex;

		// Get the td elements with the same index
		var tdList = table.getElementsByTagName("td");

		// Loop through the td elements and add the class "term"
		for (var j = index; j < tdList.length; j += thList.length) {
			tdList[j].classList.add("level");
		}
	}
}

// Get the select elements
const yearSelect = document.getElementById("y");
const levelSelect = document.getElementById("l");
const termSelect = document.getElementById("t");

// Get the table rows
const rows = document.querySelectorAll("#myTable tbody tr");
// Add event listeners to the select elements
// yearSelect.addEventListener("change", filterRows);
// levelSelect.addEventListener("change", filterRows);
// termSelect.addEventListener("change", filterRows);

// This function filters table rows based on user-selected values for year, level, and term

// function filterRows() {
// 	// Get the selected values from the select dropdowns
// 	// const yearValue = yearSelect.options[yearSelect.selectedIndex].text;
// 	const levelValue = levelSelect.options[levelSelect.selectedIndex].text;
// 	// const termValue = termSelect.options[termSelect.selectedIndex].text;

// 	// Filter the table rows
// 	document.querySelectorAll("#myTable tbody tr").forEach(row => {
// 		// Get the year, level, and term values for each row
// 		// const year = row.querySelector(".year").textContent;
// 		const level = row.querySelector(".level").textContent;
// 		// const term = row.querySelector(".term").textContent;

// 		// Check if the selected value matches the row value for year, level, and term
// 		// const yearMatch = yearValue === year;
// 		const levelMatch = (levelValue == level);
// 		console.log(levelMatch);
// 		// const termMatch = termValue === term;

// 		// Show or hide the row based on whether all three conditions match or not
// 		// if ((yearMatch || yearValue === "All") && (levelMatch || levelValue === "All") && (termMatch || termValue === "All"))

// 		if (levelMatch || levelValue === "All") {
// 			row.style.display = "";
// 		} else {
// 			row.style.display = "none";
// 		}
// 	});
// }


levelSelect.addEventListener("change", () => {

	let allLevels = document.querySelectorAll("tbody td.level");

	for (let i = 0; i < allLevels.length; i++) {

		if (levelSelect.value == '0')
			allLevels[i].parentElement.style.display = "";

		else if (levelSelect.value == allLevels[i].getAttribute("level"))
			allLevels[i].parentElement.style.display = "";
		else
			allLevels[i].parentElement.style.display = "none";


	}
});

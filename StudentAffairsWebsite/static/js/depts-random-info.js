function generateTableRows() {
	// Get a reference to the table
	let table = document.querySelector("tbody");

	// Create arrays of department IDs, names, and courses
	let departmentIds = ["CS151", "IS234", "AI423", "SE444", "EE124", "ME322", "CE212"];
	let departmentNames = ["CS", "IS", "AI", "SE", "EE", "ME", "CE"];
	let courseLists = [
		["Intro to Programming", "Algorithms", "Data Structures"],
		["Database Systems", "Networking", "Web Development"],
		["Machine Learning", "Data Mining", "Computer Vision"],
		["Software Engineering", "Agile Development", "Project Management"],
		["Circuit Analysis", "Digital Electronics", "Control Systems"],
		["Thermodynamics", "Mechanics", "Materials Science"],
		["Structural Analysis", "Transportation Engineering", "Environmental Engineering"]
	];

	// Loop through the specified number of rows and add them to the table
	for (let i = 0; i < departmentIds.length; i++) {
		// Create a new row
		let newRow = document.createElement("tr");

		// Generate unique random data for each cell
		let id = departmentIds[i]
		let name = departmentNames[i];
		let courses = courseLists[Math.floor(Math.random() * courseLists.length)].join(", ");

		// Create three new cells for the row
		let idCell = document.createElement("td");
		let nameCell = document.createElement("td");
		let coursesCell = document.createElement("td");


		// Set the text content of the cells
		idCell.textContent = id;
		nameCell.textContent = name;
		coursesCell.textContent = courses;
		coursesCell.title = courses;
		// Add the cells to the row
		newRow.appendChild(idCell);
		newRow.appendChild(nameCell);
		newRow.appendChild(coursesCell);

		// Add the row to the table
		table.appendChild(newRow);
	}
}



generateTableRows();

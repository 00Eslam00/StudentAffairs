function generateRandomCourseList() {

	const courseNames = {
		"CS1223": "Programming 1",
		"IT53434": "Network 1",
		"IT45399": "Network 2",
		"AI4546": "Machine learning",
		"DS3224": "Data Structure",
		"SW34343": "Software 1",
		"CS2345": "Programming 2",
		"IT2367": "Network Security",
		"AI5789": "Deep Learning",
		"DS4512": "Algorithms",
		"SW1243": "Software Engineering",
		"CS4567": "Database Systems",
		"IT6789": "Wireless Networks",
		"AI2234": "Computer Vision",
		"DS8765": "Big Data",
		"SW9876": "Web Development",
		"CS7890": "Operating Systems",
		"IT3456": "Cloud Computing",
		"AI1234": "Natural Language Processing",
		"DS6789": "Parallel Computing"
	};


	// Convert the object into an array of key-value pairs
	const courseNamesArray = Object.entries(courseNames);

	// Shuffle the array
	for (let i = courseNamesArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[courseNamesArray[i], courseNamesArray[j]] = [courseNamesArray[j], courseNamesArray[i]];
	}

	return courseNamesArray;
	// console.log(shuffledCourseNames); // Output: e.g. { "SW34343": "Software 1", "IT53434": "Network 1", ... }

}




function generateRandomPrerequisites() {
	const courseIds = ["CS1223", "IT53434", "IT45399", "AI4546", "DS3224", "SW34343", "CS2345", "IT2367", "AI5789", "DS4512", "SW1243", "CS4567", "IT6789", "AI2234", "DS8765", "SW9876", "CS7890", "IT3456", "AI1234", "DS6789"];
	const numCourses = Math.floor(Math.random() * 5) + 1; // Random number of courses between 1 and the 5
	const shuffledCourseIds = courseIds.sort(() => Math.random() - 0.5); // Shuffle the course IDs randomly
	const uniqueCourseIds = new Set(shuffledCourseIds.slice(0, numCourses)); // Take the first n shuffled course IDs as unique course IDs
	return Array.from(uniqueCourseIds); // Convert the Set back into an array and return it
}

// console.log(generateRandomCourseIds()); // Output: e.g. ["IT53434", "DS3224"]


function generateRandomDepartment() {
	const strings = ['CS1211', 'DS2311', 'IT3145', 'IS1011', 'AI1523'];
	const randomIndex = Math.floor(Math.random() * strings.length);
	let department = strings[randomIndex];
	return department;
}


function addRandomCourseDataToTable() {
	// Get a reference to the table element
	const table = document.querySelector("tbody");

	// Generate a list of random course IDs and shuffle it
	const courseIds = generateRandomCourseList();

	// Add the rows to the table
	for (let i = 0; i < courseIds.length; i++) {
		// Generate a random number of prerequisites
		const prerequisites = generateRandomPrerequisites();

		// Create a new row and add the cells
		const row = document.createElement("tr");
		const courseIdCell = document.createElement("td");
		const courseNameCell = document.createElement("td");
		const departmentCell = document.createElement("td");
		const prerequisitesCell = document.createElement("td");

		// Choose a random course ID and remove it from the list
		const courseIdIndex = Math.floor(Math.random() * courseIds.length);
		const courseId = courseIds.splice(courseIdIndex, 1)[0];

		// Set the course ID and name cells
		courseIdCell.innerText = courseId[0];
		courseNameCell.innerText = courseId[1];


		// Set the department of course
		departmentCell.innerText = generateRandomDepartment();

		// Set the prerequisites cell
		prerequisitesCell.innerText = prerequisites.join(", ");

		// Add the cells to the row and the row to the table
		row.appendChild(courseIdCell);
		row.appendChild(courseNameCell);
		row.appendChild(departmentCell);
		row.appendChild(prerequisitesCell);
		table.appendChild(row);
	}
}



window.onload = () => addRandomCourseDataToTable();

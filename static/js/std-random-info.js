// Generate a random full name
function generateRandomName() {
	// Define arrays of first, middle, and last name options
	const firstNameOptions = ['Alhrththtice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank'];
	const middleNameOptions = ['Anne', 'Ben', 'Claire', 'Dan', 'Elle', 'Fred'];
	const lastNameOptions = ['Andson', 'Brown', 'Cooper', 'Davis', 'Edwards', 'Ford'];

	const firstName = firstNameOptions[Math.floor(Math.random() * firstNameOptions.length)];
	const middleName = middleNameOptions[Math.floor(Math.random() * middleNameOptions.length)];
	const lastName = lastNameOptions[Math.floor(Math.random() * lastNameOptions.length)];
	return `${firstName} ${middleName} ${lastName}`;
}



// Define a Set to store used IDs
const usedIds = new Set();

// Generate a random ID between start and end, inclusive
function generateRandomId(start, end) {
	const id = Math.floor(Math.random() * (end - start + 1)) + start;
	if (usedIds.has(id)) {
		// ID already used, generate a new one recursively
		return generateRandomId(start, end);
	}
	usedIds.add(id);
	return id;
}

// Example usage
// const randomId = generateRandomId(20230001, 20230400);
// console.log(randomId); // output a random ID between 20230001 and 20230400, inclusive



// Generate a random date string in "DD/MM/YYYY" format
function generateRandomDateString() {
	const start = new Date(2003, 0, 1); // January 1, 2003
	const end = new Date(2003, 11, 31); // December 31, 2003
	const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	const day = String(randomDate.getDate()).padStart(2, '0');
	const month = String(randomDate.getMonth() + 1).padStart(2, '0');
	const year = randomDate.getFullYear();
	return `${day}/${month}/${year}`;
}



function generateRandomGPA() {
	const gpa = Math.random() * 4; // Random number between 0 and 4
	return parseFloat(gpa.toFixed(2)); // Return the GPA with two decimal places
}



// Generate a random Gender
function generateRandomGender() {
	const genders = ['Male', 'Female'];
	const randomIndex = Math.floor(Math.random() * genders.length);
	return genders[randomIndex];
}



// Generate a random level and corresponding string

function generateRandomLevelAndString() {
	const level = Math.floor(Math.random() * 4) + 1;
	let department;
	if (level <= 2) {
		department = 'General';
	} else {
		const strings = ['CS1211', 'DS2311', 'IT3145', 'IS1011', 'AI1523'];
		const randomIndex = Math.floor(Math.random() * strings.length);
		department = strings[randomIndex];
	}
	return [level, department];
}




function generateRandomGmail() {
	const letters = 'abcdefghijklmnopqrstuvwxyz';
	const usernameLength = Math.floor(Math.random() * 13) + 8; // Random number between 8 and 13
	let username = '';
	for (let i = 0; i < usernameLength; i++) {
		const randomIndex = Math.floor(Math.random() * letters.length);
		username += letters[randomIndex];
	}
	return `${username}@gmail.com`;
}



function generateRandomEgyptianNumber() {
	const prefixes = ['010', '011', '012', '015'];
	const randomPrefixIndex = Math.floor(Math.random() * prefixes.length);
	const prefix = prefixes[randomPrefixIndex];
	const number = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000; // Random number between 10000000 and 99999999
	return `${prefix}${number}`;
}



function generateRandomSelect() {
	const defaultValue = Math.floor(Math.random() * 2); // Random number between 0 and 1

	// Create the select element
	const selectElement = document.createElement('select');
	selectElement.classList.add("std-stat");

	// Create the "active" option and add it to the select element
	const activeOption = document.createElement('option');
	activeOption.value = '1';
	activeOption.textContent = 'active';
	if (defaultValue === 1) {
		activeOption.selected = true;
	}
	selectElement.appendChild(activeOption);

	// Create the "inactive" option and add it to the select element
	const inactiveOption = document.createElement('option');
	inactiveOption.value = '0';
	inactiveOption.textContent = 'inactive';
	if (defaultValue === 0) {
		inactiveOption.selected = true;
	}
	selectElement.appendChild(inactiveOption);

	return selectElement;
}



function stdTableRow() {
	const tableRow = document.createElement('tr');

	const idCell = document.createElement('td');
	idCell.textContent = generateRandomId(2023001, 2023500);
	tableRow.appendChild(idCell);

	const fullNameCell = document.createElement('td');
	fullNameCell.textContent = generateRandomName();
	fullNameCell.title = fullNameCell.textContent
	tableRow.appendChild(fullNameCell);

	const birthDateCell = document.createElement('td');
	birthDateCell.textContent = generateRandomDateString();
	tableRow.appendChild(birthDateCell);

	const gpaCell = document.createElement('td');
	gpaCell.textContent = generateRandomGPA();
	tableRow.appendChild(gpaCell);

	const genderCell = document.createElement('td');
	genderCell.textContent = generateRandomGender();
	tableRow.appendChild(genderCell);

	const [level, department] = generateRandomLevelAndString();
	const levelCell = document.createElement('td');
	levelCell.textContent = level;
	tableRow.appendChild(levelCell);

	const departmentCell = document.createElement('td');
	departmentCell.textContent = department;
	tableRow.appendChild(departmentCell);

	const emailCell = document.createElement('td');
	emailCell.textContent = generateRandomGmail();
	emailCell.title = emailCell.textContent
	tableRow.appendChild(emailCell);

	const mobileCell = document.createElement('td');
	mobileCell.textContent = generateRandomEgyptianNumber();
	tableRow.appendChild(mobileCell);

	const stdStatusCell = document.createElement('td');
	stdStatusCell.appendChild(generateRandomSelect());
	tableRow.appendChild(stdStatusCell);

	return tableRow;
}


window.onload = () => {
	let std_table = document.querySelector('table tbody');

	for (let i = 0; i < 100; i++) {
		std_table.appendChild(stdTableRow());
	}
}

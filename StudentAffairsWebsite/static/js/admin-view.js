// Functions used in html


function prompt() {

	const overlay = document.createElement('div');
	overlay.classList.add('overlay');
	overlay.style.cssText = `
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9998;
	`
	// Append overlay to body
	document.body.appendChild(overlay);

	let dialog = document.createElement('div');
	dialog.classList.add('dialog');
	let paragraph = document.createElement('p');
	let button = document.createElement('button');
	button.classList.add('d-btn');
	paragraph.textContent = `There are students in this department , you can't delete it`;
	color = "red";

	dialog.appendChild(paragraph);
	dialog.appendChild(button);
	document.body.appendChild(dialog);
	dialog.style.cssText = `
	position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background-color:rgba(255,255,255);
    color:${color};
    width:50%;
    height:25%;
    padding:10px;
    border-radius:5px;
	display:flex;
	flex-direction:column;
    justify-content:space-around;
    align-items:center;
    font-size:1.5rem;
	z-index: 9999;
    `;

	paragraph.style.cssText = `
	width: fit-content;
    padding: 10px;
    text-align: center;
	font-family: Arial, Helvetica, sans-serif;
	`

	button.textContent = 'OK';

	button.style.cssText = `
	padding: 12px;
    width: 12%;
	margin-top: 0px !important;
	margin-right: 0px  !important;
	margin-top: 20px;
	display: inline-block;
	background-color: #3aa8ef;
	border-radius: 8px;
	color: white;
	padding: 10px;
	border: none;
	font-size: 26px;
	cursor: pointer;
	font-family: Arial, Helvetica, sans-serif;
	`
}

document.addEventListener('click', function (e) {
	if (e.target.tagName != 'BUTTON' || e.target.classList.contains('d-btn')) {

		//console.log(document.querySelector('.dialog'));
		if (document.querySelector('.dialog')) {
			document.querySelector('.overlay').remove();
			document.querySelector('.dialog').remove();
		}


	}
});



function addFilter() {

	let search_value = document.querySelector(".search-bar").value;
	search_value.trim
	if (search_value.length === 0) {
		return;
	}

	let filter_value = document.querySelector(".filters").value;
	let filterName = document.querySelector(`.filters option[value="${filter_value}"]`).textContent;
	let filters = document.querySelectorAll('.filter-values div');

	let filter_icon = document.createElement("i");
	filter_icon.classList.add("delete");
	filter_icon.classList.add("fa-solid");
	filter_icon.classList.add("fa-xmark");

	let flag = false;
	for (let i = 0; i < filters.length; i++) {
		if (filters[i].getAttribute("filter-name") == filter_value) {
			filters[i].textContent = `${filter_value} = "${search_value}"`;
			filters[i].setAttribute("filter-value", search_value);
			filters[i].appendChild(filter_icon);
			flag = true;
		}

	}


	if (!flag) {
		let filter_element = document.createElement("div");
		filter_element.setAttribute("filter-name", filter_value);
		filter_element.setAttribute("filter-value", search_value);
		filter_element.classList.add("filter-item");
		filter_element.appendChild(document.createTextNode(`${filterName} = "${search_value}"`))
		filter_element.appendChild(filter_icon);

		document.querySelector(".filter-values").appendChild(filter_element);
	}
	applyFilter();
}




function applyFilter() {


	const table = document.getElementsByTagName("table")[0];

	const filters = document.querySelectorAll('.filter-values div');
	let tableRows = document.querySelectorAll("tbody tr");
	// console.log(filters.length);
	// for (let i = 0; i < filters.length; i++) {
	// 	let filterName = filters[i].getAttribute("filter-name");
	// 	let filterValue = filters[i].getAttribute("filter-value");
	// 	console.log(filterName, filterValue);
	// 	let tdEles = document.querySelectorAll(`tbody td[value="${filterName}"]`);
	// 	console.log(tdEles);
	// 	for (let j = 0; j < tdEles.length; j++) {
	// 		// console.log(tdEles[j]);
	// 		if (tdEles[j].textContent.includes(filterValue)) {
	// 			tdEles[j].parentElement.classList.remove("hide-filter");
	// 		} else {

	// 			tdEles[j].parentElement.classList.add("hide-filter");
	// 		}
	// 	}
	// }

	for (let i = 0; i < tableRows.length; i++) {

		let tds = tableRows[i].childNodes;
		let flag = true;

		for (let j = 0; j < tds.length; j++) {

			for (let k = 0; k < filters.length; k++) {
				console.log(tds[j], filters[k]);
				// console.log(filters[k].getAttribute("filter-name") == tds[j].getAttribute("value"),
				// filters[k].getAttribute("filter-name"), tds[j].getAttribute("value"));
				if (filters[k].getAttribute("filter-name") == tds[j].getAttribute("value")) {
					if (filters[k].getAttribute("filter-value") != tds[j].textContent) {
						// console.log(filters[k].getAttribute("filter-value") != tds[j].textContent,
						// filters[k].getAttribute("filter-value"), tds[j].textContent)
						flag = false;
						break;
					}
				}

			}

			if (!flag)
				break;

		}

		if (flag == false)
			tableRows[i].classList.add("hide-filter");
		else
			tableRows[i].classList.remove("hide-filter");


	}

	if (filters.length == 0) {
		let allRows = document.querySelectorAll(".hide-filter");
		console.log(allRows);
		for (let i = 0; i < allRows.length; i++) {
			console.log(allRows[i]);
			allRows[i].classList.remove("hide-filter");
		}

	}

}




function showConfirmationDialogue(message) {
	return new Promise((resolve) => {
		const confirmationDialogue = document.createElement('div');
		confirmationDialogue.className = 'confirmation-dialogue';
		confirmationDialogue.innerHTML = `
		<p>${message}</p>
		<button id="confirm-yes" class="dialogue-btn">Yes</button>
		<button id="confirm-no" class="dialogue-btn">No</button>`;
		const confirmYes = confirmationDialogue.querySelector('#confirm-yes');
		const confirmNo = confirmationDialogue.querySelector('#confirm-no');
		const removeDialogue = () => {
			document.body.removeChild(confirmationDialogue);
		};
		const handleClick = (e) => {
			e.preventDefault();
			removeDialogue();
			if (e.target === confirmYes) {
				resolve(true);
			} else {
				resolve(false);
			}
		};
		confirmYes.addEventListener('click', handleClick);
		confirmNo.addEventListener('click', handleClick);
		document.body.appendChild(confirmationDialogue);
	});
}



// Events listeners

document.addEventListener("click", (ele) => {

	const contextMenu = document.querySelector('#contextMenu');
	if (contextMenu && !contextMenu.contains(ele.target)) {
		contextMenu.remove();
	}

	ele = ele.target;

	if (ele.classList.contains("delete")) {
		ele.parentElement.remove();
		applyFilter();
	}

	else if (ele.tagName.toLowerCase() === "tr" && ele.parentElement.tagName.toLowerCase() === "tbody") {
		let x = document.querySelectorAll("table tbody tr")
		for (let i = 0; i < x.length; i++) {
			//x[i].ondblclick = () => window.open("edit-student.html");
			x[i].onclick = () => {

				for (let i = 0; i < x.length; i++) {

					x[i].classList.remove("active");
				}

				x[i].classList.add("active");
			}
		}
	}

	else if (ele.classList.contains('select-stat')) {
		let selectStat = document.querySelector('.select-stat');
		let rows = document.querySelectorAll('.std-stat');
		for (let i = 0; i < rows.length; i++) {
			rows[i].parentElement.parentElement.classList.remove("hide-stat");
		}

		if (selectStat.value != 2) {
			for (let i = 0; i < rows.length; i++) {
				if (rows[i].value != selectStat.value)
					rows[i].parentElement.parentElement.classList.add("hide-stat");
			}
		}
	}

	// else if (ele.classList.contains('std-stat')) {
	// 	let selectStat = document.querySelector('.select-stat');
	// 	if (selectStat.value != 2 && selectStat.value != ele.value) {
	// 		ele.parentElement.parentElement.classList.add("hide-stat");
	// 	}
	// }
});



document.addEventListener("change", (ele) => {
	ele = ele.target;
	let selectStat = document.querySelector('.select-stat');
	if (selectStat && selectStat.value != 2 && selectStat.value != ele.value) {
		ele.parentElement.parentElement.classList.add("hide-stat");
	}

	if (ele.classList.contains("std-stat")) {
		let stdId = ele.parentElement.parentElement.childNodes[0].textContent;
		// console.log(stdId);
		let Students = JSON.parse(localStorage.getItem("Students"));
		Students[stdId]["stat"] = ele.value;
		// console.log(Students[stdId]["stat"]);

		if (ele.value == 0 && localStorage.getItem("Student-login")) {
			localStorage.setItem("Student-login", '');
		}


		localStorage.setItem("Students", JSON.stringify(Students));
	}


});


document.addEventListener('contextmenu', function (e) {

	// Remove previous context menu
	const existingContextMenu = document.querySelector('#contextMenu');
	if (existingContextMenu) {
		existingContextMenu.remove();
	}

	if (e.target.tagName.toLowerCase() !== 'td') {
		return;
	}
	e.preventDefault(); // Prevent default right-click behavior

	// Create context menu element
	// Create the div element with id "contextMenu" and class "hidden"
	const contextMenuDiv = document.createElement("div");
	contextMenuDiv.setAttribute("id", "contextMenu");

	// Create the ul element and its child li elements
	const ul = document.createElement("ul");
	const editOptionLi = document.createElement("li");
	editOptionLi.setAttribute("id", "editOption");
	editOptionLi.textContent = "Edit";
	const deleteOptionLi = document.createElement("li");
	deleteOptionLi.setAttribute("id", "deleteOption");
	deleteOptionLi.textContent = "Delete";
	const copyOptionLi = document.createElement("li");
	copyOptionLi.setAttribute("id", "copyOption");
	copyOptionLi.textContent = "Copy";

	// Append the li elements to the ul element
	ul.appendChild(copyOptionLi);
	ul.appendChild(editOptionLi);
	ul.appendChild(deleteOptionLi);


	// Append the ul element to the contextMenuDiv element
	contextMenuDiv.appendChild(ul);

	contextMenuDiv.style.top = e.pageY + 'px';
	contextMenuDiv.style.left = e.pageX + 'px';

	editOptionLi.addEventListener('click', function () {
		let tableType = document.querySelector("table");
		const code = e.target.parentElement.childNodes[0].textContent;
		console.log(code);
		if (tableType.classList.contains("std-table"))
			window.open(`edit-student.html?id=${code}`);
		else if (tableType.classList.contains("crs-table"))
			window.open(`edit-course.html?id=${code}`);
		else if (tableType.classList.contains("dept-table"))
			window.open(`edit-department.html?id=${code}`);
		//
		const existingContextMenu = document.querySelector('#contextMenu');
		if (existingContextMenu) {
			existingContextMenu.remove();
		}
	});

	// Create delete option
	deleteOptionLi.addEventListener('click', function () {
		const existingContextMenu = document.querySelector('#contextMenu');
		if (existingContextMenu) {
			existingContextMenu.remove();
		}
		let tableType = document.querySelector("table");
		const rowToDelete = e.target.parentElement;
		const elementId = rowToDelete.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[1].textContent;
		const code = rowToDelete.childNodes[0].textContent;
		showConfirmationDialogue(`Are you sure you want to delete item with ${elementId} ${code} ?`).then((confirmed) => {
			if (confirmed) {

				if (tableType.classList.contains("std-table")) {
					let Students = JSON.parse(localStorage.getItem("Students"));
					delete Students[code];
					localStorage.setItem("Students", JSON.stringify(Students));

					if (localStorage.getItem("Student-login") == code) {
						localStorage.setItem("Student-login", '');
					}
					rowToDelete.remove();

				}

				else if (tableType.classList.contains("crs-table")) {
					let Students = JSON.parse(localStorage.getItem("Students"));
					let Courses = JSON.parse(localStorage.getItem("Courses"));
					let Departments = JSON.parse(localStorage.getItem("Departments"));

					let stds = Object.keys(Students);
					let depts = Object.keys(Departments);

					for (let i = 0; i < stds.length; i++)
						delete Students[stds[i]]["Courses"][code];

					for (let i = 0; i < depts.length; i++) {
						let index = Departments[depts[i]]["courses"].indexOf(code);
						// console.log(index);
						if (index !== -1) {
							Departments[depts[i]]["courses"].splice(index, 1);
						}
					}

					delete Courses[code];


					localStorage.setItem("Students", JSON.stringify(Students));
					localStorage.setItem("Courses", JSON.stringify(Courses));
					localStorage.setItem("Departments", JSON.stringify(Departments));
					rowToDelete.remove();

				}

				else if (tableType.classList.contains("dept-table")) {
					let Students = JSON.parse(localStorage.getItem("Students"));
					let Courses = JSON.parse(localStorage.getItem("Courses"));
					let Departments = JSON.parse(localStorage.getItem("Departments"));


					let stds = Object.keys(Students);
					let crss = Object.keys(Courses);

					let del = true;

					for (let i = 0; i < stds.length; i++) {
						if (Students[stds[i]]["Dept"] === code) {
							del = false;
							break;
						}

					}

					if (del && code !== "Gen") {
						for (let i = 0; i < stds.length; i++) {
							if (Students[stds[i]]["Dept"] === code)
								delete Students[stds[i]];
						}

						for (let i = 0; i < crss.length; i++) {
							if (Courses[crss[i]]["Dept"] === code)
								delete Courses[crss[i]];
						}

						delete Departments[code];
						rowToDelete.remove();
					} else {
						prompt();
					}



					localStorage.setItem("Students", JSON.stringify(Students));
					localStorage.setItem("Courses", JSON.stringify(Courses));
					localStorage.setItem("Departments", JSON.stringify(Departments));
				}



			}

		});
	});


	// Create copy option
	copyOptionLi.addEventListener('click', function () {
		// Copy text in td element
		const textToCopy = e.target.textContent;
		navigator.clipboard.writeText(textToCopy);
		// console.log('Copied text:', textToCopy);
		const existingContextMenu = document.querySelector('#contextMenu');
		if (existingContextMenu) {
			existingContextMenu.remove();
		}
	});

	// Add context menu to the page
	document.body.appendChild(contextMenuDiv);
});


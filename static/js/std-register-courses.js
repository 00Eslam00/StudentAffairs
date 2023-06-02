// Create an empty array called "selectedOptions1"
var selectedOptions1 = new Array();
// Move selected elements to right (Selected coureses)
const button1 = document.getElementById("go_right");
button1.addEventListener("click", function (event) {
    event.preventDefault();
    const select2 = document.getElementById("rcourses");
    // Move all selected options from "selectedOptions1" to "select2" element
    while (selectedOptions1.length !== 0) {
        select2.appendChild(selectedOptions1[0]);
        selectedOptions1[0].classList.remove("selected");
        selectedOptions1.splice(0, 1);
    }
    // Remove the "selected" class from all options in "selectedOptions2" and empty the array
    while (selectedOptions2.length !== 0) {
        selectedOptions2[0].classList.remove("selected");
        selectedOptions2.splice(0, 1);
    }
});

// Style and add the selected element to selected_Options
const mySelect1 = document.getElementById("ecourses");

mySelect1.addEventListener("click", (event) => {
    const clickedOption = event.target;
    clickedOption.selected = !clickedOption.selected;
    if (clickedOption.id == 'ecourses') return;
    clickedOption.classList.toggle("selected");
    const indexToRemove = selectedOptions1.indexOf(clickedOption);
    if (indexToRemove !== -1) {
        selectedOptions1.splice(indexToRemove, 1);
    }
    else {
        selectedOptions1.push(clickedOption);
    }
});

// Move the selected options to the left (Eligible courses)
var selectedOptions2 = new Array();
const button2 = document.getElementById("go_left");
button2.addEventListener("click", function (event) {
    event.preventDefault();
    const select2 = document.getElementById("ecourses");
    while (selectedOptions2.length !== 0) {
        select2.appendChild(selectedOptions2[0]);
        selectedOptions2[0].classList.remove("selected");
        selectedOptions2.splice(0, 1);
    }
    while (selectedOptions1.length !== 0) {
        selectedOptions1[0].classList.remove("selected");
        selectedOptions1.splice(0, 1);
    }
});

// Style and add the selected element to selected_Options
// Get the select element by its ID
const mySelect2 = document.getElementById("rcourses");
// Add a click event listener to the select element
mySelect2.addEventListener("click", (event) => {
    // Get the clicked option element
    const clickedOption = event.target;
    // Toggle the "selected" property of the clicked option element
    clickedOption.selected = !clickedOption.selected;
    // If the clicked element is the select element itself, return without doing anything
    if (clickedOption.id == 'rcourses') return;
    // Toggle the "selected" class of the clicked option element
    clickedOption.classList.toggle("selected");
    // Check if the clicked option is already in the selected options array
    const indexToRemove = selectedOptions2.indexOf(clickedOption);
    // If the clicked option is already in the array, remove it
    if (indexToRemove !== -1) {
        selectedOptions2.splice(indexToRemove, 1);
    }
    // If the clicked option is not in the array, add it
    else {
        selectedOptions2.push(clickedOption);
    }
});

// Move All options to the left (Eligible courses) - Reset
// Get a reference to the button with id "reset"
const button3 = document.getElementById("reset");
// Add an event listener function to the button, which runs when the button is clicked
button3.addEventListener("click", function () {
    // Get references to the "ecourses" and "rcourses" select elements
    const select2 = document.getElementById("ecourses");
    const select1 = document.getElementById("rcourses");
    // Remove the "selected" class from all options in the "selectedOptions1" array
    while (selectedOptions1.length !== 0) {
        selectedOptions1[0].classList.remove("selected");
        selectedOptions1.splice(0, 1);
    }
    // Remove the "selected" class from all options in the "selectedOptions2" array
    while (selectedOptions2.length !== 0) {
        selectedOptions2[0].classList.remove("selected");
        selectedOptions2.splice(0, 1);
    }
    // Move all options from the "rcourses" select element to the "ecourses" select element
    while (select1.firstChild) {
        select2.appendChild(select1.firstChild);
    }
});

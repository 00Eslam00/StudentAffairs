function sendAjaxRequest() {
	// Get the value of the level field
	var level = document.getElementById("id_level").value;

	// Send an AJAX request to the server
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			// Handle the response from the server
			console.log(level);
		}
	};
	xhttp.open("GET", "/update-level/?level=" + level, true);
	xhttp.send();
}

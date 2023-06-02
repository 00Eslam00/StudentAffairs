let optCourses = document.querySelector(".optional.courses");
if (optCourses)
	optCourses.addEventListener("change", () => {
		if (optCourses.value == '0') {
			document.querySelector("#team").setAttribute("disabled", "");
			document.querySelector("#exam").setAttribute("disabled", "");
		} else {
			document.querySelector("#team").removeAttribute("disabled");
			document.querySelector("#exam").removeAttribute("disabled");


		}
	});

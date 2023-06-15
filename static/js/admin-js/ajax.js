export function updateDeptWithLevel(level) {
	let departmentField = document.getElementById("id_departments")
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/get_departments/?level=' + level, true);
	xhr.onload = function () {
		if (xhr.status === 200) {
			departmentField.innerHTML = '';
			var data = JSON.parse(xhr.responseText);
			data.forEach(function (department) {
				var option = document.createElement('option');
				option.value = department.id;
				option.text = department.name;
				departmentField.appendChild(option);
			});
		}
	};
	xhr.send();
}



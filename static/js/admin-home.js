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




const postIcon = document.querySelector('.post-icon');
const menu = document.querySelector('.menu');

document.addEventListener('click', (ele) => {
	ele = ele.target;

	const postIcons = document.querySelectorAll('.post-icon');
	for (let i = 0; i < postIcons.length; i++) {
		postIcons[i].nextElementSibling.style.display = 'none';
	}

	if (ele.classList.contains("post-icon"))
		ele.nextElementSibling.style.display = 'block';
});

if (menu)
	menu.addEventListener('click', (event) => {
		if (event.target.tagName === 'LI') {
			console.log(event.target.textContent); // do something with selected option
			menu.style.display = 'none'; // hide menu
		}
	});

document.addEventListener('click', (event) => {
	ele = event.target;


	if (ele.classList.contains("delete-post")) {
		let posts = JSON.parse(localStorage.getItem("Posts"));
		let post = ele.parentElement.parentElement.parentElement;

		showConfirmationDialogue("are you sure you want to delete this post").then((conf) => {
			if (conf) {
				console.log(posts[post.getAttribute("post-id")]);
				delete posts[post.getAttribute("post-id")];
				post.remove();
				localStorage.setItem("Posts", JSON.stringify(posts));
			}

		});


	}


	if (!event.target.matches('.post-icon, .menu, .menu *')) {
		menu.style.display = 'none'; // hide menu if clicked outside
	}


});

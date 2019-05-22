// vars

let headerHeight = document.querySelector('.about .fullscreen'),
	menuToggler = document.querySelector('.menu-toggler'),
	menuOpen = document.querySelector('.menu-toggler ion-icon[name="menu"]'),
	menuClose = document.querySelector('.menu-toggler ion-icon[name="close"]'),
	nav = document.querySelector('.nav'),
	navLink = document.querySelectorAll('.nav-link');



// events

function addEvents() {
	// pin/unpin header when scroll down
	window.addEventListener('scroll', fixHeader);

	// open/close menu
	menuToggler.addEventListener('click', toggleMenu);

	nav.addEventListener('click', closeMenu);
}

addEvents();



// functions

// pin/unpin header when scroll down
function fixHeader() {
	let fromTop = window.pageYOffset;

	if (fromTop >= headerHeight.offsetHeight) document.body.classList.add('fixed')
	else if (fromTop < headerHeight.offsetHeight) {
		document.body.classList.remove('fixed');

		// hide opened menu
		nav.style.display = '';

		// close toggler btn
		if (menuToggler.classList.contains('menu-close')) {
			menuToggler.classList.remove('menu-close');
			menuToggler.classList.add('menu-open');
		}
	}

	// change active link when scroll under sections
	navLink.forEach(function(link) {
		let section = document.querySelector(link.hash);

		if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
			link.classList.add("active");
		} else {
			link.classList.remove("active");
		}
	});		
}

// open/close menu
function toggleMenu() {
	if (menuToggler.classList.contains('menu-open')) {
		menuToggler.classList.remove('menu-open');
		menuToggler.classList.add('menu-close');

		nav.style.display = 'block';
	} else {
		menuToggler.classList.remove('menu-close');
		menuToggler.classList.add('menu-open');

		nav.style.display = '';
	}
}

function closeMenu(e) {
	if (menuToggler.classList.contains('menu-close')) {
		if (e.target.classList.contains('nav-link')) {
			menuToggler.classList.remove('menu-close');
			menuToggler.classList.add('menu-open');

			nav.style.display = '';
		}
	}
}
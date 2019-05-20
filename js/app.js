// vars

let	worksCont = document.querySelector('#works'),
	worksList = document.querySelectorAll('.work-i'),
	controls = document.querySelector('.controls'),
	prevBtn = document.querySelector('.scroll-prev'),
	nextBtn = document.querySelector('.scroll-next'),
	pagination = document.querySelector('.pagination'),

	obj = {
	// distance from top of page
	fromTop: 0,

	// distance from bottom of viewport
	fromBottom: 0,

	// index of curr work
	currIndex: 0,

	// decrease index
	decrease: function() {
		this.currIndex--;
	},

	// increase index
	increase: function() {
		this.currIndex++;
	},

	// write number of current work into DOM el
	write: function() {
		pagination.textContent = '0' + (this.currIndex + 1) + ' / ' + '0' + worksList.length;
	}
};



// events

function addEvents() {
	// when DOM content loaded
	window.addEventListener('DOMContentLoaded', function() {	
		// get curr index of work
		getCurrIndex();	
		
		// show/hide controls
		toggleControls();
	});

	// get curr index of work
	window.addEventListener('scroll', getCurrIndex);

	// detect which btn was clicked
	controls.addEventListener('click', detectCurrBtn);
}

addEvents();



// functions

// get curr index of work
function getCurrIndex() {
	let fromTop = window.pageYOffset,
		fromBottom = window.pageYOffset + window.innerHeight;

	obj.fromTop = fromTop;
	obj.fromBottom = fromBottom;

	// show/hide controls
	if (worksCont.offsetTop - worksList[0].offsetHeight * (2 / 3) < fromTop &&
		worksCont.offsetTop + worksCont.offsetHeight - worksList[worksList.length - 1].offsetHeight / 3 > fromTop) {
		controls.style.display = 'block';
	} else controls.style.display = '';

	// get curr index of work
	worksList.forEach(function(page, index) {
		if (page.offsetTop <= fromTop && page.offsetTop + page.offsetHeight > fromTop) {
			obj.currIndex = index;

			// write number of current work into DOM el
			obj.write();

			// show/hide controls
			toggleControls();
		}
	});
}

// show/hide controls
function toggleControls() {
	// hide prev btn
	if (obj.currIndex === 0) prevBtn.style.visibility = 'hidden';
	else prevBtn.style.visibility = 'visible';

	// hide next btn
	if (obj.currIndex === worksList.length - 1) nextBtn.style.visibility = 'hidden';
	else nextBtn.style.visibility = 'visible';
}

// detect 'prev/next' click
function detectCurrBtn(e) {
	e.preventDefault();

	let currBtn = e.target.hash;

	if (currBtn === '#prev' && obj.currIndex > 0) {
		// get curr page from DOM
		let targetId = worksList[obj.currIndex].id,
			targetLink = '#' + targetId,
			targetEl = document.querySelector(targetLink);

		if (targetEl.offsetTop + targetEl.offsetHeight / 4 > obj.fromTop) obj.decrease();

	} else if (currBtn == '#next' && obj.currIndex < worksList.length - 1) {
		// get curr page from DOM
		let targetId = worksList[obj.currIndex].id,
			targetLink = '#' + targetId,
			targetEl = document.querySelector(targetLink);

		if (targetEl.offsetTop + targetEl.offsetHeight * (2 / 3) < obj.fromBottom) obj.increase();
	}

	// get curr page from DOM
	let targetId = worksList[obj.currIndex].id,
		targetLink = '#' + targetId,
		targetEl = document.querySelector(targetLink);

	// move to target
	moveToTarget(targetEl);
}

// move to target
function moveToTarget(targetEl) {
	let posX = 0,
		posY = 0;
		
	while (targetEl != null) {
		posX += targetEl.offsetLeft;
		posY += targetEl.offsetTop;
		targetEl = targetEl.offsetParent;
	}
	
	window.scrollTo(posX, posY);
}



// plugins

// typewriter

var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
	loop: true
});

typewriter
.pauseFor(1500)
.typeString('Leu')
.pauseFor(3500)
.deleteAll()
.typeString(':)')
.pauseFor(2500)
.start();

// animate on scroll

AOS.init({
	duration: 750
});
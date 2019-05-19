// vars

let	pageCont = document.querySelector('#works'),
	pageList = document.querySelectorAll('.work-i'),
	controls = document.querySelector('.controls'),
	pagination = document.querySelector('.pagination');

// create object for hosting index of curr page
let obj = {
	withdraw: function() {
		this.currIndex--;
	},

	deposit: function() {
		this.currIndex++;
	},

	// write curr page into DOM el
	write: function() {
		pagination.textContent = '0' + (this.currIndex + 1) + ' / ' + '0' + pageList.length;
	}
}

let getIndex = Object.create(obj);



// events

function addEvents() {
	// detect curr page on scroll
	window.addEventListener('scroll', detectCurrPage);

	// detect which btn was clicked
	controls.addEventListener('click', detectCurrBtn);
}

addEvents();



// functions

// detect curr page on scroll
function detectCurrPage() {
	let fromTop = window.pageYOffset;

	if (pageCont.offsetTop <= fromTop && pageCont.offsetTop + pageCont.offsetHeight > fromTop) {
		controls.style.display = 'block';
	} else {
		controls.style.display = 'none';
	}

	pageList.forEach(function(page, index) {
		if (page.offsetTop <= fromTop && page.offsetTop + page.offsetHeight > fromTop) {
			let currPage = index;

			getIndex.currIndex = currPage;

			// write curr page into DOM el
			getIndex.write();
		}
	});
}

// detect 'prev/next' click
function detectCurrBtn(e) {
	e.preventDefault();

	let currBtn = e.target.hash;

	if (currBtn === '#prev' && getIndex.currIndex > 0) getIndex.withdraw();
	else if (currBtn == '#next' && getIndex.currIndex < pageList.length - 1) getIndex.deposit();

	let targetId = pageList[getIndex.currIndex].id,
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
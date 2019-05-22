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
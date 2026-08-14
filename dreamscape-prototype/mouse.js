
function elem(id) {
	var e = document.getElementById(id);
	return e;
}

var person = elem("person");



var mX,
	mY,
	distance,
	fencedistance,
	sheepdistance,
	sheep = document.querySelectorAll(".sheep-zone"),
	fence = document.querySelector(".sheep-pen");

function calculateDistance(elem, mouseX, mouseY) {
	return Math.floor(
		Math.sqrt(
			Math.pow(mouseX - (elem.offsetLeft + elem.offsetWidth / 2), 1) +
				Math.pow(mouseY - (elem.offsetTop + elem.offsetHeight / 2), 1)
		)
	);
}

/*** Mouse Listener ***/
mousemovemethod = function (e) {
	for (var i = 0; i < sheep.length; i++) {
		mX = e.pageX;
		mY = e.pageY;



		

		

		
		
	} 

	/*** person Movement ***/
	person.style.left = e.clientX + "px";
	person.style.top = e.clientY + "px";
};

document.addEventListener("mousemove", mousemovemethod);

/*** person Direction ***/
var direction = "",
	oldx = (oldy = 0),
	personmovemethod = function (e) {
		if (e.pageY < oldy) {
			directionY = "top";
		} else if (e.pageY > oldy) {
			directionY = "bottom";
		}

		if (e.pageX < oldx) {
			directionX = "left";
		} else if (e.pageX > oldx) {
			directionX = "right";
		}

		person.className = directionY + " " + directionX;

		oldx = e.pageX;
		oldy = e.pageY;
	};

document.addEventListener("mousemove", personmovemethod);



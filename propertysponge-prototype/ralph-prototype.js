// desktop viewport vs mobile
var viewportWidth = document.documentElement.clientWidth;
//reload javascript if 1200 threshold met on vw
viewportWidth.onresize = function reloadJSBig() {
	if (viewportWidth > 1199) document.location.reload(true);
}
viewportWidth.onresize = function reloadJSSmall() {
	if (viewportWidth < 1199) document.location.reload(true);
}
//When I click on the searchbox it expands for my input and background overlay
const searchTag = document.querySelector("div.searchBox")
const blurTag = document.querySelector("div.blur")
const signUpTag = document.querySelector("div.signUpBtn")
window.addEventListener("click", function(searching) {
	searchTag.classList.add("open");
	blurTag.classList.add("on");
	if (searching.target != searchTag && searching.target.parentNode != searchTag) {
		searchTag.classList.remove("open");
		blurTag.classList.remove("on");
	}
})
//Button txt for Desktop
const dashTxtTag = document.querySelector("p.dashtxt")
const moreInfotxtTag = document.querySelector("p.moreInfotxt")
const mapTxtTag = document.querySelector("p.mapTxt")
const moneytxtTag = document.querySelector("p.moneytxt")
//When I click on the Info Icon
//1) the overviewTile slides up
//2) search / sign in disappear as well as quickView and listing info
//3) The top bar appears with infoToggle and backIcon
//4) moneyIcon changes classes to moneyIconActive to be yellow
//5) smallTitle "Overview" is shown
//6) OverviewData is shown
const infoIconTag = document.querySelector("div.infoIcon")
const quickViewTag = document.querySelector("section.quickView")
const topBarTag = document.querySelector("div.topBar")
const overViewTileTag = document.querySelector("div.overviewTile")
const moneyIconTag = document.querySelector("div.moneyIcon")
infoIconTag.addEventListener("click", function infoIconClick() {
	if (viewportWidth < 1200) {
		quickViewTag.style.opacity = "0";
		searchTag.style.right = "-48vw";
		signUpTag.style.width = "0";
		topBarTag.style.top = "32px";
		overViewTileTag.style.height = "100%";
		overViewTileTag.style.top = "160px";
		smallTitleTag.style.display = "block";
		smallTitleTag.innerHTML = "Overview";
		overviewInfoTag.style.display = "block";
		moneyIconTag.classList.add("Active");
		mapCoverTag.style.display = "none";
		overViewTileTag.style.overflow = "visible";
		mapButtonsTag.style.display = "none";
	} else {
		//desktop view null
	}
})
//when money icon is specifically clicked
moneyIconTag.addEventListener("click", function moneyIconClick() {
	whoAreWeInfoTag.style.display = "none";
	moneyIconTag.classList.add("Active");
	moreInfoTag.classList.remove("Active")
	mapIconTag.classList.remove("Active")
	mapButtonsTag.style.display = "none";
	smallTitleTag.innerHTML = "Overview";
	smallTitleTag.style.display = "block";
	overviewInfoTag.style.display = "block";
	mapTitleTag.style.width = "0";
	mapTitleTag.style.height = "0";
	mapCoverTag.classList.remove("BrdI");
	mapCoverTag.classList.remove("OpZn");
	mapCoverTag.classList.remove("TxRnk");
	mapCoverTag.classList.remove("PlPty");
	mapCoverTag.style.display = "none";
	if (viewportWidth < 1200) {
		overViewTileTag.style.height = "auto";
		overViewTileTag.style.top = "160px";
	} else {
		//desktop view
		overViewTileTag.classList.add("Desktop");
		overViewTileTag.classList.remove("DesktopMap");
		smallTitleTag.style.visibility = "visible";
		blurTag.classList.add("Desktop");
		backButtonTag.classList.add("off");
		dashButtonTag.classList.add("Black");
		mappicTag.classList.remove("White");
		qpicTag.classList.remove("White");
		moneypicTag.classList.add("White");
		moneytxtTag.classList.add("Active");
		mapTxtTag.classList.remove("Active");
		moreInfotxtTag.classList.remove("Active");
		dashTxtTag.classList.add("black");
	}
})
//When I click on moreInfoIcon
//1) moreInfoIcon changes classes to  moreInfoIconActive to be yellow & other icons are black
//2) OverviewData disappears and WhoAreWeSummary appears
//3) overviewTile smallTitle changes html to "Who Are We?"
const moreInfoTag = document.querySelector("div.moreInfoIcon")
const smallTitleTag = document.querySelector("p.smallTitleInfo")
const overviewInfoTag = document.querySelector("ul.OverviewData")
const whoAreWeInfoTag = document.querySelector("div.WhoAreWeSummary")
moreInfoTag.addEventListener("click", function infoPageSwitch() {
	smallTitleTag.innerHTML = "Who are we?"
	overviewInfoTag.style.display = "none";
	whoAreWeInfoTag.style.display = "block";
	smallTitleTag.style.display = "block";
	mapButtonsTag.style.display = "none";
	mapCoverTag.classList.remove("BrdI");
	mapCoverTag.classList.remove("OpZn");
	mapCoverTag.classList.remove("TxRnk");
	mapCoverTag.classList.remove("PlPty");
	mapTitleTag.style.width = "0";
	mapTitleTag.style.height = "0";
	moreInfoTag.classList.add("Active")
	moneyIconTag.classList.remove("Active");
	mapIconTag.classList.remove("Active");
	if (viewportWidth < 1200) {
		mapTitleTag.style.width = "0";
		mapTitleTag.style.height = "0";
		mapCoverTag.style.display = "none";
	} else {
		//desktop view
		overViewTileTag.classList.add("Desktop");
		smallTitleTag.style.visibility = "visible";
		overViewTileTag.classList.remove("DesktopMap");
		blurTag.classList.add("Desktop");
		mapCoverTag.style.display = "none";
		backButtonTag.classList.add("off");
		dashButtonTag.classList.add("Black");
		mappicTag.classList.remove("White");
		qpicTag.classList.add("White");
		moneypicTag.classList.remove("White");
		moneytxtTag.classList.remove("Active");
		mapTxtTag.classList.remove("Active");
		moreInfotxtTag.classList.add("Active");
		dashTxtTag.classList.add("black");
	}
})
//When mapIcon is clicked
//1) mapIcon changes classes to  mapIconActive to be yellow & other icons are black
//2) WhoAreWeSummary and .overviewtile .smallTitle disappears and map title appears
//3) Toggle activates streetview with streetviewsquare map below
//4) GoogleMap is set to active .MB2Active
//5) Toggling buttons changes the map view and sets that button to activates
//6) note ----> Only googlemap button has mapTitle
const mapIconTag = document.querySelector("div.mapIcon")
const mapTitleTag = document.querySelector("div.mapTitle")
const mapCoverTag = document.querySelector("div.MapCoverStr")
const mapButtonsTag = document.querySelector("div.MapButtons")
const mB1Tag = document.querySelector("div.MB1")
const mB2Tag = document.querySelector("div.MB2")
const mB3Tag = document.querySelector("div.MB3")
const mB4Tag = document.querySelector("div.MB4")
const mapToggleTag = document.querySelector("div.mapToggle")
const toggleBtnTag = document.querySelector("div.toggleButton")
const streetViewTag = document.querySelector("p.smallTitleMap1")
const birdsEyeTag = document.querySelector("p.smallTitleMap2")
//clicking the map icon
mapIconTag.addEventListener("click", function mapStart() {
	whoAreWeInfoTag.style.display = "none";
	smallTitleTag.style.display = "none";
	overviewInfoTag.style.display = "none";
	mapCoverTag.style.display = "flex";
	mapButtonsTag.style.display = "flex";
	mapTitleTag.style.width = "100%";
	mapTitleTag.style.height = "80px";
	GoogleMapBtn();
	mapIconTag.classList.add("Active");
	moreInfoTag.classList.remove("Active");
	moneyIconTag.classList.remove("Active");
	if (viewportWidth < 1200) {
		//null
	} else {
		//desktop view
		overViewTileTag.classList.add("DesktopMap");
		blurTag.classList.add("Desktop");
		mapCoverTag.style.height = "460px";
		mapCoverTag.classList.add("Active");
		mapTitleTag.style.width = "72%";
		backButtonTag.classList.add("off");
		dashButtonTag.classList.add("Black");
		mappicTag.classList.add("White");
		qpicTag.classList.remove("White");
		moneypicTag.classList.remove("White");
		moneytxtTag.classList.remove("Active");
		mapTxtTag.classList.add("Active");
		moreInfotxtTag.classList.remove("Active");
		dashTxtTag.classList.add("black");
	}
})
mapToggleTag.addEventListener("click", function togglemap() {
	if (toggleBtnTag.style.left === "10%") {
		toggleBtnTag.style.left = "50%";
		birdsEyeTag.style.color = "#000000";
		streetViewTag.style.color = "#A2B0BC";
		mapCoverTag.classList.add("BrdI");
	} else {
		toggleBtnTag.style.left = "10%";
		birdsEyeTag.style.color = "#A2B0BC";
		streetViewTag.style.color = "#000000";
		mapCoverTag.classList.remove("BrdI");
	}
})
//clicking map buttons
mB1Tag.addEventListener("click", function opportunityZoneBtn() {
	mB1Tag.style.background = "#ECBC3E";
	mB2Tag.style.background = "#F9F9F9";
	mB3Tag.style.background = "#F9F9F9";
	mB4Tag.style.background = "#F9F9F9";
	mapCoverTag.classList.remove("BrdI");
	mapCoverTag.classList.remove("TxRnk");
	mapCoverTag.classList.remove("PlPty");
	mapCoverTag.classList.add("OpZn");
	streetViewTag.innerHTML = "Opportunity Zone";
	streetViewTag.style.color = "#000000";
	mapToggleTag.style.visibility = "hidden";
	birdsEyeTag.style.visibility = "hidden";
})
mB2Tag.addEventListener("click", function() {
	GoogleMapBtn();
})

function GoogleMapBtn() {
	mB1Tag.style.background = "#F9F9F9";
	mB2Tag.style.background = "#ECBC3E";
	mB3Tag.style.background = "#F9F9F9";
	mB4Tag.style.background = "#F9F9F9";
	mapCoverTag.classList.remove("BrdI");
	mapCoverTag.classList.remove("OpZn");
	mapCoverTag.classList.remove("TxRnk");
	mapCoverTag.classList.remove("PlPty");
	streetViewTag.innerHTML = "Street View";
	streetViewTag.style.color = "#000000";
	birdsEyeTag.style.color = "#A2B0BC";
	mapToggleTag.style.visibility = "visible";
	birdsEyeTag.style.visibility = "visible";
	toggleBtnTag.style.left = "10%";
}
mB3Tag.addEventListener("click", function PlPtyBtn() {
	mB1Tag.style.background = "#F9F9F9";
	mB2Tag.style.background = "#F9F9F9";
	mB3Tag.style.background = "#ECBC3E";
	mB4Tag.style.background = "#F9F9F9";
	mapCoverTag.classList.remove("BrdI");
	mapCoverTag.classList.remove("TxRnk");
	mapCoverTag.classList.remove("OpZn");
	mapCoverTag.classList.add("PlPty");
	streetViewTag.innerHTML = "Political Party";
	streetViewTag.style.color = "#000000";
	mapToggleTag.style.visibility = "hidden";
	birdsEyeTag.style.visibility = "hidden";
})
mB4Tag.addEventListener("click", function TaxBtn() {
	mB1Tag.style.background = "#F9F9F9";
	mB2Tag.style.background = "#F9F9F9";
	mB3Tag.style.background = "#F9F9F9";
	mB4Tag.style.background = "#ECBC3E";
	mapCoverTag.classList.remove("BrdI");
	mapCoverTag.classList.remove("OpZn");
	mapCoverTag.classList.remove("PlPty");
	mapCoverTag.classList.add("TxRnk");
	streetViewTag.innerHTML = "Tax Rating";
	streetViewTag.style.color = "#000000";
	mapToggleTag.style.visibility = "hidden";
	birdsEyeTag.style.visibility = "hidden";
})
//tags for Desktop
const backButtonTag = document.querySelector("div.backIcon")
const dashButtonTag = document.querySelector("img.dash")
const mappicTag = document.querySelector("img.mappic")
const qpicTag = document.querySelector("img.qpic")
const moneypicTag = document.querySelector("img.moneypic")
//whenBack is clicked
//1) Items return to first stage
//2) overviewTile slides down
backButtonTag.addEventListener("click", function backToMain() {
	whoAreWeInfoTag.style.display = "none";
	overviewInfoTag.style.display = "none";
	mapIconTag.classList.remove("Active");
	moreInfoTag.classList.remove("Active");
	moneyIconTag.classList.remove("Active");
	mapButtonsTag.style.display = "none";
	quickViewTag.style.opacity = "1";
	if (viewportWidth < 1200) {
		overViewTileTag.style.overflow = "hidden";
		smallTitleTag.style.display = "none";
		overViewTileTag.style.height = "0";
		overViewTileTag.style.top = "1000px";
		mapTitleTag.style.width = "0";
		mapTitleTag.style.height = "0";
		signUpTag.style.width = "160px";
		topBarTag.style.top = "-200px";
		searchTag.style.right = "0px";
	} else {
		//desktop view
		mapCoverTag.style.display = "flex";
		dashButtonTag.classList.remove("Black");
		mappicTag.classList.remove("White");
		qpicTag.classList.remove("White");
		moneypicTag.classList.remove("White");
		mapTitleTag.style.width = "100%";
		mapTitleTag.style.height = "80px";
		overViewTileTag.classList.remove("Desktop");
		overViewTileTag.classList.remove("DesktopMap");
		smallTitleTag.style.visibility = "hidden";
		blurTag.classList.remove("Desktop");
		GoogleMapBtn();
		mapCoverTag.style.height = "300px";
		smallTitleTag.style.display = "block";
		mapCoverTag.classList.remove("Active");
		mapTitleTag.style.width = "100%";
		backButtonTag.classList.remove("off");
		moneytxtTag.classList.remove("Active");
		mapTxtTag.classList.remove("Active");
		moreInfotxtTag.classList.remove("Active");
		dashTxtTag.classList.remove("black");
	}
})
  //to refresh js once screen is Desktop
  const mq = window.matchMedia("(min-width: 1200px)");
  function WidthChange(mq) {
if (mq.matches) {
// window width is at least 1200px
window.location.reload(true);
} else {
// min width is less than 1200px
//null command (don't reload js)
}
}

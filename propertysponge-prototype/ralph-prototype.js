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
	hideMapCoverLive();
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
	hideMapCoverLive();
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
	refreshMapCover();
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
	hideMapCoverLive();
	refreshThemeMap("OpZn");
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
	hideMapCoverLive();
	refreshMapCover();
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
	hideMapCoverLive();
	refreshThemeMap("PlPty");
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
	hideMapCoverLive();
	refreshThemeMap("TxRnk");
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

// Live NYC Open Data lookup: geocode an address to a BBL via NYC Planning's
// GeoSearch API, then pull the current DOF tax/assessment record for it.
const searchInputTag = document.querySelector("#searchInput")
const searchStatusTag = document.querySelector("#searchStatus")
const heroMapTag = document.querySelector("#heroMap")
const coverOwnerNameTag = document.querySelector("#coverOwnerName")
const coverAddressTag = document.querySelector("#coverAddress")
const coverSpaceTag = document.querySelector("#coverSpace")
const qvMarketValueTag = document.querySelector("#qvMarketValue")
const qvAssessedValueTag = document.querySelector("#qvAssessedValue")
const qvTaxableValueTag = document.querySelector("#qvTaxableValue")
const qvOwnerNameTag = document.querySelector("#qvOwnerName")
const ovStoriesTag = document.querySelector("#ovStories")
const ovMarketValueTag = document.querySelector("#ovMarketValue")
const ovAssessedValueTag = document.querySelector("#ovAssessedValue")
const ovTaxClassTag = document.querySelector("#ovTaxClass")
const ovTaxableValueTag = document.querySelector("#ovTaxableValue")
const ovFinalAssessedValueTag = document.querySelector("#ovFinalAssessedValue")
const ovFinalMarketValueTag = document.querySelector("#ovFinalMarketValue")
const ovHighestHouseTag = document.querySelector("#ovHighestHouse")
const ovLowestHouseTag = document.querySelector("#ovLowestHouse")
const ovYearBuiltTag = document.querySelector("#ovYearBuilt")
const ovZoningTag = document.querySelector("#ovZoning")
const ovBBLTag = document.querySelector("#ovBBL")
const ovBillLinkTag = document.querySelector("#ovBillLink")

function currency(value) {
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value))
}

// NYC DOF building class codes, keyed by their first letter, covering the common categories
const buildingClassNames = {
	A: "ONE FAMILY DWELLING", B: "TWO FAMILY DWELLING", C: "WALK-UP APARTMENT",
	D: "ELEVATOR APARTMENT", R: "CONDOMINIUM", O: "OFFICE BUILDING",
	S: "MIXED USE BUILDING", K: "STORE BUILDING", V: "VACANT LAND"
}
function describeBuilding(bldgClass, stories) {
	const name = buildingClassNames[bldgClass && bldgClass[0]] || `BUILDING CLASS ${bldgClass}`
	return `${Math.round(Number(stories))} STORIES - ${name}`
}

let searchStatusTimeout
function showSearchStatus(message, autoHide = true) {
	clearTimeout(searchStatusTimeout)
	searchStatusTag.textContent = message
	searchStatusTag.classList.add("show")
	if (autoHide) {
		searchStatusTimeout = setTimeout(function () { searchStatusTag.classList.remove("show") }, 4000)
	}
}

function renderPropertyData(rec, lat, lon) {
	const address = `${rec.housenum_lo} ${rec.street_name} ${rec.zip_code}`.toUpperCase()
	const spaceDescription = describeBuilding(rec.bldg_class, rec.bld_story)
	const buildingName = spaceDescription.split(" - ")[1]

	coverOwnerNameTag.textContent = rec.owner
	coverAddressTag.textContent = address
	coverSpaceTag.textContent = spaceDescription

	qvMarketValueTag.textContent = currency(rec.curmkttot)
	qvAssessedValueTag.textContent = currency(rec.curacttot)
	qvTaxableValueTag.textContent = currency(rec.curtxbtot)
	qvOwnerNameTag.textContent = rec.owner

	ovStoriesTag.textContent = `| ${buildingName}`
	ovMarketValueTag.textContent = `| ${currency(rec.curmkttot)}`
	ovAssessedValueTag.textContent = `| ${currency(rec.curacttot)}`
	ovTaxClassTag.textContent = `| ${rec.curtaxclass}`
	ovTaxableValueTag.textContent = `| ${currency(rec.curtxbtot)}`
	ovFinalAssessedValueTag.textContent = `| ${currency(rec.finacttot)}`
	ovFinalMarketValueTag.textContent = `| ${currency(rec.finmkttot)}`
	ovHighestHouseTag.textContent = `| ${rec.housenum_hi}`
	ovLowestHouseTag.textContent = `| ${rec.housenum_lo}`
	ovYearBuiltTag.textContent = `| ${rec.yrbuilt}`
	ovZoningTag.textContent = `| ${rec.zoning}`
	ovBBLTag.textContent = `| ${rec.parid}`
	ovBillLinkTag.href = `https://a836-edms.nyc.gov/dctm-rest/repositories/dofedmspts/StatementSearch?bbl=${rec.parid}`

	// output=embed sidesteps the Maps Embed API key requirement the original pb= link needed
	heroMapTag.src = `https://www.google.com/maps?q=${lat},${lon}&z=17&output=embed`

	currentLat = lat
	currentLon = lon
	currentTaxClass = rec.curtaxclass
	// invalidate the per-address theme lookups so the next tab visit re-fetches
	currentIsOpportunityZone = null
	currentDistrict = null
	currentParty = null
	refreshMapCover()
	if (mapCoverTag.classList.contains("OpZn")) refreshThemeMap("OpZn")
	else if (mapCoverTag.classList.contains("PlPty")) refreshThemeMap("PlPty")
	else if (mapCoverTag.classList.contains("TxRnk")) refreshThemeMap("TxRnk")
}

async function searchAddress(query) {
	showSearchStatus("Searching...", false)
	try {
		const geoRes = await fetch(`https://geosearch.planninglabs.nyc/v2/search?text=${encodeURIComponent(query)}&size=1`)
		const geoData = await geoRes.json()
		const feature = geoData.features && geoData.features[0]
		const bbl = feature && feature.properties.addendum && feature.properties.addendum.pad && feature.properties.addendum.pad.bbl
		if (!feature || !bbl) {
			showSearchStatus("No NYC property found for that address.")
			return
		}
		const [lon, lat] = feature.geometry.coordinates
		const dofRes = await fetch(`https://data.cityofnewyork.us/resource/8y4t-faws.json?parid=${bbl}&$order=year DESC&$limit=1`)
		const dofData = await dofRes.json()
		const rec = dofData[0]
		if (!rec) {
			showSearchStatus("No tax record found for that address.")
			return
		}
		renderPropertyData(rec, lat, lon)
		showSearchStatus(`Showing ${feature.properties.name}`)
	} catch (err) {
		showSearchStatus("Search failed — check your connection and try again.")
	}
}

searchInputTag.addEventListener("keydown", function (event) {
	if (event.key === "Enter" && searchInputTag.value.trim()) {
		searchAddress(searchInputTag.value.trim())
	}
})

// Live map cover: Bird's Eye uses the same keyless Google satellite embed as
// the hero map. Street View needs a real photo source — fill in a free
// Mapillary client token (mapillary.com/dashboard/developers, no card
// required) to enable it; until then it just falls back to the static image.
const MAPILLARY_ACCESS_TOKEN = "MLY|28535805022671091|2c20a10970be32044591d34a57eee377"
const mapStreetViewImgTag = document.querySelector("#mapStreetViewImg")
const mapBirdsEyeFrameTag = document.querySelector("#mapBirdsEyeFrame")
let currentLat = 40.6896438
let currentLon = -73.8518447

function hideMapCoverLive() {
	mapStreetViewImgTag.style.display = "none"
	mapBirdsEyeFrameTag.style.display = "none"
	mapThemeFrameTag.style.display = "none"
	mapThemeBadgeTag.style.display = "none"
}

async function refreshMapCover() {
	if (mapCoverTag.classList.contains("BrdI")) {
		mapStreetViewImgTag.style.display = "none"
		mapBirdsEyeFrameTag.src = `https://www.google.com/maps?q=${currentLat},${currentLon}&t=k&z=19&output=embed`
		mapBirdsEyeFrameTag.style.display = "block"
		return
	}
	mapBirdsEyeFrameTag.style.display = "none"
	if (!MAPILLARY_ACCESS_TOKEN) return
	try {
		// bbox, not closeto+radius: Mapillary's Graph API rejects radius over 50m,
		// and even at 50m needs lat/lng params it won't accept alongside closeto
		const delta = 0.005
		const bbox = `${currentLon - delta},${currentLat - delta},${currentLon + delta},${currentLat + delta}`
		const res = await fetch(`https://graph.mapillary.com/images?access_token=${encodeURIComponent(MAPILLARY_ACCESS_TOKEN)}&fields=thumb_1024_url&bbox=${bbox}&limit=1`)
		const data = await res.json()
		const photo = data.data && data.data[0]
		if (!photo) return
		mapStreetViewImgTag.src = photo.thumb_1024_url
		mapStreetViewImgTag.style.display = "block"
	} catch (err) {
		// leave the static street-view image showing
	}
}

// Opportunity Zone / Political Party / Tax Rating: a shared plain roadmap
// centered on the searched address, with a badge showing the real
// classification for that spot. All three are keyless and CORS-open.
const mapThemeFrameTag = document.querySelector("#mapThemeFrame")
const mapThemeBadgeTag = document.querySelector("#mapThemeBadge")
let currentTaxClass = "1"
let currentIsOpportunityZone = null
let currentDistrict = null
let currentParty = null

const taxClassNames = {
	"1": "Homes (1-3 Family)",
	"1A": "Homes (1-3 Family)",
	"1B": "Homes (1-3 Family)",
	"1C": "Homes (1-3 Family)",
	"2": "Rentals, Co-ops & Condos",
	"2A": "Rentals, Co-ops & Condos",
	"2B": "Rentals, Co-ops & Condos",
	"2C": "Rentals, Co-ops & Condos",
	"3": "Utility Property",
	"4": "Commercial & Industrial"
}

// There's no live public feed for council party control — this needs a
// manual refresh after each city council election (next term starts 2030)
const councilDistrictParty = {
	1: "Democratic", 2: "Democratic", 3: "Democratic", 4: "Democratic", 5: "Democratic",
	6: "Democratic", 7: "Democratic", 8: "Democratic", 9: "Democratic", 10: "Democratic",
	11: "Democratic", 12: "Democratic", 13: "Democratic", 14: "Democratic", 15: "Democratic",
	16: "Democratic", 17: "Democratic", 18: "Democratic", 19: "Republican", 20: "Democratic",
	21: "Democratic", 22: "Democratic", 23: "Democratic", 24: "Democratic", 25: "Democratic",
	26: "Democratic", 27: "Democratic", 28: "Democratic", 29: "Democratic", 30: "Democratic",
	31: "Democratic", 32: "Republican", 33: "Democratic", 34: "Democratic", 35: "Democratic",
	36: "Democratic", 37: "Democratic", 38: "Democratic", 39: "Democratic", 40: "Democratic",
	41: "Democratic", 42: "Democratic", 43: "Democratic", 44: "Democratic", 45: "Democratic",
	46: "Democratic", 47: "Democratic", 48: "Republican", 49: "Democratic", 50: "Republican",
	51: "Republican"
}

async function fetchOpportunityZone(lat, lon) {
	const geometry = encodeURIComponent(JSON.stringify({ x: lon, y: lat, spatialReference: { wkid: 4326 } }))
	const url = `https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Opportunity_Zones/FeatureServer/13/query?f=json&geometry=${geometry}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=GEOID10&returnGeometry=false`
	const res = await fetch(url)
	const data = await res.json()
	return Boolean(data.features && data.features.length)
}

async function fetchCouncilDistrict(lat, lon) {
	const where = `intersects(the_geom, 'POINT (${lon} ${lat})')`
	const res = await fetch(`https://data.cityofnewyork.us/resource/872g-cjhh.json?$where=${encodeURIComponent(where)}&$select=coundist`)
	const data = await res.json()
	const district = data[0] && Number(data[0].coundist)
	return district || null
}

function setThemeBadge(text, color) {
	mapThemeBadgeTag.textContent = text
	mapThemeBadgeTag.style.background = color
	mapThemeBadgeTag.style.display = "block"
}

// guards against a slow OpZn/PlPty fetch resolving after the user has
// already switched tabs (or searched a new address) and clobbering the badge
let themeMapRequestId = 0

async function refreshThemeMap(kind) {
	const requestId = ++themeMapRequestId
	mapThemeFrameTag.src = `https://www.google.com/maps?q=${currentLat},${currentLon}&z=16&output=embed`
	mapThemeFrameTag.style.display = "block"
	mapThemeBadgeTag.style.display = "none"

	if (kind === "OpZn") {
		if (currentIsOpportunityZone === null) {
			currentIsOpportunityZone = await fetchOpportunityZone(currentLat, currentLon)
		}
		if (requestId !== themeMapRequestId) return
		setThemeBadge(
			currentIsOpportunityZone ? "Opportunity Zone" : "Not a Designated Opportunity Zone",
			currentIsOpportunityZone ? "#3DBE6B" : "#A2B0BC"
		)
	} else if (kind === "PlPty") {
		if (currentDistrict === null) {
			currentDistrict = await fetchCouncilDistrict(currentLat, currentLon)
			currentParty = currentDistrict && councilDistrictParty[currentDistrict]
		}
		if (requestId !== themeMapRequestId) return
		setThemeBadge(
			currentDistrict ? `Council District ${currentDistrict} — ${currentParty}` : "District not found",
			currentParty === "Republican" ? "#D0432A" : currentParty === "Democratic" ? "#2A6FD0" : "#A2B0BC"
		)
	} else if (kind === "TxRnk") {
		setThemeBadge(`Tax Class ${currentTaxClass} — ${taxClassNames[currentTaxClass] || "Other"}`, "#ECBC3E")
	}
}

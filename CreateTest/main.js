//Game resize code
//Aspect Ratio: 9:16

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

var stage;
var mapContainer;
var buttonContainer;
var prizeContainer;
var galleryContainer;
var trackContainer;
var mapPointerContainer; //this is for showing map pointers
var UIContainer;
//var trophyContainer;
//for 560x960 px backgrounds
var mb;
var pb;
var gb;
//var closegb;
var bgScaleX; 
var bgScaleY;
var bbWidth; //width of build button
var bpWidth; //width of pallet
var canvasWidth;
var canvasHeight;
var queue;
var mapOpened;
var mapMarker;
var buttonOne;
var buttonTwo;
var buttonThree;
var buttonFive;
var galleryOpened;
var prizeScreenOpened;
var trophyCase;
var prizeCodes;
var currentFloor;
var UIBarHeight;
var buttonScale;
var canvas;
var bpm;
var galleryBG;
var shelfDistance;
var shelfSize; //vertical size of shelves to prevent bunching up
var mapPointers = []; //keeps track of which map pointer trophies are on shelf
var currentTrackOpen;

function init() {
	canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    UIBarHeight = canvasHeight/7;
	mapOpened = false;
	prizeScreenOpened = false;
	currentFloor = 0;
	stage = new createjs.Stage("myCanvas");
	createjs.Touch.enable(stage);
	queue = new createjs.LoadQueue(false);
	queue.addEventListener("complete",handleComplete);
	prizeCodes = [
	"5P4", //track 0
	"4W0",//track 1
	"6A1",
	"3D1",//track 0
	"5R1",
	"2K3",
	"0C1",
	"6B9",//track 1
	"2H9",//track 0
	"7A0",
	"8Z1",
	//10
	"1P6",//track 1
	"2O1",//track 0
	"9G6",
	"2N3",
	"5L9",//track 1
	"2H6",//track 0
	"7P1",
	"9O7",
	"6L9",
	"6X1",
	//20
	"7T7",//track 0
	"2Y6",//track 1
	"5A5",
	"5Z1",
	"5l1",
	"3P5",
	"6X7",
	"0A9",
	"4H6",
	"1I3",
	//30
	"9F1",
	"5N9",
	"4D2",
	"6H0",
	"8A7",
	"3W4",
	"5U1",
	"1S5",
	"5B5",
	"0B7",
	//40
	"6L7",
	"3D7",
	"9C1",
	"4S7",
	"8A8",
	"4R5",
	"4M6",
	"7D2",
	"4S8",
	//49
	];
	tracks = [
	"0,3,8,10,12,16",
	"1,7,9,11,15,22"
	];
	redeemTrophies = []; //initialized in code
	queue.loadManifest([
		//scripts
		{id:"TrophyCase", src:"TrophyCase.js"},
		{id:"Trophy", src:"Trophy.js"},
		{id:"TrackTrophy", src:"TrackTrophy.js"},
		//Placeholder Trophies
		{id:"mediumTrophy", src:"assets/mediumTrophy.png"},
		{id:"largeTrophy", src:"assets/largeTrophy.png"},
		//Real trophies
		{id:"trophy0", src:"assets/Trophies/trophy0.png"},
		{id:"trophy1", src:"assets/Trophies/trophy1.png"},
		{id:"trophy2", src:"assets/Trophies/trophy2.png"},
		{id:"trophy3", src:"assets/Trophies/trophy3.png"},
		{id:"trophy4", src:"assets/Trophies/trophy4.png"},
		{id:"trophy5", src:"assets/Trophies/trophy5.png"},
		{id:"trophy6", src:"assets/Trophies/trophy6.png"},
		{id:"trophy7", src:"assets/Trophies/trophy7.png"},
		{id:"trophy8", src:"assets/Trophies/trophy8.png"},
		{id:"trophy9", src:"assets/Trophies/trophy9.png"},
		{id:"trophy10", src:"assets/Trophies/trophy10.png"},
		{id:"trophy11", src:"assets/Trophies/trophy11.png"},
		{id:"trophy12", src:"assets/Trophies/trophy12.png"},
		{id:"trophy13", src:"assets/Trophies/trophy13.png"},
		{id:"trophy14", src:"assets/Trophies/trophy14.png"},
		{id:"trophy15", src:"assets/Trophies/trophy15.png"},
		{id:"trophy16", src:"assets/Trophies/trophy16.png"},
		{id:"trophy17", src:"assets/Trophies/trophy17.png"},
		{id:"trophy18", src:"assets/Trophies/trophy18.png"},
		{id:"trophy19", src:"assets/Trophies/trophy18.png"}, //************************CHANGE THIS TO TROPHY 19 WHEN ITS READY************************
		{id:"trophy20", src:"assets/Trophies/trophy20.png"},
		{id:"trophy21", src:"assets/Trophies/trophy21.png"},
		{id:"trophy22", src:"assets/Trophies/trophy22.png"},
		{id:"trophy23", src:"assets/Trophies/trophy23.png"},
		// {id:"trophy24", src:"assets/Trophies/trophy24.png"},
		// {id:"trophy25", src:"assets/Trophies/trophy25.png"},
		// {id:"trophy26", src:"assets/Trophies/trophy26.png"},
		// {id:"trophy27", src:"assets/Trophies/trophy27.png"},
		// {id:"trophy28", src:"assets/Trophies/trophy28.png"},
		// {id:"trophy29", src:"assets/Trophies/trophy29.png"},
		// {id:"trophy30", src:"assets/Trophies/trophy30.png"},
		// {id:"trophy31", src:"assets/Trophies/trophy31.png"},
		// {id:"trophy32", src:"assets/Trophies/trophy32.png"},
		// {id:"trophy33", src:"assets/Trophies/trophy33.png"},
		// {id:"trophy34", src:"assets/Trophies/trophy34.png"},
		// {id:"trophy35", src:"assets/Trophies/trophy35.png"},
		// {id:"trophy36", src:"assets/Trophies/trophy36.png"},
		// {id:"trophy37", src:"assets/Trophies/trophy37.png"},
		// {id:"trophy38", src:"assets/Trophies/trophy38.png"},
		// {id:"trophy39", src:"assets/Trophies/trophy39.png"},
		// {id:"trophy40", src:"assets/Trophies/trophy40.png"},
		// {id:"trophy41", src:"assets/Trophies/trophy41.png"},
		// {id:"trophy42", src:"assets/Trophies/trophy42.png"},
		// {id:"trophy43", src:"assets/Trophies/trophy43.png"},
		// {id:"trophy44", src:"assets/Trophies/trophy44.png"},
		// {id:"trophy45", src:"assets/Trophies/trophy45.png"},
		// {id:"trophy46", src:"assets/Trophies/trophy46.png"},
		// {id:"trophy47", src:"assets/Trophies/trophy47.png"},
		// {id:"trophy48", src:"assets/Trophies/trophy48.png"},
		// {id:"trophy49", src:"assets/Trophies/trophy49.png"},
		//UI and stuff
		{id:"mapMarker", src:"assets/mapMarker.png"},
		{id:"shelf", src:"assets/shelf.png"},
		{id:"longShelf", src:"assets/longShelf.png"},
		{id:"mapBackground",src:"assets/mapBackground.png"},
		{id:"firstFloor",src:"assets/firstFloor.png"},
		{id:"secondFloor",src:"assets/secondFloor.png"},
		{id:"thirdFloor",src:"assets/thirdFloor.png"},
		{id:"fifthFloor",src:"assets/fifthFloor.png"},
		{id:"mapButtonOne",src:"assets/mapButtonOne.png"},
		{id:"mapButtonTwo",src:"assets/mapButtonTwo.png"},
		{id:"mapButtonThree",src:"assets/mapButtonThree.png"},
		{id:"mapButtonFive",src:"assets/mapButtonFive.png"},
		{id:"prizeBackground",src:"assets/prizeBackground.png"},
		{id:"buildIcon",src:"assets/buildIcon.png"},
		{id:"galleryIcon",src:"assets/galleryIcon.png"},
		{id:"galleryCloseIcon",src:"assets/galleryCloseIcon.png"},
		{id:"galleryBG",src:"assets/galleryBG.png"},
		{id:"buildPaletteFinal",src:"assets/buildPaletteFinal.png"},
		{id:"mainUIBar",src:"assets/mainUIBar.png"},
		{id:"mapIcon",src:"assets/mapIcon.png"},
		{id:"prizeIcon",src:"assets/prizeIcon.png"},
		{id:"buildIcon",src:"assets/buildIcon.png"},
		{id:"buildPaletteFinal",src:"assets/buildPaletteFinal.png"},
		{id:"trophyScreenBG",src:"assets/trophyScreenBG.png"}], true);


}

function InitializeItemPool()
{
	// itemPool = new ItemPool(6); //initialize an item pool of 6 objects
	// console.log("no of elements : " + itemPool.GetCount());

	// GetItems();

	//----------------

	// var newArray = [];
	// newArray = itemPool.GetItems(12);

	// for (var i = 0; i < newArray.length; i++) 
 //    {
 //        console.log("new item : " + newArray[i]);
 //    }
}

function InitializeContainers()
{
	// trophyContainer = new createjs.Container();
 // 	trophyContainer.name = "TrophyContainer";

 	galleryContainer = new createjs.Container();
	galleryContainer.name = "gallery";
	galleryContainer.y = -3*canvasHeight; //placing off screen

	galleryBG = new createjs.Bitmap(queue.getResult("galleryBG"));
	
	//scale BG to fit screen
	bgScaleY = canvasHeight/galleryBG.getBounds().height;
	bgScaleX = canvasWidth/galleryBG.getBounds().width;

	galleryBG.scaleY = bgScaleY;
	galleryBG.scaleX = bgScaleX;

	galleryBG.y = -canvasHeight*3;

	//testing
	//galleryContainer.addChild(galleryBG);


 	buttonContainer = new createjs.Container();
	buttonContainer.name = "buttons";
	prizeContainer = new createjs.Container();
	prizeContainer.name = "prize";
	
	trackContainer = new createjs.Container();
	trackContainer.name = "trackContainer";

	mapPointerContainer = new createjs.Container();
	mapPointerContainer.name = "mapPointerContainer";

	mapContainer = new createjs.Container();
	mapContainer.name = "maps";

	UIContainer = new createjs.Container();
	UIContainer.name = "UI";
 	//trophyContainer.x = canvasWidth/2;

	console.log("containers made");
	// worldContainer.x = canvasWidth - bpWidth;
}

function InitializeInventory()
{
   	//var item1 = new Item();
	//item1.init();

    trophyCase = new TrophyCase();
	trophyCase.init();
}

function GetItems()
{
	var newArray = [];
	newArray = itemPool.GetItems(3);

	for (var i = 0; i < newArray.length; i++) 
    {
        console.log("new item : " + newArray[i]);
    }
}

function AddContainersToStage()
{
	stage.addChild(trackContainer);
	stage.addChild(mapPointerContainer);
	stage.addChild(galleryBG); //gallery is on top of BG when it is opened
	//galleryBG.visible = false; //hide it on top
	stage.addChild(galleryContainer);
	stage.addChild(UIContainer);
	stage.addChild(buttonContainer);
	stage.addChild(mb);
	stage.addChild(pb);
	stage.addChild(gb);
	stage.addChild(closegb);
	closegb.visible = false;
	stage.addChild(mapContainer);
}

function handleComplete(event) {
	InitializeContainers();
	makeBg();
	initializeUIBar();
	initializeMapBackground();
	initializeMapButton();
	initializeMaps();
	initializePrizeBackground();
	initializePrizeButton();
	initializeGalleryButton();
	InitializeInventory();
	AddContainersToStage();
	
	createjs.Ticker.addEventListener("tick",tick);
}

function tick(event) {
	stage.update();
}

function makeBg () {
	//Draws initial background
	bpm = new createjs.Bitmap(queue.getResult("trophyScreenBG"));
	
	//scale BG to fit screen
	bgScaleY = canvasHeight/bpm.getBounds().height;
	bgScaleX = canvasWidth/bpm.getBounds().width;

	bpm.scaleY = bgScaleY;
	bpm.scaleX = bgScaleX;

	stage.addChild(bpm);
	//stage.update();
}

function initializeMapButton() {
	mb = new createjs.Bitmap(queue.getResult("mapIcon"));
	//stage.addChild(mb);
	
	buttonScale = ((2*UIBarHeight)/3)/mb.getBounds().height; 
	mb.scaleY = buttonScale;
	mb.scaleX = buttonScale;

	mb.x = (mb.getBounds().width*buttonScale*0.25);
	mb.y = UIBarHeight/6;

	mb.addEventListener("click",moveMapUI);
}

function initializeGalleryButton() {
	gb = new createjs.Bitmap(queue.getResult("galleryIcon"));
	
	buttonScale = ((2*UIBarHeight)/3)/gb.getBounds().height; 
	gb.scaleY = buttonScale;
	gb.scaleX = buttonScale;

	gb.x = canvasWidth/2 - (gb.getBounds().width*buttonScale)/2;
	gb.y = UIBarHeight/6;

	closegb = new createjs.Bitmap(queue.getResult("galleryCloseIcon"));
	closegb.scaleY = gb.scaleY;
	closegb.scaleX = gb.scaleX;

	closegb.x =canvasWidth/2 - (closegb.getBounds().width*buttonScale)/2;
	closegb.y = gb.y;

	galleryOpened = false;
	closegb.addEventListener("click",moveGalleryOut);
	gb.addEventListener("click",moveGalleryIn);
}

function moveGalleryIn (event) {

	console.log("Gallery IN");

	if(!galleryOpened) 
	{
		//createjs.Tween.get(buttonContainer,{loop:false}).to({x:0},300);
		createjs.Tween.get(galleryBG,{loop:false}).to({y:0},300);
		createjs.Tween.get(galleryContainer,{loop:false}).to({y:0},300).call(OpenGallery);
		//createjs.Tween.get(galleryContainer,{loop:false}).to({x:0},canvasHeight/2);

		galleryOpened = true;
	}
}

function OpenGallery()
{
	//galleryBG.visible = true;
	gb.visible = !gb.isVisible();
	closegb.visible = true;
}

function moveGalleryOut (event) {

	console.log("Gallery OUT");

	if(galleryOpened) 
	{
		
		//createjs.Tween.get(trophyContainer,{loop:false}).to({x:-540},300);
		//createjs.Tween.get(galleryContainer,{loop:false}).to({x:0},canvasHeight*3);
		createjs.Tween.get(galleryBG,{loop:false}).to({y:-canvasHeight*3},300);
		createjs.Tween.get(galleryContainer,{loop:false}).to({y:-canvasHeight*3},300).call(CloseGallery);

		galleryOpened = false;
	} 
}

function CloseGallery()
{
	//galleryBG.visible = false;
	gb.visible = true;
	closegb.visible = false;
}

function initializeMapBackground() {
	buttonContainer.x = -canvasWidth;

	
	var mapBG = new createjs.Bitmap(queue.getResult("mapBackground"));
	//scale map BG
	mapBG.scaleY = bgScaleY;
	mapBG.scaleX = bgScaleX;

	buttonOne = new createjs.Bitmap(queue.getResult("mapButtonOne"));
	buttonOne.addEventListener("click",setCurrentFloor);
	buttonTwo = new createjs.Bitmap(queue.getResult("mapButtonTwo"));
	buttonTwo.addEventListener("click",setCurrentFloor);
	buttonThree = new createjs.Bitmap(queue.getResult("mapButtonThree"));
	buttonThree.addEventListener("click",setCurrentFloor);
	buttonFive = new createjs.Bitmap(queue.getResult("mapButtonFive"));
	buttonFive.addEventListener("click",setCurrentFloor);

	
	//buttons need to be scaled along x to ensure that all 4 can fit on the screen
	var desiredSizeY = canvasHeight/8;
	var desiredSizeX = canvasWidth/4;
	var newScaleX = desiredSizeX/buttonOne.getBounds().width;
	var newScaleY = desiredSizeY/buttonOne.getBounds().height;

	//apply the new scale along y axis
	buttonOne.scaleX *= newScaleX;
	buttonTwo.scaleX *= newScaleX;
	buttonThree.scaleX *= newScaleX;
	buttonFive.scaleX *= newScaleX;

	buttonOne.scaleY *= newScaleY;
	buttonTwo.scaleY *= newScaleY;
	buttonThree.scaleY *= newScaleY;
	buttonFive.scaleY *= newScaleY;

	mapBG.x = 0;
	buttonOne.y = canvasHeight - desiredSizeY;
	buttonTwo.y = canvasHeight - desiredSizeY;
	buttonThree.y = canvasHeight - desiredSizeY;
	buttonFive.y = canvasHeight - desiredSizeY;
	buttonOne.x = 0;
	buttonTwo.x = desiredSizeX;
	buttonThree.x = 2*desiredSizeX;
	buttonFive.x = 3*desiredSizeX;
	buttonContainer.addChild(mapBG,buttonOne,buttonTwo,buttonThree,buttonFive);
}

function initializeMaps() {
	mapContainer.x = -540;
	var f1 = new createjs.Bitmap(queue.getResult("firstFloor"));
	var f2 = new createjs.Bitmap(queue.getResult("secondFloor"));
	var f3 = new createjs.Bitmap(queue.getResult("thirdFloor"));
	var f5 = new createjs.Bitmap(queue.getResult("fifthFloor"));

	var maxMapHeight = canvasHeight - UIBarHeight - canvasHeight/8;
	console.log("Max map height : " + maxMapHeight);

	var desiredHeight = maxMapHeight*0.95;
	var newWidth = 0.6 * canvasWidth;
	//var newHeight = 0.58 * canvasHeight;

	mapScaleY = desiredHeight/f1.getBounds().height;
	mapScaleX = newWidth/f1.getBounds().width;

	mapMarker = new createjs.Bitmap(queue.getResult("mapMarker"));
	mapMarker.scaleX = (newWidth/6)/mapMarker.getBounds().width; //1/10th the size of the map
	mapMarker.scaleY = mapMarker.scaleX;

	mapMarker.x = canvasWidth/2 - newWidth/2;
	mapMarker.y = canvasHeight/2 - desiredHeight/2;

	//stage.addChild(mapMarker);

	f1.scaleY *= mapScaleY;
	f1.scaleX *= mapScaleX;
	f2.scaleY = mapScaleY;
	f2.scaleX = mapScaleX;
	f3.scaleY = mapScaleY;
	f3.scaleX = mapScaleX;
	f5.scaleY = mapScaleY;
	f5.scaleX = mapScaleX;

	//var fx = canvasWidth - newWidth*1.5;
	var fx = canvasWidth/2 - newWidth/2;
	// var fy = canvasHeight -desiredHeight*1.5;
	var fy = canvasHeight/2 - desiredHeight/2;

	f1.x = fx;
	f1.y = fy;
	f2.x = fx;
	f2.y = fy;
	f3.x = fx;
	f3.y = fy;
	f5.x = fx;
	f5.y = fy;
	mapContainer.addChild(f1,f2,f3,f5,mapMarker);
	displayCurrentFloor();
}

function moveMapUI (event) {

	if(mapOpened) {
		createjs.Tween.get(buttonContainer,{loop:false}).to({x:-540},300);
		createjs.Tween.get(mapContainer,{loop:false}).to({x:-540},300).call(ReAppearItems);
	} else {
		trophyCase.SetAllItemsAlpha(0);
		createjs.Tween.get(buttonContainer,{loop:false}).to({x:0},300);
		createjs.Tween.get(mapContainer,{loop:false}).to({x:0},300);
	}
	mapOpened = !mapOpened;
}

function openMapToFloor(floorNo)
{
	console.log("FLOOR NO : " + floorNo);
	moveMapUI();
	currentFloor = floorNo;
	resetFloorButtons();
	
	if(floorNo == 0)
		buttonOne.alpha = 0.5;
	else if(floorNo == 1)
		buttonTwo.alpha = 0.5;
	else if(floorNo == 2)
		buttonThree.alpha = 0.5;
	else if(floorNo == 3)
		buttonFive.alpha = 0.5;

	displayCurrentFloor();
}

function ReAppearItems()
	{
		trophyCase.SetAllItemsAlpha(1);
	}

function initializeUIBar () {
	var UIBar = new createjs.Bitmap(queue.getResult("mainUIBar"));
	UIBar.scaleY = UIBarHeight/UIBar.getBounds().height; //1/7th of total height
	//UIBarHeight = UIBar.getBounds().height;
	UIContainer.addChild(UIBar);
	//buttonContainer
	//UIBar.x = 0;
}


function setCurrentFloor (event) {
	console.log("set current floor called");
	resetFloorButtons();
	event.target.alpha = 0.5;
	currentFloor = buttonContainer.getChildIndex(event.target) - 1;
	displayCurrentFloor();
}

function displayCurrentFloor () {
	for(i = 0; i < mapContainer.children.length; i++) {
		mapContainer.children[i].alpha = 0;
	}
	mapContainer.children[currentFloor].alpha = 1;

	//map marker
	mapContainer.children[4].alpha = 1;
	var newWidth = 0.6 * canvasWidth;
	var newHeight = 0.95 * (canvasHeight - UIBarHeight - canvasHeight/8);

	var leftLimit = canvasWidth/2 - newWidth/3;
	var rightLimit = canvasWidth/2 + newWidth/6;
	
	var topLimit = canvasHeight/2 - newHeight/2.5;
	var botLimit = canvasHeight/2 + newHeight/4;

	mapMarker.x = Math.floor((Math.random() * (rightLimit - leftLimit)) + leftLimit);
	mapMarker.y = Math.floor((Math.random() * (topLimit - botLimit)) + botLimit);

	//mapMarker.x = Math.floor((Math.random() * (canvasWidth/2 + newWidth/2) - (canvasWidth/2 - newWidth/2)) + (canvasWidth/2 - newWidth/2));
}

function resetFloorButtons () {
	for(i = 1; i < buttonContainer.children.length; i++) {
		buttonContainer.children[i].alpha = 1;
	}
}


function initializePrizeBackground() {
	
	//position the prize background above the main viewport
	prizeContainer.y = -canvasHeight;

	//add the prizeContainer to the stage
	stage.addChild(prizeContainer);
	var prizeBG = new createjs.Bitmap(queue.getResult("prizeBackground"));

	//scale BG to fit screen
	//bgScaleY = canvasHeight/prizeBG.getBounds().height;
	//bgScaleX = canvasWidth/prizeBG.getBounds().width;

	prizeBG.scaleY = bgScaleY;
	prizeBG.scaleX = bgScaleX;
	prizeContainer.addChild(prizeBG);
}

function initializePrizeButton () {
	pb = new createjs.Bitmap(queue.getResult("prizeIcon"));
	//stage.addChild(pb);

	buttonScale = ((2*UIBarHeight)/3)/pb.getBounds().height; 
	pb.scaleY = buttonScale;
	pb.scaleX = buttonScale;

	pb.x = canvasWidth - (pb.getBounds().width*buttonScale*1.25);
	pb.y = UIBarHeight/6;
	//pb.y = pb.getBounds().height/4;
	pb.addEventListener("click",enterPrizeCode);
	//pb.addEventListener("click",movePrizeUI);

	//Initialize redeem strings
	for(var i = 0; i < prizeCodes.length; i++)
		redeemTrophies[i] = i;
}

function movePrizeUI () {
	if (prizeScreenOpened) {
		createjs.Tween.get(prizeContainer,{loop:false}).to({y:-canvasHeight},300);
	} else {
		createjs.Tween.get(prizeContainer,{loop:false}).to({y:0},300);
		//var userInput = prompt('Enter prize code.');
	}
	prizeScreenOpened = !prizeScreenOpened;
}

function enterPrizeCode (event) {
	console.log("prize string length : " + prizeCodes.length);
	var userInput = prompt('Enter prize code.');
	var redeemCode = checkPrizeCode(userInput);
	if(redeemCode >= 0) 
	{
		//Open prize screen if a valid prize code is entered
		//movePrizeUI();
		console.log("Trophy redeemed = " + redeemTrophies[redeemCode]);
		trophyCase.UnlockTrophy(redeemTrophies[redeemCode]);
	} else {
		alert("Invalid prize code.");
	}
}

function checkPrizeCode (userInput) {
	//Returns true for a valid prize code
	for(i = 0; i < prizeCodes.length; i++) {
		if(userInput == prizeCodes[i]) {
			return i;
		}
	}
	return -1;
}

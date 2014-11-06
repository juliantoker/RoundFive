//Game resize code
//Aspect Ratio: 9:16

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

var stage;
var mapContainer;
var buttonContainer;
var queue;
var buildPalletOpened;
var mapOpened;
var currentFloor;
var canvas
function init() {
	canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	buildPalletOpened = false;
	mapOpened = false;
	currentFloor = 0;
	stage = new createjs.Stage("myCanvas");
	mapContainer = new createjs.Container();
	mapContainer.name = "maps";
	buttonContainer = new createjs.Container();
	buttonContainer.name = "buttons";
	queue = new createjs.LoadQueue(false);
	queue.addEventListener("complete",handleComplete);
	queue.loadManifest([
		{id:"bg",src:"assets/background.png"},
		{id:"buildButton",src:"assets/buildButton.png"},
		{id:"buildPallet",src:"assets/buildPallet.png"},
		{id:"mapButton",src:"assets/mapButton.png"},
		{id:"mapBackground",src:"assets/mapBackground.png"},
		{id:"firstFloor",src:"assets/firstFloor.png"},
		{id:"secondFloor",src:"assets/secondFloor.png"},
		{id:"thirdFloor",src:"assets/thirdFloor.png"},
		{id:"fifthFloor",src:"assets/fifthFloor.png"},
		{id:"mapButtonOne",src:"assets/mapButtonOne.png"},
		{id:"mapButtonTwo",src:"assets/mapButtonTwo.png"},
		{id:"mapButtonThree",src:"assets/mapButtonThree.png"},
		{id:"mapButtonFive",src:"assets/mapButtonFive.png"}]);
}

function handleComplete(event) {
	makeBg();
	initializeBuildPallet();
	initializeBuildButton();
	initializeMapBackground();
	initializeMapButton();
	initializeMaps();
	createjs.Ticker.addEventListener("tick",tick);
	
}

function tick(event) {
	stage.update();
}

function makeBg () {
	//Draws initial background
	var bpm = new createjs.Bitmap(queue.getResult("bg"));
	stage.addChild(bpm);
}

function initializeMapButton() {
	var mb = new createjs.Bitmap(queue.getResult("mapButton"));
	stage.addChild(mb);
	mb.addEventListener("click",moveMapUI);
}

function initializeMapBackground() {
	buttonContainer.x = -540;
	stage.addChild(buttonContainer);
	var mapBG = new createjs.Bitmap(queue.getResult("mapBackground"));
	var buttonOne = new createjs.Bitmap(queue.getResult("mapButtonOne"));
	buttonOne.addEventListener("click",setCurrentFloor);
	var buttonTwo = new createjs.Bitmap(queue.getResult("mapButtonTwo"));
	buttonTwo.addEventListener("click",setCurrentFloor);
	var buttonThree = new createjs.Bitmap(queue.getResult("mapButtonThree"));
	buttonThree.addEventListener("click",setCurrentFloor);
	var buttonFive = new createjs.Bitmap(queue.getResult("mapButtonFive"));
	buttonFive.addEventListener("click",setCurrentFloor);
	mapBG.x = 0;
	buttonOne.y = 825;
	buttonTwo.y = 825;
	buttonThree.y = 825;
	buttonFive.y = 825;
	buttonOne.x = 0;
	buttonTwo.x = 135;
	buttonThree.x = 270;
	buttonFive.x = 405;
	buttonContainer.addChild(mapBG,buttonOne,buttonTwo,buttonThree,buttonFive);

}

function initializeMaps() {
	mapContainer.x = -540;
	stage.addChild(mapContainer);
	var fx = 130;
	var fy = 230;
	var f1 = new createjs.Bitmap(queue.getResult("firstFloor"));
	var f2 = new createjs.Bitmap(queue.getResult("secondFloor"));
	var f3 = new createjs.Bitmap(queue.getResult("thirdFloor"));
	var f5 = new createjs.Bitmap(queue.getResult("fifthFloor"));
	f1.x = fx;
	f1.y = fy;
	f2.x = fx;
	f2.y = fy;
	f3.x = fx;
	f3.y = fy;
	f5.x = fx;
	f5.y = fy;
	mapContainer.addChild(f1,f2,f3,f5);
	displayCurrentFloor();
}

function moveMapUI (event) {
	if(mapOpened) {
		createjs.Tween.get(buttonContainer,{loop:false}).to({x:-540},300)
		createjs.Tween.get(mapContainer,{loop:false}).to({x:-540},300)
	} else {
		createjs.Tween.get(buttonContainer,{loop:false}).to({x:0},300);
		createjs.Tween.get(mapContainer,{loop:false}).to({x:0},300);
	}
	mapOpened = !mapOpened;
}

function initializeBuildButton() {
	var bb = new createjs.Bitmap(queue.getResult("buildButton"));
	stage.addChild(bb);
	bb.x = 500;
	bb.addEventListener("click",moveBuildUI);
}

function initializeBuildPallet () {
	//makes build pallet and moves it into position off screen on the right.
	var bp = new createjs.Bitmap(queue.getResult("buildPallet"));
	bp.name = "buildPallet";
	stage.addChild(bp);
	bp.x = 540;
	//createjs.Tween.get(bp,{loop:false}).to({x:430},300);
}

function moveBuildUI(event) {
	//Opens and closes the build UI
	//Get a referrence to the buildPallet display object
	var pallet;
	pallet = stage.getChildByName("buildPallet");
	//If the build pallet is opened, close it
	//If the build pallet is closed, open it
	if(buildPalletOpened){
		createjs.Tween.get(event.target,{loop:false}).to({x:500},300);
		createjs.Tween.get(pallet,{loop:false}).to({x:540},300);
	} else {
		createjs.Tween.get(event.target,{loop:false}).to({x:390},300);
		createjs.Tween.get(pallet,{loop:false}).to({x:430},300);
	}
	buildPalletOpened = !buildPalletOpened;
	
}
function setCurrentFloor (event) {
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
}

function resetFloorButtons () {
	for(i = 1; i < buttonContainer.children.length; i++) {
		buttonContainer.children[i].alpha = 1;
	}
}


//Game resize code
//Aspect Ratio: 9:16

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

var stage;
var mapContainer;
var buttonContainer;
//for 560x960 px backgrounds
var bgScaleX; 
var bgScaleY;
var bbWidth; //width of build button
var bpWidth; //width of pallet
var canvasWidth;
var canvasHeight;
var queue;
var buildPalletOpened;
var mapOpened;
var itemPool;
var currentFloor;
var canvas;
function init() {
	canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
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
		{id:"ItemPool", src:"ItemPool.js"},
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

		{id:"mapButtonFive",src:"assets/mapButtonFive.png"}], true);
}

function InitializeItemPool(){
	
	itemPool = new ItemPool();
	//itemPool.init();
}

function handleComplete(event) {
	makeBg();
	initializeBuildPallet();
	initializeBuildButton();
	initializeMapBackground();
	initializeMapButton();
	initializeMaps();
	InitializeItemPool();
	createjs.Ticker.addEventListener("tick",tick);
	
}

function tick(event) {
	stage.update();
}

function makeBg () {
	//Draws initial background
	var bpm = new createjs.Bitmap(queue.getResult("bg"));
	
	//scale BG to fit screen
	bgScaleY = canvasHeight/bpm.getBounds().height;
	bgScaleX = canvasWidth/bpm.getBounds().width;

	bpm.scaleY = bgScaleY;
	bpm.scaleX = bgScaleX;

	stage.addChild(bpm);
	//stage.update();
}

function initializeMapButton() {
	var mb = new createjs.Bitmap(queue.getResult("mapButton"));
	stage.addChild(mb);
	mb.addEventListener("click",moveMapUI);
}

function initializeMapBackground() {
	buttonContainer.x = -canvasWidth;
	stage.addChild(buttonContainer);
	
	var mapBG = new createjs.Bitmap(queue.getResult("mapBackground"));
	//scale map BG
	mapBG.scaleY = bgScaleY;
	mapBG.scaleX = bgScaleX;

	var buttonOne = new createjs.Bitmap(queue.getResult("mapButtonOne"));
	buttonOne.addEventListener("click",setCurrentFloor);
	var buttonTwo = new createjs.Bitmap(queue.getResult("mapButtonTwo"));
	buttonTwo.addEventListener("click",setCurrentFloor);
	var buttonThree = new createjs.Bitmap(queue.getResult("mapButtonThree"));
	buttonThree.addEventListener("click",setCurrentFloor);
	var buttonFive = new createjs.Bitmap(queue.getResult("mapButtonFive"));
	buttonFive.addEventListener("click",setCurrentFloor);

	
	//buttons need to be scaled along x to ensure that all 4 can fit on the screen
	var newButtonSize = canvasWidth/4; //fit 4 buttons on the screen
	var currentbuttonSize = buttonOne.getBounds().width;
	var newScale = newButtonSize/currentbuttonSize;

	//apply the new scale along y axis
	buttonOne.scaleX *= newScale;
	buttonTwo.scaleX *= newScale;
	buttonThree.scaleX *= newScale;
	buttonFive.scaleX *= newScale;

	buttonOne.scaleY *= newScale;
	buttonTwo.scaleY *= newScale;
	buttonThree.scaleY *= newScale;
	buttonFive.scaleY *= newScale;

	mapBG.x = 0;
	buttonOne.y = canvasHeight - newButtonSize;
	buttonTwo.y = canvasHeight - newButtonSize;
	buttonThree.y = canvasHeight - newButtonSize;
	buttonFive.y = canvasHeight - newButtonSize;
	buttonOne.x = 0;
	buttonTwo.x = newButtonSize;
	buttonThree.x = 2*newButtonSize;
	buttonFive.x = 3*newButtonSize;
	buttonContainer.addChild(mapBG,buttonOne,buttonTwo,buttonThree,buttonFive);
}

function initializeMaps() {
	mapContainer.x = -540;
	stage.addChild(mapContainer);
	var f1 = new createjs.Bitmap(queue.getResult("firstFloor"));
	var f2 = new createjs.Bitmap(queue.getResult("secondFloor"));
	var f3 = new createjs.Bitmap(queue.getResult("thirdFloor"));
	var f5 = new createjs.Bitmap(queue.getResult("fifthFloor"));

	var newWidth = 0.5 * canvasWidth;
	var newHeight = 0.58 * canvasHeight;

	mapScaleY = newHeight/f1.getBounds().height;
	mapScaleX = newWidth/f1.getBounds().width;

	f1.scaleY *= mapScaleY;
	f1.scaleX *= mapScaleX;
	f2.scaleY = mapScaleY;
	f2.scaleX = mapScaleX;
	f3.scaleY = mapScaleY;
	f3.scaleX = mapScaleX;
	f5.scaleY = mapScaleY;
	f5.scaleX = mapScaleX;

	var fx = canvasWidth - newWidth*1.5;
	var fy = canvasHeight - newHeight*1.5;

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
	bbWidth = bb.getBounds().width; //store width of build button for later positioning
	bb.x = canvasWidth - bb.getBounds().width;
	bb.addEventListener("click",moveBuildUI);
	console.log("Added build listner");
}

function initializeBuildPallet () {
	//makes build pallet and moves it into position off screen on the right.
	var bp = new createjs.Bitmap(queue.getResult("buildPallet"));

	//takes 20% of screen width when open
	bpWidth = 0.25* canvasWidth;
	bpHeight = canvasHeight;

	newScaleX = bpWidth/bp.getBounds().width;
	newScaleY = bpHeight/bp.getBounds().height;

	bp.scaleX = newScaleX;
	bp.scaleY = newScaleY;

	bp.name = "buildPallet";
	stage.addChild(bp);
	bp.x = canvasWidth + (bp.getBounds().width*newScaleX);
	//createjs.Tween.get(bp,{loop:false}).to({x:430},300);
}

function moveBuildUI(event) {
	console.log("hit build button");

	//Opens and closes the build UI
	//Get a referrence to the buildPallet display object
	var pallet;
	pallet = stage.getChildByName("buildPallet");
	//If the build pallet is opened, close it
	//If the build pallet is closed, open it
	if(buildPalletOpened){
		createjs.Tween.get(event.target,{loop:false}).to({x:canvasWidth - bbWidth},300);
		//createjs.Tween.get(pallet,{loop:false}).to({x:canvas.width + pallet.getBounds().width},300);
		createjs.Tween.get(pallet,{loop:false}).to({x:canvasWidth + bpWidth},300);
	} else {
		createjs.Tween.get(event.target,{loop:false}).to({x:canvasWidth - bbWidth},300);
		//createjs.Tween.get(pallet,{loop:false}).to({x:canvas.width - pallet.getBounds().width},300);
		createjs.Tween.get(pallet,{loop:false}).to({x:canvasWidth - bpWidth},300);
	}
	buildPalletOpened = !buildPalletOpened;
	
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
	bgScaleY = canvasHeight/prizeBG.getBounds().height;
	bgScaleX = canvasWidth/prizeBG.getBounds().width;

	prizeBG.scaleY = bgScaleY;
	prizeBG.scaleX = bgScaleX;
}

function initializePrizeButton () {
	
}


var stage;
var queue;
var buildPalletOpened;
var mapOpened;
var mapContainer;
function init() {
	buildPalletOpened = false;
	mapOpened = false;
	stage = new createjs.Stage("myCanvas");
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
	mapContainer = new createjs.Container();
	mapContainer.x = -540;
	mapContainer.name = "mapContainer";
	var mapBG = new createjs.Bitmap(queue.getResult("mapBackground"));
	var buttonOne = new createjs.Bitmap(queue.getResult("mapButtonOne"));
	var buttonTwo = new createjs.Bitmap(queue.getResult("mapButtonTwo"));
	var buttonThree = new createjs.Bitmap(queue.getResult("mapButtonThree"));
	var buttonFive = new createjs.Bitmap(queue.getResult("mapButtonFive"));
	mapBG.name = "mapBG";
	buttonOne.name = "b1";
	buttonTwo.name = "b2";
	buttonThree.name = "b3";
	buttonFive.name = "b5";
	//mapContainer.addChild(mapBG,buttonOne,buttonTwo,buttonThree,buttonFive);
	stage.addChild(mapBG,buttonOne,buttonTwo,buttonThree,buttonFive);
	//stage.addChild(mapContainer);
	mapBG.x = -540;
	buttonOne.y = 825;
	buttonTwo.y = 825;
	buttonThree.y = 825;
	buttonFive.y = 825;
	buttonOne.x = -540;
	buttonTwo.x = -405;
	buttonThree.x = -270;
	buttonFive.x = -135;

}

function moveMapUI (event) {
	var mBG = stage.getChildByName("mapBG");
	var b1 = stage.getChildByName("b1");
	var b2 = stage.getChildByName("b2");
	var b3 = stage.getChildByName("b3");
	var b5 = stage.getChildByName("b5");
	if(mapOpened) {
		createjs.Tween.get(mBG,{loop:false}).to({x:-540},300);
		createjs.Tween.get(b1,{loop:false}).to({x:-540},300);
		createjs.Tween.get(b2,{loop:false}).to({x:-405},300);
		createjs.Tween.get(b3,{loop:false}).to({x:-270},300);
		createjs.Tween.get(b5,{loop:false}).to({x:-135},300);
	} else {
		createjs.Tween.get(mBG,{loop:false}).to({x:0},300);
		createjs.Tween.get(b1,{loop:false}).to({x:0},300);
		createjs.Tween.get(b2,{loop:false}).to({x:135},300);
		createjs.Tween.get(b3,{loop:false}).to({x:270},300);
		createjs.Tween.get(b5,{loop:false}).to({x:405},300);
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

function moveBuildPallet() {

}

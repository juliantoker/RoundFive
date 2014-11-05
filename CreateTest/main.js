var stage;
var queue;
var buildPalletOpened;
function init() {
	buildPalletOpened = false;
	stage = new createjs.Stage("myCanvas");
	queue = new createjs.LoadQueue(false);
	queue.addEventListener("complete",handleComplete);
	queue.loadManifest([{id:"bg",src:"assets/background.png"},{id:"buildButton",src:"assets/buildButton.png"},{id:"buildPallet",src:"assets/buildPallet.png"}]);
}

function handleComplete(event) {
	makeBg();
	initializeBuildPallet();
	initializeBuildButton();
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

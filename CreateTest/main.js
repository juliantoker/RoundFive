//Game resize code
//Aspect Ratio: 9:16

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

var stage;
var mapContainer;
var buttonContainer;
var prizeContainer;
var palletContainer;
var worldContainer;
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
var prizeScreenOpened;
var itemPool;
var inventory;
var prizeCodes;
var currentFloor;
var UIBarHeight;
var UIOffset;
var canvas;

function init() {
	canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
	buildPalletOpened = false;
	mapOpened = false;
	prizeScreenOpened = false;
	currentFloor = 0;
	UIOffset = 0.05*canvasWidth;
	stage = new createjs.Stage("myCanvas");
	createjs.Touch.enable(stage);
	queue = new createjs.LoadQueue(false);
	queue.addEventListener("complete",handleComplete);
	prizeCodes = [
	"code1",
	"code2",
	"code3"
	];
	queue.loadManifest([
		//scripts
		{id:"bg",src:"assets/background.png"},
		//{id:"SpriteSheet",src:"SpriteSheet.js"},
		{id:"ItemPool", src:"ItemPool.js"},
		{id:"Inventory", src:"Inventory.js"},
		{id:"Item", src:"Item.js"},
		//UI and stuff
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
		{id:"mapButtonFive",src:"assets/mapButtonFive.png"},
		{id:"prizeBackground",src:"assets/prizeBackground.png"},
		{id:"prizeButton",src:"assets/prizeButton.png"},
		{id:"buildIcon",src:"assets/buildIcon.png"},
		{id:"buildPaletteFinal",src:"assets/buildPaletteFinal.png"},
		{id:"mainUIBar",src:"assets/mainUIBar.png"},
		{id:"mapIcon",src:"assets/mapIcon.png"},
		//Backgrounds
		{id:"earthskyBG",src:"assets/Backgrounds/earthskyBG.png"},
		{id:"halloweenBG",src:"assets/Backgrounds/halloweenBG.png"},
		//characters
		{id:"catman",src:"assets/Characters/catman.png"},
		{id:"dragon",src:"assets/Characters/dragon.png"},
		{id:"ghost",src:"assets/Characters/ghost.png"},
		{id:"rabbit",src:"assets/Characters/rabbit.png"},
		{id:"unicorn",src:"assets/Characters/unicorn.png"},
		{id:"zombie",src:"assets/Characters/zombie.png"},

		{id:"astronaut",src:"assets/Characters/astronaut.png"},
		{id:"mushroom",src:"assets/Characters/mushroom.png"},
		{id:"person",src:"assets/Characters/person.png"},
		{id:"shark",src:"assets/Characters/shark.png"},
		{id:"teapot",src:"assets/Characters/teapot.png"},
		{id:"yellowtraffic",src:"assets/Characters/yellowtraffic.png"},
		//environments
		{id:"castle",src:"assets/Environment/castle.png"},
		{id:"anchor",src:"assets/Environment/anchor.png"},
		{id:"earthGround",src:"assets/Environment/earthGround.png"},
		{id:"fishboat",src:"assets/Environment/fishboat.png"},
		{id:"gravestone",src:"assets/Environment/gravestone.png"},
		{id:"skyscraper",src:"assets/Environment/skyscraper.png"},
		{id:"tree",src:"assets/Environment/tree.png"},
		{id:"prizeIcon",src:"assets/prizeIcon.png"},
		{id:"buildIcon",src:"assets/buildIcon.png"},
		{id:"buildPaletteFinal",src:"assets/buildPaletteFinal.png"},
		{id:"mainUIBar",src:"assets/mainUIBar.png"},
		{id:"mapIcon",src:"assets/mapIcon.png"},
		{id:"prizeIcon",src:"assets/prizeIcon.png"},
		{id:"interimBackground",src:"assets/interimBackground.png"}], true);


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
	buttonContainer = new createjs.Container();
	buttonContainer.name = "buttons";
	prizeContainer = new createjs.Container();
	prizeContainer.name = "prize";
	palletContainer = new createjs.Container();
	palletContainer.name = "PalletContainer";
	stage.addChild(palletContainer);
    palletContainer.x = canvasWidth + bpWidth;
    
	mapContainer = new createjs.Container();
	mapContainer.name = "maps";

	worldContainer = new createjs.Container();
	worldContainer.name = "WorldContainer";
	stage.addChild(worldContainer);
	//worldContainer.x = canvasWidth - bpWidth;
}

function InitializeInventory()
{
   	var item1 = new Item();
	item1.init();

    //inventory = new Inventory();
	//inventory.init();
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

function handleComplete(event) {
	InitializeContainers();
	makeBg();
	initializeUIBar();
	initializeBuildPallet();
	initializeBuildButton();
	initializeMapBackground();
	initializeMapButton();
	initializeMaps();
	initializePrizeBackground();
	initializePrizeButton();
	InitializeInventory();
	createjs.Ticker.addEventListener("tick",tick);
}

function tick(event) {
	stage.update();
}

function makeBg () {
	//Draws initial background
	var bpm = new createjs.Bitmap(queue.getResult("interimBackground"));
	
	//scale BG to fit screen
	bgScaleY = canvasHeight/bpm.getBounds().height;
	bgScaleX = canvasWidth/bpm.getBounds().width;

	bpm.scaleY = bgScaleY;
	bpm.scaleX = bgScaleX;

	stage.addChild(bpm);
	//stage.update();
}

function initializeMapButton() {
	var mb = new createjs.Bitmap(queue.getResult("mapIcon"));
	stage.addChild(mb);
	mb.y = mb.getBounds().height/4;
	mb.x = UIOffset;
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


function initializeBuildPallet () {
	//makes build pallet and moves it into position off screen on the right.
	var bp = new createjs.Bitmap(queue.getResult("buildPaletteFinal"));

	//takes 20% of screen width when open
	bpWidth = 0.25* canvasWidth;
	bpHeight = canvasHeight - UIBarHeight;

	newScaleX = bpWidth/bp.getBounds().width;
	newScaleY = bpHeight/bp.getBounds().height;

	bp.scaleX = newScaleX;
	bp.scaleY = newScaleY;

	bp.name = "buildPallet";
	stage.addChild(bp);
	bp.x = canvasWidth + (bp.getBounds().width*newScaleX);
	bp.y = UIBarHeight;
	//createjs.Tween.get(bp,{loop:false}).to({x:430},300);
}

function initializeUIBar () {
	var UIBar = new createjs.Bitmap(queue.getResult("mainUIBar"));
	stage.addChild(UIBar);
	UIBar.x = 0;
	UIBarHeight = UIBar.getBounds().height;
}

function initializeBuildButton() {
	var bb = new createjs.Bitmap(queue.getResult("buildIcon"));
	stage.addChild(bb);
	bb.name = "buildButton";
	bbWidth = bb.getBounds().width; //store width of build button for later positioning
	bb.x = canvasWidth - bb.getBounds().width - UIOffset;
	bb.y = bb.getBounds().height/4;
	bb.addEventListener("click", moveBuildUI);
}

function moveBuildUI(event) 
{
	console.log("hit build button");

	//palletContainer.x = canvasWidth + bpWidth;

	//Opens and closes the build UI
	//Get a referrence to the buildPallet display object
	var pallet;
	pallet = stage.getChildByName("buildPallet");
	//If the build pallet is opened, close it
	//If the build pallet is closed, open it
	if(buildPalletOpened)
	{
		createjs.Tween.get(event.target,{loop:false}).to({x:canvasWidth - bbWidth},300);
		createjs.Tween.get(pallet,{loop:false}).to({x:canvasWidth + bpWidth},300);
		createjs.Tween.get(palletContainer,{loop:false}).to({x:canvasWidth + bpWidth},300);
	} else 
	{
		createjs.Tween.get(event.target,{loop:false}).to({x:canvasWidth - bbWidth},300);
		createjs.Tween.get(pallet,{loop:false}).to({x:canvasWidth - bpWidth},300);
		createjs.Tween.get(palletContainer,{loop:false}).to({x:canvasWidth - bpWidth},300);
	}

	buildPalletOpened = !buildPalletOpened;
}

// function PositionPalletContainer()
// {
// 	inventory.PositionContainer();
// }

   

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
	//bgScaleY = canvasHeight/prizeBG.getBounds().height;
	//bgScaleX = canvasWidth/prizeBG.getBounds().width;

	prizeBG.scaleY = bgScaleY;
	prizeBG.scaleX = bgScaleX;
	prizeContainer.addChild(prizeBG);
}

function initializePrizeButton () {
	var pb = new createjs.Bitmap(queue.getResult("prizeIcon"));
	stage.addChild(pb);
	//pb.x = canvasWidth/2 - (pb.getBounds().width/2);
	pb.x = stage.getChildByName("buildButton").x - pb.getBounds().width - UIOffset;
	pb.y = pb.getBounds().height/4;
	pb.addEventListener("click",enterPrizeCode);
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
	var userInput = prompt('Enter prize code.');
	if(checkPrizeCode(userInput)) {
		//Open prize screen if a valid prize code is entered
		movePrizeUI();
	} else {
		alert("Invalid prize code.");
	}
}

function checkPrizeCode (prizeCode) {
	//Returns true for a valid prize code
	for(i = 0; i < prizeCodes.length; i++) {
		var currentCode = prizeCodes[i];
		if(prizeCode == currentCode) {
			return true;
		}
	}
	return false;
}

//Game resize code
//Aspect Ratio: 9:16

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

var stage;
var mapContainer;
var buttonContainer;
var prizeContainer;
var worldContainer;
//for 560x960 px backgrounds
var bgScaleX; 
var bgScaleY;
var bbWidth; //width of build button
var bpWidth; //width of pallet
var canvasWidth;
var canvasHeight;
var queue;
var mapOpened;
var prizeScreenOpened;
var trophyCase;
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
	redeemTrophies = [
	3,
	9,
	1
	];
	queue.loadManifest([
		//scripts
		{id:"TrophyCase", src:"TrophyCase.js"},
		{id:"Trophy", src:"Trophy.js"},
		//Trophies
		{id:"mediumTrophy", src:"assets/mediumTrophy.png"},
		{id:"largeTrophy", src:"assets/largeTrophy.png"},
		{id:"Trophy", src:"Trophy.js"},
		//UI and stuff
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
		{id:"buildPaletteFinal",src:"assets/buildPaletteFinal.png"},
		{id:"mainUIBar",src:"assets/mainUIBar.png"},
		{id:"mapIcon",src:"assets/mapIcon.png"},
		{id:"prizeIcon",src:"assets/prizeIcon.png"},
		{id:"buildIcon",src:"assets/buildIcon.png"},
		{id:"buildPaletteFinal",src:"assets/buildPaletteFinal.png"},
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
    
	mapContainer = new createjs.Container();
	mapContainer.name = "maps";

	worldContainer = new createjs.Container();
	worldContainer.name = "WorldContainer";
	stage.addChild(worldContainer);
	worldContainer.x = canvasWidth - bpWidth;
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

function handleComplete(event) {
	InitializeContainers();
	makeBg();
	initializeUIBar();
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
		createjs.Tween.get(buttonContainer,{loop:false}).to({x:-540},300);
		createjs.Tween.get(mapContainer,{loop:false}).to({x:-540},300).call(ReAppearItems);
	} else {
		trophyCase.SetAllItemsAlpha(0);
		createjs.Tween.get(buttonContainer,{loop:false}).to({x:0},300);
		createjs.Tween.get(mapContainer,{loop:false}).to({x:0},300);
	}
	mapOpened = !mapOpened;
}

	function ReAppearItems()
	{
		trophyCase.SetAllItemsAlpha(1);
	}

function initializeUIBar () {
	var UIBar = new createjs.Bitmap(queue.getResult("mainUIBar"));
	stage.addChild(UIBar);
	UIBar.x = 0;
	UIBarHeight = UIBar.getBounds().height;
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
	//bb.x = canvasWidth - bb.getBounds().width - UIOffset;
	pb.x = canvasWidth - pb.getBounds().width - UIOffset;
	pb.y = pb.getBounds().height/4;
	pb.addEventListener("click",enterPrizeCode);
	//pb.addEventListener("click",movePrizeUI);
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

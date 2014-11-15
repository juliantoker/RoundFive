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
		{id:"shelf", src:"assets/shelf.png"},
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

	//testing
	galleryContainer.addChild(galleryBG);


 	buttonContainer = new createjs.Container();
	buttonContainer.name = "buttons";
	prizeContainer = new createjs.Container();
	prizeContainer.name = "prize";
	

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
	stage.addChild(galleryBG); //gallery is on top of BG when it is opened
	galleryBG.visible = false; //hide it on top
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
		createjs.Tween.get(galleryContainer,{loop:false}).to({y:0},300).call(OpenGallery);
		//createjs.Tween.get(galleryContainer,{loop:false}).to({x:0},canvasHeight/2);

		galleryOpened = true;
	}
}

function OpenGallery()
{
	galleryBG.visible = true;
	gb.visible = !gb.isVisible();
	closegb.visible = true;
}

function moveGalleryOut (event) {

	console.log("Gallery OUT");

	if(galleryOpened) 
	{
		
		//createjs.Tween.get(trophyContainer,{loop:false}).to({x:-540},300);
		//createjs.Tween.get(galleryContainer,{loop:false}).to({x:0},canvasHeight*3);
		createjs.Tween.get(galleryContainer,{loop:false}).to({y:-canvasHeight*3},300).call(CloseGallery);

		galleryOpened = false;
	} 
}

function CloseGallery()
{
	galleryBG.visible = false;
	gb.visible = true;
	closegb.visible = false;
}

function initializeMapBackground() {
	buttonContainer.x = -canvasWidth;

	
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

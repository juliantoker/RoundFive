
// document.addEventListener('touchmove', function(e) {
// 	e.preventDefault();
// }, false);

function Item(num) {

	this.inWorld = false;
	this.isTouched = false;
	this.num = num;
	this.onButtonPress = false;
	this.inventoryPos = 0;
	var loadString = "";
	var sprite;

    /**
     * Turn off mouse interaction like "hover".
     */
    //SkipButton.prototype.disableMouseInteraction = function() {
        // Disable mouse over as we do not use it within the game.
   //stage.enableMouseOver(0);
   // };

   this.init = function(position) 
   {
   		inventoryPos = position;
   		GetSprite();

   };

	function GetSprite()
	{
		loadString = itemPool.GetString(num);
		console.log ("drawing : " + loadString);
		sprite = new createjs.Bitmap(queue.getResult(loadString));

		//each slot in the build pallet is screenheight/9

		var desiredHeight = canvasHeight/10; //making it a little smaller
		var currentHeight = sprite.getBounds().height;

		var scaleY = (canvasHeight/10)/sprite.getBounds().height;
		var scaleX = (canvasHeight/10)/sprite.getBounds().width;

		sprite.scaleY = scaleY;
		sprite.scaleX = scaleX;

		var pallet;
		pallet = stage.getChildByName("buildPallet");

		sprite.x = pallet.x/2;
		sprite.y = (inventoryPos*(canvasHeight/10));
		stage.addChild(sprite);

		// sprite.addEventListener("click", handleClick);
 		sprite.addEventListener("mousedown", handlePress);
 		sprite.addEventListener("mouseup", handleMouseUp);
	
	};

	// function handleClick(event)
	// {
 //    	console.log("clicked");
 // 	}

 	function handlePress(event) 
 	{
     // A mouse press happened.
     // Listen for mouse move while the mouse is down:
     event.addEventListener("mousemove", handleMove);
 	};

  	function handleMove(event) 
  	{
     	event.target.x = event.stageX;
    	event.target.y = event.stageY;
 	};

 	function handleMouseUp(event) {
  	stage.removeEventListener("stagemousemove", handleMouseMove);
	};

	this.PrintID = function() 
    {
        //console.log("ID:" + this.num);
	};
}
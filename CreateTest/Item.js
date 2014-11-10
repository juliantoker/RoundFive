
// document.addEventListener('touchmove', function(e) {
// 	e.preventDefault();
// }, false);

function Item(num) {

	this.isTouched = false;
	this.num = num;
	this.onButtonPress = false;
	this.inventoryPos = 0;
	var loadString = "";
	var sprite;
	var inWorld = false;

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
   		AssignSprite();

   };

   	//assigns a sprite to add to the item
	function AssignSprite()
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

		// var pallet;
		// pallet = stage.getChildByName("buildPallet");

		//sprite.x = canvasWidth + bpWidth;
		//sprite.x = canvasWidth + bpWidth;
		sprite.y = (inventoryPos*(canvasHeight/10));
		//stage.addChild(sprite);

		// // sprite.addEventListener("click", handleClick);
 	 	sprite.addEventListener("mousedown", handlePress);
 	// 		sprite.addEventListener("mouseup", handleMouseUp)
 	// 	};
 		

 		var container;
		container = stage.getChildByName("PalletContainer");

 		container.addChild(sprite);			

	};

	//retrieves the sprite 
	this.ReturnSprite = function()
	{
		console.log("i am an element");
		return sprite;
	};

	// function handleClick(event)
	// {
 //    	console.log("clicked");
 // 	}

 	function handlePress(event) 
 	{
 		console.log("touch me");
     // A mouse press happened.
     // Listen for mouse move while the mouse is down:
     	event.addEventListener("mousemove", handleMove);
     	event.addEventListener("mouseup", handleMouseUp);
 	};

  	function handleMove(event) 
  	{
     //  	event.target.x = event.stageX;
    	// event.target.y = event.stageY;

    	if(!inWorld)
    	{
    		sprite.x = event.stageX - palletContainer.x;
    		sprite.y = event.stageY - palletContainer.y;	
    	}
    	else
    	{
    		sprite.x = event.stageX - worldContainer.x;
    		sprite.y = event.stageY - worldContainer.y;	
    	}

    	
 	};

 	//release sprite into the world
 	function handleMouseUp(event) 
 	{
 		if(!inWorld)
 		{
 			console.log("Removing from container");
  			stage.removeEventListener("mousemove", handleMove);
  			if(sprite.x < (0.75*canvasWidth))
  			{

  				inWorld = true;
  				var container;
				container = stage.getChildByName("PalletContainer");

 				container.removeChild(sprite);

 				worldContainer.addChild(sprite);
				console.log("Added succesfully");
  			}
 		}	
	};

	this.PrintID = function() 
    {
        //console.log("ID:" + this.num);
	};
}
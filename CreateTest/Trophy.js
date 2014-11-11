

function Trophy(num) {

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

		sprite.x = canvasWidth - bbWidth;
		sprite.y = (inventoryPos+4)*(canvasHeight/10);
		//sprite.y = (inventoryPos*(canvasHeight/10));
		//stage.addChild(sprite);

		// // sprite.addEventListener("click", handleClick);
 	 	sprite.addEventListener("mousedown", handlePress);
 	// 		sprite.addEventListener("mouseup", handleMouseUp)
 	// 	};
 		
 		var container;
		container = stage.getChildByName("PalletContainer");

 		container.addChild(sprite);	
 		stage.addChild(sprite);		

 		console.log("Drawn static item");
	};

	//retrieves the sprite 
	this.ReturnSprite = function()
	{
		console.log("i am an element");
		return sprite;
	};

	//function SetAlpha(val)
	this.SetAlpha = function(val)
 	{
 		console.log("static setting : " + val);
 		sprite.alpha = val;
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

    	if(!this.inWorld)
    	{
    		sprite.x = event.stageX;
    		sprite.y = event.stageY;
    	}
    	else
    	{
    		sprite.x = event.stageX;
    		sprite.y = event.stageY;
    	}

    	
 	};

 	//release sprite into the world
 	function handleMouseUp(event) 
 	{
 		if(!this.inWorld)
 		{
 			console.log("Removing from container");
  			stage.removeEventListener("mousemove", handleMove);
  			if(sprite.x < (0.75*canvasWidth))
  			{

  				this.inWorld = true;
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
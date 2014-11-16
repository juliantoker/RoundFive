function TrackTrophy(rowNo, colNo) {


	var inventoryPos = 0;
	var loadString = "";
	//console.log("canvas height : " + canvasHeight + " height : " + shelfHeight);
	var rowNo = rowNo; 
	var colNo = colNo; 
	var sprite;
	var largeTrophyNo;

	var type;

	//*********************************************************************************
	var filters = [new createjs.ColorFilter(0,0,0,0.5), new createjs.ColorFilter(1,1,0,1)];
        var index = 0;
 
   //*********************************************************************************    

    /**
     * Turn off mouse interaction like "hover".
     */
    //SkipButton.prototype.disableMouseInteraction = function() {
        // Disable mouse over as we do not use it within the game.
   //stage.enableMouseOver(0);
   // };

   this.init = function(trophyType) 
   {
   		//this.inPos = position;
   		//inventoryPos = this.inPos;
   		//console.log("inventory pos : " + inventoryPos);
   		type = trophyType;
   		AssignSprite();
   };

   this.init = function(trophyType, LargeTrophyNo) 
   {
   		//this.inPos = position;
   		//inventoryPos = this.inPos;
   		//console.log("inventory pos : " + inventoryPos);
   		type = trophyType;
   		largeTrophyNo = LargeTrophyNo;
   		AssignSprite();
   };

   	//assigns a sprite to add to the item
	function AssignSprite()
	{
		//only works with string specified, not from loading queue
		if(type == "Large")
			sprite = new createjs.Bitmap("assets/largeTrophy.png");
		else
			sprite = new createjs.Bitmap("assets/mediumTrophy.png");

		sprite.image.onload = function () {
                sprite.cache(0, 0, this.width, this.height);
                trackContainer.addChild(sprite);
                sprite.filters = [filters[0]];
            	sprite.updateCache();
            }

		trackContainer.addChild(sprite);

		if(type == "Large")
			desiredWidth = (canvasWidth)/4;
		else
			desiredWidth = (canvasWidth)/6;

		var scaleY = (desiredWidth)/sprite.getBounds().height;
		var scaleX = (desiredWidth)/sprite.getBounds().width;

		sprite.scaleY = scaleY;
		sprite.scaleX = scaleX;

		sprite.x = colNo * desiredWidth;
		
		sprite.y = (rowNo*shelfDistance)+UIBarHeight + shelfSize/3;

		sprite.addEventListener("mousedown", handlePress);
 	 	//sprite.addEventListener("mouseup", handleMouseUp);


 		//console.log("Drawn static item : " + shelfPos);
	};

	this.ColorSprite = function()
	{
		sprite.cache(0, 0, this.width, this.height);
        sprite.filters = [filters[1]];
        sprite.updateCache();
	};

	//function SetAlpha(val)
	this.SetAlpha = function(val)
 	{
 		console.log("static setting : " + val);
 		sprite.alpha = val;
 	};

 	function handlePress(event) 
 	{
 		console.log("touched track trophy");

 		if(!galleryOpened)
 		{
 			if(type != "Large") //small trophy opens map
 			{
 				openMapToFloor(3); //0 corresponds to floor 1, 1-2, 2-3, 3-5	
 			}
 			else //large trophy opens track
 			{
 				console.log("Large trophy no : " + largeTrophyNo);
 			}
 			
 		}
     		
 	};

	// function handleClick(event)
	// {
 //    	console.log("clicked");
 // 	}

 // 	function handlePress(event) 
 // 	{
 // 		console.log("touch me");
 //     // A mouse press happened.
 //     // Listen for mouse move while the mouse is down:
 //     	event.addEventListener("mousemove", handleMove);
 //     	event.addEventListener("mouseup", handleMouseUp);
 // 	};

 //  	function handleMove(event) 
 //  	{
 //     //  	event.target.x = event.stageX;
 //    	// event.target.y = event.stageY;

 //    	if(!this.inWorld)
 //    	{
 //    		sprite.x = event.stageX;
 //    		sprite.y = event.stageY;
 //    	}
 //    	else
 //    	{
 //    		sprite.x = event.stageX;
 //    		sprite.y = event.stageY;
 //    	}

    	
 // 	};

 // 	//release sprite into the world
 // 	function handleMouseUp(event) 
 // 	{
 // 		// if(!this.inWorld)
 // 		// {
 // 		// 	console.log("Removing from container");
 //  	// 		stage.removeEventListener("mousemove", handleMove);
 //  	// 		if(sprite.x < (0.75*canvasWidth))
 //  	// 		{

 //  	// 			this.inWorld = true;
 //  	// 			var container;
	// 		// 	container = stage.getChildByName("PalletContainer");

 // 		// 		container.removeChild(sprite);

 // 		// 		worldContainer.addChild(sprite);
	// 		// 	console.log("Added succesfully");
 //  	// 		}
 // 		// }	
	// };

	// this.PrintID = function() 
 //    {
 //        //console.log("ID:" + this.num);
	// };
}
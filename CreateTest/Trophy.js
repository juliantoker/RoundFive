

function Trophy(rowNo, colNo) {

	this.inWorld = false;
	this.isTouched = false;
	//this.num = num;
	this.onButtonPress = false;
	
	this.inPos;
	var inventoryPos = 0;
	var loadString = "";
	var shelfHeight = (canvasHeight - UIBarHeight)/6;
	console.log("canvas height : " + canvasHeight + " height : " + shelfHeight);
	var rowNo = rowNo; 
	var colNo = colNo; 
	var sprite;

    /**
     * Turn off mouse interaction like "hover".
     */
    //SkipButton.prototype.disableMouseInteraction = function() {
        // Disable mouse over as we do not use it within the game.
   //stage.enableMouseOver(0);
   // };

   this.init = function() 
   {
   		//this.inPos = position;
   		//inventoryPos = this.inPos;
   		console.log("inventory pos : " + inventoryPos);
   		AssignSprite();

   };

   	//assigns a sprite to add to the item
	function AssignSprite()
	{
		//loadString = trophyPool.GetString(num);
		//sprite = new createjs.Bitmap(queue.getResult(loadString));
		//if(inventoryPos < 4)
			sprite = new createjs.Bitmap(queue.getResult("mediumTrophy"));
		// else
		// 	sprite = new createjs.Bitmap(queue.getResult("largeTrophy"));

		

		//each slot in the build pallet is screenheight/9

		// var desiredHeight = canvasHeight/10; //making it a little smaller
		// var currentHeight = sprite.getBounds().height;

		// var scaleY = (canvasHeight/10)/sprite.getBounds().height;
		// var scaleX = (canvasHeight/10)/sprite.getBounds().width;

		desiredWidth = (canvasWidth)/6;

		// if(inventoryPos < 4)
		// {
		// 	desiredWidth = (canvasWidth)/6;
		// }
		// else
		// {
		// 	desiredWidth = canvasWidth/3;	
		// }

		var scaleY = (desiredWidth)/sprite.getBounds().height;
		var scaleX = (desiredWidth)/sprite.getBounds().width;

		sprite.scaleY = scaleY;
		sprite.scaleX = scaleX;

		 //var scaleY = (canvasHeight/10)/sprite.getBounds().height;
		// var scaleX = (canvasHeight/10)/sprite.getBounds().width;

		// sprite.scaleY = 0.6;
		// sprite.scaleX = 0.6;

		// var pallet;
		// pallet = stage.getChildByName("buildPallet");
		//console.log("Inventory pos : " + inventoryPos + " width : " + sprite.getBounds().width);

		//sprite.x = canvasWidth - bbWidth;
		// sprite.y = (inventoryPos)*(canvasHeight/10);

		//sprite.x = inventoryPos*sprite.getBounds().width/2;
		//if(inventoryPos < 4)
			sprite.x = canvasWidth*colNo/5;
		// else
		// 	sprite.x = canvasWidth - sprite.getBounds().width/2;

		sprite.y = (rowNo*shelfHeight)+UIBarHeight;

		// // sprite.addEventListener("click", handleClick);
 	 	//sprite.addEventListener("mousedown", handlePress);
 	// 		sprite.addEventListener("mouseup", handleMouseUp)
 	// 	};
 		
 	// 	var container;
		// container = stage.getChildByName("PalletContainer");

 	// 	container.addChild(sprite);	
 		stage.addChild(sprite);		

 		console.log("rowPos : " + rowNo);
 		console.log("colPos : " + colNo);


 		//console.log("Drawn static item : " + shelfPos);
	};

	// //retrieves the sprite 
	// this.ReturnSprite = function()
	// {
	// 	console.log("i am an element");
	// 	return sprite;
	// };

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
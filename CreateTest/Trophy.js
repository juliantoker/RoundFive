

function Trophy(rowNo, colNo) {

	this.inWorld = false;
	this.isTouched = false;
	//this.num = num;
	this.onButtonPress = false;
	
	this.inPos;
	var inventoryPos = 0;
	var loadString = "";
	//console.log("canvas height : " + canvasHeight + " height : " + shelfHeight);
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
   		//console.log("inventory pos : " + inventoryPos);
   		AssignSprite();

   };

   	//assigns a sprite to add to the item
	function AssignSprite()
	{
		//loadString = trophyPool.GetString(num);
		//sprite = new createjs.Bitmap(queue.getResult(loadString));
		//if(inventoryPos < 4)
		sprite = new createjs.Bitmap(queue.getResult("mediumTrophy"));

		//tro = tropyContainer;

		// tropyContainer = stage.getChildByName("tropyContainer");
		trophyContainer.addChild(sprite);
		// else
		// 	sprite = new createjs.Bitmap(queue.getResult("largeTrophy"));

		desiredWidth = (canvasWidth)/6;

		var scaleY = (desiredWidth)/sprite.getBounds().height;
		var scaleX = (desiredWidth)/sprite.getBounds().width;

		sprite.scaleY = scaleY;
		sprite.scaleX = scaleX;

		sprite.x = colNo * desiredWidth;
		//sprite.x = canvasWidth*colNo/5;
		// else
		// 	sprite.x = canvasWidth - sprite.getBounds().width/2;
		//var shelfHeight = shelfDistance;

		sprite.y = (rowNo*shelfDistance)+UIBarHeight + shelfSize/3;

 		console.log("sprite x : " + sprite.x);
 		console.log("sprite y : " + sprite.y);


 		//console.log("Drawn static item : " + shelfPos);
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


function TrophyAnimated(num) {

	var imgMonsterARun = new Image();
	this.isTouched = false;
	this.num = num;
	this.onButtonPress = false;
	this.inventoryPos = 0;
	var loadString = "";
	var sprite;
	var inWorld = false;
	var bmpAnimation;

   this.init = function(position) 
   {
   		
   		canvas = document.getElementById("myCanvas");
   		inventoryPos = position;
   		
   		//AssignSprite();
   		
   		imgMonsterARun.onload = createjs.handleImageLoad;
    	imgMonsterARun.onerror = createjs.handleImageError;
    	imgMonsterARun.src = "assets/MonsterARun.png";

    	var spriteSheet = new createjs.SpriteSheet({
    	// image to use
    	images: [imgMonsterARun], 
    	// width, height & registration point of each sprite
    	frames: {width: 64, height: 64, regX: 32, regY: 32}, 
    	animations: {    
        	walk: [0, 9, "walk"]
    	}
		});

    	// create a BitmapAnimation instance to display and play back the sprite sheet:
		bmpAnimation = new createjs.BitmapAnimation(spriteSheet);

		// start playing the first sequence:
		bmpAnimation.gotoAndPlay("walk");     //animate
    
		// set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
		// of animated rats if you disabled the shadow.
		//bmpAnimation.shadow = new createjs.Shadow("#454", 0, 5, 4);

		bmpAnimation.name = "monster1";
		bmpAnimation.direction = 90;
		bmpAnimation.vX = 4;

		//bmpAnimation.x = canvasWidth/2;
		if(inventoryPos == 0)
		{
			console.log("Inventory pos : " + inventoryPos);
			bmpAnimation.x = canvasWidth - bbWidth;
			bmpAnimation.y = ((inventoryPos+1.5)*(canvasHeight/4));
			//bmpAnimation.y = canvasHeight - (inventoryPos*(canvasHeight/4));
		}
		else if(inventoryPos == 1)
		{
			console.log("Inventory pos : " + inventoryPos);
			bmpAnimation.x = canvasWidth - bbWidth;
			bmpAnimation.y = ((inventoryPos)*(canvasHeight/4));
		}


		// var scaleY = (canvasHeight/10)/bmpAnimation.getBounds().height;
		// var scaleX = (canvasHeight/10)/bmpAnimation.getBounds().height;

		// bmpAnimation.scaleX = scaleX;
		// bmpAnimation.scaleY = scaleY;
        
		bmpAnimation.addEventListener("mousedown", handlePress);

		// var container;
		// container = stage.getChildByName("PalletContainer");

 	// 	container.addChild(bmpAnimation);

 		// have each monster start at a specific frame
		bmpAnimation.currentFrame = 0;
		stage.addChild(bmpAnimation);

 		//You can move the spritesheet using tick

 		// createjs.Ticker.addEventListener("tick", tick);
 		// createjs.Ticker.setFPS(15);

 	console.log("reached this popint");
   		
   };

   this.SetAlpha = function(val)
 	{
 		console.log("setting : " + val);
 		bmpAnimation.alpha = val;
 	};


   	//assigns a sprite to add to the item
	function AssignSprite()
	{
		// loadString = itemPool.GetString(num);
		// console.log ("drawing : " + loadString);
		// sprite = new createjs.Bitmap(queue.getResult(loadString));

		// //each slot in the build pallet is screenheight/9

		// var desiredHeight = canvasHeight/10; //making it a little smaller
		// var currentHeight = sprite.getBounds().height;

		// var scaleY = (canvasHeight/10)/sprite.getBounds().height;
		// var scaleX = (canvasHeight/10)/sprite.getBounds().width;

		// sprite.scaleY = scaleY;
		// sprite.scaleX = scaleX;

		// sprite.y = (inventoryPos*(canvasHeight/9));

 	//  	sprite.addEventListener("mousedown", handlePress);

 	// 	var container;
		// container = stage.getChildByName("PalletContainer");

 	// 	container.addChild(sprite);			

	};

	//retrieves the sprite 
	this.ReturnSprite = function()
	{
		console.log("i am an element");
		return sprite;
	};

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
		bmpAnimation.x = event.stageX;
    	bmpAnimation.y = event.stageY;

    	// if(!inWorld)
    	// {
    	// 	bmpAnimation.x = event.stageX - palletContainer.x;
    	// 	bmpAnimation.y = event.stageY - palletContainer.y;	
    	// }
    	// else
    	// {
    	// 	bmpAnimation.x = event.stageX - worldContainer.x;
    	// 	bmpAnimation.y = event.stageY - worldContainer.y;	
    	// }
 	};

 	//release sprite into the world
 	function handleMouseUp(event) 
 	{
 		if(!inWorld)
 		{
 			console.log("Removing from container");
  			stage.removeEventListener("mousemove", handleMove);
  			if(bmpAnimation.x < (0.75*canvasWidth))
  			{

  				inWorld = true;
  		// 		var container;
				// container = stage.getChildByName("PalletContainer");

 			// 	container.removeChild(bmpAnimation);

 			// 	worldContainer.addChild(bmpAnimation);
 			// 	stage.addChild(bmpAnimation);
				// console.log("Added succesfully");
  			}
 		}	
	};

	this.PrintID = function() 
    {
        //console.log("ID:" + this.num);
	};
}

//    function tick() {
//     // Hit testing the screen width, otherwise our sprite would disappear
//     if (bmpAnimation.x >= canvasWidth - 16) {
//         // We've reached the right side of our screen
//         // We need to walk left now to go back to our initial position
//         bmpAnimation.direction = -90;
//     }

//     if (bmpAnimation.x < 16) {
//         // We've reached the left side of our screen
//         // We need to walk right now
//         bmpAnimation.direction = 90;
//     }

//     // Moving the sprite based on the direction & the speed
//     if (bmpAnimation.direction == 90) {
//         bmpAnimation.x += bmpAnimation.vX;
//     }
//     else {
//         bmpAnimation.x -= bmpAnimation.vX;
//     }

//     console.log("running");
//     // update the stage:
//     stage.update();
// }

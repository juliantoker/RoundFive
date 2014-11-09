
// document.addEventListener('touchmove', function(e) {
// 	e.preventDefault();
// }, false);

function Item(num) {

	this.inWorld = false;
	this.isTouched = false;
	this.num = num;
	this.onButtonPress = false;
	var loadString = "";
	var sprite;

    /**
     * Turn off mouse interaction like "hover".
     */
    //SkipButton.prototype.disableMouseInteraction = function() {
        // Disable mouse over as we do not use it within the game.
   //stage.enableMouseOver(0);
   // };

   this.init = function() {

   GetSprite();

   };

	function GetSprite()
	{
		loadString = itemPool.GetString(num);
		console.log ("drawing : " + loadString);
		sprite = new createjs.Bitmap(queue.getResult(loadString));
		
		sprite.scaleX = bgScaleX/2;
		sprite.scaleY = bgScaleY/2;

		sprite.x = canvasWidth/2;
		sprite.y = canvasHeight/2;
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
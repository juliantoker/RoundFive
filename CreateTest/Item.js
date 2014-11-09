
// document.addEventListener('touchmove', function(e) {
// 	e.preventDefault();
// }, false);

function Item(num) {

	this.inWorld = false;
	this.isTouched = false;
	this.num = num;
	this.onButtonPress = false;
	var sprite;

    /**
     * Turn off mouse interaction like "hover".
     */
    //SkipButton.prototype.disableMouseInteraction = function() {
        // Disable mouse over as we do not use it within the game.
   //stage.enableMouseOver(0);
   // };

	this.GetSprite = function()
	{
		sprite = new createjs.Bitmap(queue.getResult("catman"));
		
		sprite.scaleX = bgScaleX;
		sprite.scaleY = bgScaleY;

		sprite.x = canvasWidth/2;
		sprite.y = canvasHeight/2;
		stage.addChild(sprite);

		//createjs.Touch.enable(stage);
		//catman.addEventListener("pressmove",this.dance);
		//catman.addEventListener("pressup",this.stopDance);

		sprite.addEventListener("click", handleClick);
 		sprite.addEventListener("mousedown", handlePress);
 		sprite.addEventListener("mouseup", handleMouseUp);
	
	}

	function handleClick(event)
	{
    	console.log("clicked");
 	}

 	function handlePress(event) 
 	{
     // A mouse press happened.
     // Listen for mouse move while the mouse is down:
     event.addEventListener("mousemove", handleMove);
 	}

  	function handleMove(event) 
  	{
     	event.target.x = event.stageX;
    	event.target.y = event.stageY;
 	}

 	function handleMouseUp(event) {
  	stage.removeEventListener("stagemousemove", handleMouseMove);
	}

	// this.dance = function(evt)
	// {	
	// 	// catman.x = 0;
	// 	// catman.y = canvasHeight/2;

	// 	evt.target.x = evt.stageX;
 //    	evt.target.y = evt.stageY;

 //        // Disable mouse over as we do not use it within the game.
                
	// }

	// this.stopDance = function(evt)
	// {
	// 	//stage.enableMouseOver(0);
	// }
	

	this.PrintID = function() 
    {
        //console.log("ID:" + this.num);
	};
}
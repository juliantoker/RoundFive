

function Tutorial() {

	this.inWorld = false;
	this.isTouched = false;
	//this.num = num;
	this.onButtonPress = false;
	
	this.inPos;
	var inventoryPos = 0;
	var loadString = "";
	
	var index = index;
	var currentFrame = 0;
	var sprite;

	var tutLength  = 13; //15 frames
	var frames = [];

    /**
     * Turn off mouse interaction like "hover".
     */
    //SkipButton.prototype.disableMouseInteraction = function() {
        // Disable mouse over as we do not use it within the game.
   //stage.enableMouseOver(0);
   // };

   this.init = function() 
   {
   		for(var i = 0; i < tutLength; i++)
   		{
   			var sprite = new createjs.Bitmap(queue.getResult("tutorial" + i));
   			frames[i] = sprite;
   		}

   };

   this.ShowFrame = function(num)
   {
   		// if(num > 0)
   		// 	tutorialContainer.removeChildAt(num-1);

   		tutorialContainer.removeAllChildren();

   		currentFrame = num;

   		sprite = frames[currentFrame];

   		tutorialContainer.addChild(sprite);

		var desiredWidth = (canvasWidth);

		var scaleY;
		var scaleX;

		if(currentFrame == 2 || currentFrame == 3) //This is the tracks screen
		{
			sprite.x = canvasWidth/2 - desiredWidth/3;
			sprite.y = canvasHeight/2 + desiredWidth*0.25;

			scaleY = (desiredWidth/1.5)/sprite.getBounds().height;
			scaleX = (desiredWidth/1.5)/sprite.getBounds().width;
		}
		else if(currentFrame == 5 || currentFrame == 6) 
		{
			sprite.x = canvasWidth/2 - desiredWidth/3;
			sprite.y = canvasHeight/2 - desiredWidth*0.4;

			scaleY = (desiredWidth/1.5)/sprite.getBounds().height;
			scaleX = (desiredWidth/1.5)/sprite.getBounds().width;
		}
		else if(currentFrame == 8) 
		{
			sprite.x = canvasWidth/1.75 - desiredWidth/2;
			sprite.y = canvasHeight/1.75 - desiredWidth;

			scaleY = (desiredWidth/1.75)/sprite.getBounds().height;
			scaleX = (desiredWidth/1.75)/sprite.getBounds().width;
		}
		else if(currentFrame == 10) 
		{
			sprite.x = canvasWidth - desiredWidth*0.6;
			sprite.y = canvasHeight/1.75 - desiredWidth*0.8;

			scaleY = (desiredWidth/1.75)/sprite.getBounds().height;
			scaleX = (desiredWidth/1.75)/sprite.getBounds().width;
		}
		else if(currentFrame == 11 || currentFrame == 12) 
		{
			sprite.x = canvasWidth/2 - desiredWidth/3;
			sprite.y = canvasHeight/1.75 - desiredWidth*0.8;

			scaleY = (desiredWidth/1.5)/sprite.getBounds().height;
			scaleX = (desiredWidth/1.5)/sprite.getBounds().width;
		}
		else
		{
			sprite.x = canvasWidth/2 - desiredWidth/2;
			sprite.y = canvasHeight/2 - desiredWidth/2;	

			scaleY = (desiredWidth)/sprite.getBounds().height;
			scaleX = (desiredWidth)/sprite.getBounds().width;
		}

		sprite.scaleY = scaleY;
		sprite.scaleX = scaleX;

		 if(num < tutLength)
			sprite.addEventListener("click",this.CleanUp);
   };

   this.CleanUp = function()
   {
   		currentFrame++;
   		tutorialContainer.removeAllChildren();

   		if(currentFrame == 5 || currentFrame == 7 || currentFrame == 12) //5th frame is for an event
   			return;

   		if(currentFrame == 11)
   		{
   			moveMapUI();
   			return;
   		}
   			

   		if(currentFrame < tutLength)
   			ShowNextTutorialFrame(currentFrame);
   		else
   		{
   			tutorialViewed = true;
   			isTutorialSequenceOver = true;
   			sessionStorage.setItem("tutorialViewed", true);
   			console.log("getting that shit : " + sessionStorage.getItem("tutorialViewed"));
   		}
   }

   this.NextFrame = function()
   {
   		console.log("clicked tut");
   		currentFrame++;
   		sprite.removeEventListener("click",this.NextFrame);
   		//this.ShowFrame(currentFrame);
   };
}
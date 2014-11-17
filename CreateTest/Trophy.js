

function Trophy(rowNo, colNo, index) {

	this.inWorld = false;
	this.isTouched = false;
	//this.num = num;
	this.onButtonPress = false;
	
	this.inPos;
	var inventoryPos = 0;
	var loadString = "";
	var rowNo = rowNo; 
	var colNo = colNo; 
	var index = index;
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
   		console.log("index : " + index);
   		AssignSprite();

   };

   	//assigns a sprite to add to the item
	function AssignSprite()
	{

		var loadString = "trophy"+index;
		sprite = new createjs.Bitmap(queue.getResult(loadString));


		galleryContainer.addChild(sprite);


		desiredWidth = (canvasWidth)/5;

		var scaleY = (desiredWidth)/sprite.getBounds().height;
		var scaleX = (desiredWidth)/sprite.getBounds().width;

		sprite.scaleY = scaleY;
		sprite.scaleX = scaleX;

		sprite.x = colNo * desiredWidth;

		sprite.y = galleryShelfPositions[rowNo] - desiredWidth*0.9;
		//sprite.y = (rowNo*normalShelfDistance)+UIBarHeight + shelfSize/3;

	};

	//function SetAlpha(val)
	this.SetAlpha = function(val)
 	{
 		console.log("static setting : " + val);
 		sprite.alpha = val;
 	};
}
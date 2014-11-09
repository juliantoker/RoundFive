
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

function Item(num) {

	this.inWorld = false;
	this.isTouched = false;
	this.num = num;
	//console.log("ID:" + this.num);

	this.GetSprite = function()
	{
		var catman = new createjs.Bitmap(queue.getResult("catman"));
		
		catman.scaleX = bgScaleX;
		catman.scaleY = bgScaleY;

		catman.x = canvasWidth/2;
		catman.y = canvasHeight/2;
		stage.addChild(catman);
	}

	this.PrintID = function() 
    {
        //console.log("ID:" + this.num);
	};
}
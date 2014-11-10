

function Inventory() {
	
	var itemCount = 0;
	var itemPoolSize = 6;
	this.MyArray = [];
	
	this.init = function()
	{
		

		console.log("Inventory Built");
		
		itemPool = new ItemPool(itemPoolSize); //initialize an item pool of 6 objects
		//console.log("no of elements : " + itemPool.GetCount());
	
		var newArray = [];
		newArray = itemPool.GetItems(5); //gets 3 random numbers from the item pool

		for (var i = 0; i < newArray.length; i++) 
    	{
        	console.log("new item : " + newArray[i]);
        	var newItem = new Item(newArray[i]); //the new Item knows its number
        	this.MyArray[i] = newItem; //add it to inventory
        	//console.log("new item : " + this.MyArray[i].num);
        	this.MyArray[i].init(i); //initialize the 'item' element
    	}

    	//when all the items have been initalized and added to the container
    	//palletContainer.x = canvasWidth + bpWidth;

    	// for (var i = 0; i < this.MyArray.length; i++) 
    	// {
    	// 	//var element = this.MyArray[i];
    	// 	//var sprite = element.ReturnSprite();
    	// 	palletContainer.addChild(this.MyArray[i].ReturnSprite()); //add sprite of the item to the container
    	// } 
	};

	this.PositionContainer = function()
	{
		for(var i = 0; i < this.MyArray.length; i++)
		{
			var child = palletContainer.getChildAt(i);
			// child.x = 0;	
		}
		
	}

	//GetItems();

	this.RemoveFromInventory = function() 
    {
        console.log("called");
	};
}
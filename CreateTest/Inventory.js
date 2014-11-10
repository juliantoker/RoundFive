

function Inventory() {
	
	var itemCount = 0;
	var itemPoolSize = 20;
	this.MyArray = [];

	
	this.init = function()
	{
		console.log("Inventory Built");	
		itemPool = new ItemPool(itemPoolSize); //initialize an item pool of 6 objects
		this.PopulateInventory(9);
	};

	this.PopulateInventory = function(count)
	{
		var newArray = [];
		newArray = itemPool.GetItems(count); //gets 3 random numbers from the item pool

		for (var i = 0; i < newArray.length; i++) 
    	{
        	console.log("new item : " + newArray[i]);
        	var newItem = new Item(newArray[i]); //the new Item knows its number
        	this.MyArray[i] = newItem; //add it to inventory
        	//console.log("new item : " + this.MyArray[i].num);
        	this.MyArray[i].init(i); //initialize the 'item' element
    	}
	}

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
function Inventory() {
	
	var itemCount = 0;
	var itemPoolSize = 6;
	this.MyArray = [];

	this.init = function()
	{
		console.log("Inventory Built");

		itemPool = new ItemPool(itemPoolSize); //initialize an item pool of 6 objects
		console.log("no of elements : " + itemPool.GetCount());
	
		var newArray = [];
		newArray = itemPool.GetItems(3); //gets 3 random numbers from the item pool

		for (var i = 0; i < newArray.length; i++) 
    	{
        	 console.log("new item : " + newArray[i]);
        	var newItem = new Item(newArray[i]); //the new Item knows its number
        	this.MyArray[i] = newItem; //add it to inventory
        	//console.log("new item : " + this.MyArray[i].num);
        	this.MyArray[i].init();
    	}	
    	
	}

	//GetItems();

	this.RemoveFromInventory = function() 
    {
        console.log("called");
	};
}
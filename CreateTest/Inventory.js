function Inventory() {
	
	var itemCount = 0;
	var itemPool;
	var itemPoolSize = 6;
	this.MyArray = [];

	this.init = function()
	{
		console.log("Inventory Built");

		itemPool = new ItemPool(itemPoolSize); //initialize an item pool of 6 objects
		console.log("no of elements : " + itemPool.GetCount());
	
		var newArray = [];
		newArray = itemPool.GetItems(3);

		for (var i = 0; i < newArray.length; i++) 
    	{
        	// console.log("new item : " + newArray[i]);
        	var newItem = new Item(newArray[i]);
        	this.MyArray[i] = newItem;
        	console.log("new item : " + this.MyArray[i].num);
        	this.MyArray[i].GetSprite();
    	}		
	}

	

	//GetItems();

	this.RemoveFromInventory = function() 
    {
        console.log("called");
	};
}
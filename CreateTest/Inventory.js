

function Inventory() {
	
	var itemCount = 0;
	var itemPoolSize = 20;
	this.MyArray = [];
	this.MyStaticArray = [];

	
	this.init = function()
	{
		console.log("Inventory Built");	
		itemPool = new ItemPool(itemPoolSize); //initialize an item pool of 6 objects
		//this.PopulateInventory(9);
		this.PopulateInventory(2);
		this.PopulateInventoryStaticItems(6);
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
	};

	this.PopulateInventoryStaticItems = function(count)
	{
		var newStaticArray = [];
		newStaticArray = itemPool.GetItems(count); //gets 3 random numbers from the item pool

		for (var i = 0; i < newStaticArray.length; i++) 
    	{
        	console.log("new item : " + newStaticArray[i]);
        	var newItem = new StaticItem(newStaticArray[i]); //the new Item knows its number
        	this.MyStaticArray[i] = newItem; //add it to inventory
        	//console.log("new item : " + this.MyArray[i].num);
        	this.MyStaticArray[i].init(i); //initialize the 'item' element
    	}
	};
	

	this.PositionContainer = function()
	{
		for(var i = 0; i < this.MyArray.length; i++)
		{
			var child = palletContainer.getChildAt(i);
			// child.x = 0;	
		}
		
	};

	this.SetAllItemsAlpha = function(val)
	{
		console.log("hit inventory : " + val);
		for(var i = 0; i < this.MyArray.length; i++)
		{
			this.MyArray[i].SetAlpha(val);
			// child.x = 0;	
		}

		for(var j = 0; j < this.MyStaticArray.length; j++)
		{
			//console.log(this.MyStaticArray[j]);
			this.MyStaticArray[j].SetAlpha(val);
			// child.x = 0;	
		}
	};

	//GetItems();

	this.RemoveFromInventory = function() 
    {
        console.log("called");
	};
}
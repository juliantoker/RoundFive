function TrophyCase() {
	var trophyTotal = 5; //total
	var trophyCount = 0 //collected so far;
	this.MyArray = [];

	
	this.init = function()
	{
		console.log("Inventory Built");	
		//trophyPool = new TrophyPool(trophyPoolSize); //initialize an item pool of 6 objects
		
		for(var i=0;i<trophyTotal;i++)
    		this.MyArray[i] = i;

		this.DrawAllTrophies();
	};


	this.DrawAllTrophies = function(count)
	{
		for (var i = 0; i < trophyTotal; i++) 
    	{
        	var newTrophy = new Trophy(i); //the new trophy knows its number
        	this.MyArray[i] = newTrophy; //add it to the case array
        	this.MyArray[i].init(i); //initialize the 'item' element
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
	};

	//GetItems();

	this.RemoveFromInventory = function() 
    {
        console.log("called");
	};
}
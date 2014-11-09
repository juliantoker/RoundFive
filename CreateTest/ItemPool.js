
function ItemPool(size) 
{ //gets initialized with a size provided in main

    this.MyArray = [];
    this.size = size;
    var removeCount = 0; //number removed from the array

    for(var i=0;i<size;i++)
    	this.MyArray[i] = i;

    this.GetCount = function() 
    {
        return this.MyArray.length;
    };

    this.GetItems = function(num)
    {
    	if(this.removeCount == this.size)
    	{
			console.log("Array empty! Returning");
			return;
    	}

    	if((this.size - removeCount) < num) //there are less items left in the array than requested
    	{
    		console.log("Shortening!");
    		num = this.size - removeCount;
    	}
    		

    	var numberLeft = num; //how many items are left to be found
    	var newItems = [num]; //array to keep track of the found items
    	var foundItem; //variable to store the found item

    	while(numberLeft > 0)
    	{
    		foundItem = Math.floor(Math.random() * this.size); //random number from 0 to size - 1
    		
    		if(this.MyArray[foundItem] != -1)
    		{
    			this.MyArray[foundItem] = -1; //so that it doesn't get picked again
    			newItems[num-numberLeft] = foundItem; //starts from 0
    			removeCount++;
    			numberLeft --;
    		}

    	}

    	return newItems;
    	
    	// for (var i = 0; i < newItems.length; i++) 
    	// {
     //    	console.log("new item : " + newItems[i]);
    	// }
	};
}
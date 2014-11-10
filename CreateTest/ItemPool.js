
function ItemPool(size) 
{ //gets initialized with a size provided in main

    this.MyArray = [];
    this.size = size;
    var removeCount = 0; //number removed from the array

    for(var i=0;i<size;i++)
    	this.MyArray[i] = i;

    var spriteNames = [
    'castle',
    'catman',
    'dragon',
    'ghost',
    'rabbit',
    'unicorn',
    'zombie',
    'astronaut',
    'mushroom',
    'person',
    'shark',
    'teapot',
    'yellowtraffic',
    'earthskyBG',
    'halloweenBG',
    'anchor',
    'earthGround',
    'fishboat',
    'gravestone',
    'skyscraper',
    'tree'
	];

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
	};

	this.GetString = function(index)
	{
		var t = Number(index);
		if(index < 0 )
			return null;

		console.log("returning : " + spriteNames[Number(index)]);
		return (spriteNames[Number(index)]);
	};
}
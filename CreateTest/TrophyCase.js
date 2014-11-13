
function TrophyCase() {
	var trophyTotal = 30; //total
	var trophyCount = 0 //collected so far;
	this.MyArray = [];
	var rowTotal = 6;
	var colTotal = 5;

	var rowNo = 0;
	var colNo = 0;

	var unlockedTrophies = []; 
	
	this.init = function()
	{
		console.log("Inventory Built");	

		

		//SAVE LOAD WORKING
		//sessionStorage.setItem("Trophy total", trophyTotal);
		// Access some stored data
		//alert( "username = " + sessionStorage.getItem("Trophy total"));
		



		//trophyPool = new TrophyPool(trophyPoolSize); //initialize an item pool of 6 objects
		
		for(var i=0;i<trophyTotal;i++)
    		this.MyArray[i] = i;

		//this.DrawAllTrophies();
		// this.UnlockTrophy(0);
		// this.UnlockTrophy(2);
		// this.LoadTrophies();
		// this.UnlockTrophy(7);
		// this.UnlockTrophy(22);
		// this.UnlockTrophy(29);
	};

	this.SaveTrophies = function()
	{
		unlockedTrophies.push(i);
		sessionStorage.setItem("UnlockedTrophies", unlockedTrophies);
	}

	this.LoadTrophies = function()
	{
		var loadedTrophies = [];
		loadedTrophies = sessionStorage.getItem("UnlockedTrophies");

		for(j=0;j < loadedTrophies.length - 1;j++)
        		console.log("unlocked : " + unlockedTrophies[j]);
	}


	this.DrawAllTrophies = function(count)
	{
		for (var i = 0; i < trophyTotal; i++) 
    	{
    		//next row
    		if(i%5 == 0 && i >1)
    		{
    			rowNo += 1;
    			colNo = 0;
    		}

    		console.log("row no : " + rowNo + " col No : " + colNo); 
    			
        	var newTrophy = new Trophy(rowNo, colNo); //the new trophy knows its number
        	this.MyArray[i] = newTrophy; //add it to the case array
        	this.MyArray[i].init(); //initialize the trophy

        	colNo += 1;
    	}
	};

	this.UnlockTrophy = function(unlockNo)
	{
		if(unlockNo > trophyTotal)
		{
			console.log("Out of range");
			return;
		}

		colNo = 0;
		rowNo = 0;

		for(i = 0; i < trophyTotal; i++)
		{
			if(colNo > (colTotal - 1))
			{
				rowNo++;
				colNo = 0;
			}

			if(i == unlockNo)
			{
				console.log("Found at : " + rowNo + "," + colNo);
				var newTrophy = new Trophy(rowNo, colNo); //the new trophy knows its number
        		this.MyArray[i] = newTrophy; //add it to the case array
        		this.MyArray[i].init(); //initialize the trophy
        		this.SaveTrophies(i);


        		// for(j=0;j<unlockedTrophies.length;j++)
        		// 	console.log("unlocked : " + unlockedTrophies[j]);
			}
				
			
			colNo++;
		}
	}

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

function TrophyCase() {
	var trophyTotal = 30; //total
	var trophyCount = 0 //collected so far;
	var MyArray = [];
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
		
		
		for(var i=0;i<trophyTotal;i++)
    		MyArray[i] = i;

		//this.DrawAllTrophies();
		// this.UnlockTrophy(0);
		//this.UnlockTrophy(2);
		//this.UnlockTrophy(17);
		LoadTrophies();


		//DrawTrophy(0);
		// this.UnlockTrophy(7);
		// this.UnlockTrophy(22);
		// this.UnlockTrophy(29);
	};

	this.SaveTrophies = function(trophyNo)
	{
		//unlockedTrophies.join(trophyNo);
		unlockedTrophies[unlockedTrophies.length] = trophyNo;
		console.log("Saving : " + trophyNo);
		sessionStorage.setItem("UnlockedTrophies", unlockedTrophies);
		console.log(sessionStorage.getItem("UnlockedTrophies"));
	};


	function LoadTrophies()
	{
		var loadedTrophies = [];
		loadedTrophies = sessionStorage.getItem("UnlockedTrophies");
		if(loadedTrophies == null)
			return;

		var res = loadedTrophies.split(",");

		for(i=0;i < res.length;i++)
		{
			console.log("unlocked : " + res[i]);
			//DrawTrophy(res[i]);
			var colNo = 0;
			var rowNo = 0;

			for(j = 0; j < trophyTotal; j++)
			{
				if(colNo > (colTotal - 1))
				{
					rowNo++;
					colNo = 0;
				}

				if(j == res[i])
				{
					console.log("Found at : " + rowNo + "," + colNo);
					var newTrophy = new Trophy(rowNo, colNo); //the new trophy knows its number
        			MyArray[j] = newTrophy; //add it to the case array
        			MyArray[j].init(); //initialize the trophy
				}
				
			
				colNo++;
			}
		}
	};

	function DrawTrophy(drawNo)
	{
		console.log("DRAW TROPHY CALLED " + drawNo);
		var colNo = 0;
		var rowNo = 0;

		for(i = 0; i < trophyTotal; i++)
		{
			if(colNo > (colTotal - 1))
			{
				rowNo++;
				colNo = 0;
			}

			if(i == drawNo)
			{
				console.log("Found at : " + rowNo + "," + colNo);
				var newTrophy = new Trophy(rowNo, colNo); //the new trophy knows its number
        		MyArray[i] = newTrophy; //add it to the case array
        		MyArray[i].init(); //initialize the trophy
			}
				
			
			colNo++;
		}
	}


	// this.DrawAllTrophies = function(count)
	// {
	// 	for (var i = 0; i < trophyTotal; i++) 
 //    	{
 //    		//next row
 //    		if(i%5 == 0 && i >1)
 //    		{
 //    			rowNo += 1;
 //    			colNo = 0;
 //    		}

 //    		console.log("row no : " + rowNo + " col No : " + colNo); 
    			
 //        	var newTrophy = new Trophy(rowNo, colNo); //the new trophy knows its number
 //        	MyArray[i] = newTrophy; //add it to the case array
 //        	MyArray[i].init(); //initialize the trophy

 //        	colNo += 1;
 //    	}
	// };

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
        		MyArray[i] = newTrophy; //add it to the case array
        		MyArray[i].init(); //initialize the trophy
        		this.SaveTrophies(i);


        		// for(j=0;j<unlockedTrophies.length;j++)
        		// 	console.log("unlocked : " + unlockedTrophies[j]);
			}
				
			
			colNo++;
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
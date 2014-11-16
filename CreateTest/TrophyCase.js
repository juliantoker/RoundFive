
function TrophyCase() {
	var trophyTotal = 50; //total
	var trophyCount = 0 //collected so far;
	var trophyHeight;
	var largeTrophyHeight;
	var MyArray = [];
	var rowTotal = 5;
	var colTotal = 6;

	var rowNo = 0;
	var colNo = 0;

	var unlockedTrophies = []; 

	var sprite;
	var touchY;
	var deltaY;
	var minDrag = 10;
	var bottomDragLimit;
	var shelfTotal = 10; //for 50 total trophies and 5 per shelf

	var longShelfTotal = 2;
	var normalShelfTotal = 8;
	
	this.init = function()
	{
		console.log("Inventory Built");	

		sprite = bpm;

		bottomDragLimit = -sprite.getBounds().height * bgScaleY * 1.5;

		var shelf = new createjs.Bitmap(queue.getResult("shelf"));
		shelfSize = shelf.getBounds().height;

		trophyHeight = (canvasWidth)/6;
		largeTrophyHeight = (canvasWidth)/4;

		//TO GET BG TO SCROLL TOO, ADD THIS LINE BACK
		//galleryContainer.addChild(sprite);


		//SAVE LOAD WORKING
		//sessionStorage.setItem("Trophy total", trophyTotal);
		// Access some stored data
		//alert( "username = " + sessionStorage.getItem("Trophy total"));
		
		
		// for(var i=0;i<trophyTotal;i++)
  //   		MyArray[i] = i;
   		shelfDistance = (canvasHeight - UIBarHeight)/5; 
   		console.log("Shelf distance : " + shelfDistance);
  		this.DrawAllGalleryShelves();
		//this.DrawAllGalleryTrophies();

		//  this.UnlockTrophy(0);
		// this.UnlockTrophy(2);
		// this.UnlockTrophy(17);
		//LoadTrophies();

		//sprite.addEventListener("click", handleClick);
 		sprite.addEventListener("mousedown", handlePress);
 	 	sprite.addEventListener("mouseup", handleMouseUp);
 	// 	};

 		DrawTrackShelves();
 		DrawTrackTrophies();

		//DrawTrophy(0);
		//this.UnlockTrophy(7);
		// this.UnlockTrophy(22);
		// this.UnlockTrophy(29);
	};

	function DrawTrackShelves()
	{
		//Draw long shelves

		for (var i = 0; i < longShelfTotal + normalShelfTotal; i++) 
    	{
    		if(i < 2)
    			var longshelf = new createjs.Bitmap(queue.getResult("longShelf"));
    		else
    			var longshelf = new createjs.Bitmap(queue.getResult("shelf"));

    		longshelf.y = UIBarHeight+largeTrophyHeight+(i*shelfDistance);

    		longshelf.scaleX = bgScaleX;
    		longshelf.scaleY = 0.75;

    		trackContainer.addChild(longshelf);

    		console.log("LONG SHELF DRAWN");
    	}
	};

	function DrawTrackTrophies()
	{
		var colNo = 0;
		var rowNo = 0;

  		for(i=0;i < 8;i++)
		{
			if((i < 8 && colNo > 3) || (i==8) || (i > 8 && colNo > 5))
			{
				rowNo++;
				colNo = 0;
			}

			var trackTrophy = new TrackTrophy(rowNo, colNo); //the new trophy knows its number
			// if(i>1)
			// 	trackTrophy.ColorSprite();
        	//MyArray[i] = trackTrophy; //add it to the case array
        	if(i < 8)
        		trackTrophy.init("Large",i);
        	else
        		trackTrophy.init("Normal");

        	colNo++;

        	//trackContainer.addChild(trackTrophy);
        	//stage.addChild(trackTrophy);
		}
	};


	function handlePress(event) 
 	{
     	// A mouse press happened.
     	// Listen for mouse move while the mouse is down:
     	if(galleryOpened)
     	{
     		touchY = event.stageY;
     		event.addEventListener("mousemove", handleMove);
     		event.addEventListener("mouseup", handleMouseUp);
     	}
 	};

  	function handleMove(event) 
  	{
  		deltaY = Math.abs(event.stageY - touchY);
  		
  		if(deltaY > minDrag)
  		{
  			if(event.stageY > touchY)//moving down
  			{
  				if(galleryContainer.y <= 0)
  					galleryContainer.y += deltaY;
  			}
  				
  			else
  			{
  				console.log("trop conta : " + galleryContainer.y);
  				if(galleryContainer.y >= bottomDragLimit)
  					galleryContainer.y -= deltaY;
  			}
  				

  			touchY = event.stageY;
  		}
 	};

 	//release sprite into the world
 	function handleMouseUp(event) 
 	{
 		console.log("Dragged distance : " + (event.stageY - touchY));
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
				var newTrophy = new Trophy(rowNo, colNo, i); //the new trophy knows its number
        		MyArray[i] = newTrophy; //add it to the case array
        		MyArray[i].init(); //initialize the trophy
        		this.SaveTrophies(i);

        		// for(j=0;j<unlockedTrophies.length;j++)
        		// 	console.log("unlocked : " + unlockedTrophies[j]);
			}
				
			
			colNo++;
		}
	};

	this.DrawAllGalleryShelves = function()
	{
		console.log("Shelf size : " + shelfSize);

		for (var i = 0; i < shelfTotal; i++) 
    	{
    		var shelf = new createjs.Bitmap(queue.getResult("shelf"));
    		shelf.y = UIBarHeight+(i*shelfDistance)+trophyHeight;

    		shelf.scaleX = bgScaleX;
    		galleryContainer.addChild(shelf);
    	}
	};


	this.DrawAllGalleryTrophies = function(count)
	{
		var colNo = 0;
		var rowNo = 0;

  		for(i=0;i < trophyTotal;i++)
		{
			if(colNo > (colTotal - 1))
				{
					rowNo++;
					colNo = 0;
				}

			var newTrophy = new Trophy(rowNo, colNo); //the new trophy knows its number
        	MyArray[i] = newTrophy; //add it to the case array
        	MyArray[i].init();
        	colNo++;
		}
	};

	this.SetAllItemsAlpha = function(val)
	{
		console.log("hit inventory : " + val);
		for(var i = 0; i < MyArray.length; i++)
		{
			if(MyArray[i] != undefined)
				MyArray[i].SetAlpha(val);
			// child.x = 0;	
		}
	};

	//GetItems();

	this.RemoveFromInventory = function() 
    {
        console.log("called");
	};


}
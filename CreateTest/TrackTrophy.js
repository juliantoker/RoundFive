function TrackTrophy(rowNo, colNo, pIndex) {


	var inventoryPos = 0;
	var loadString = "";
	//console.log("canvas height : " + canvasHeight + " height : " + shelfHeight);
	var rowNo = rowNo; 
	var colNo = colNo; 
	var sprite;
	var largeTrophyNo;

	var index = pIndex;
	var type;

	//*********************************************************************************
	var filters = [new createjs.ColorFilter(0,0,0,0.5), new createjs.ColorFilter(1,1,0,1)];
        var index = 0;
 
   //*********************************************************************************    

    /**
     * Turn off mouse interaction like "hover".
     */
    //SkipButton.prototype.disableMouseInteraction = function() {
        // Disable mouse over as we do not use it within the game.
   //stage.enableMouseOver(0);
   // };

   this.init = function(trophyType) 
   {
   		//this.inPos = position;
   		//inventoryPos = this.inPos;
   		//console.log("inventory pos : " + inventoryPos);
   		type = trophyType;
   		AssignSprite();
   		
   };

   this.init = function(trophyType, LargeTrophyNo) 
   {
   		//this.inPos = position;
   		//inventoryPos = this.inPos;
   		//console.log("inventory pos : " + inventoryPos);
   		type = trophyType;
   		largeTrophyNo = LargeTrophyNo;
   		AssignSprite();
   };

   	//assigns a sprite to add to the item
	function AssignSprite()
	{
		//only works with string specified, not from loading queue
		if(type == "Large")
			sprite = new createjs.Bitmap("assets/largeTrophy.png");
		else
		{
			//if(index != undefined)
			//{
				var loadString = "trophy"+pIndex;
				//sprite = new createjs.Bitmap(queue.getResult(loadString));
				sprite = new createjs.Bitmap("assets/Trophies/" + loadString + ".png");
			//}
			//sprite = new createjs.Bitmap("assets/mediumTrophy.png");
			
		}

		var alreadyUnlocked = false;

		//if trophy not unlocked yet, display in grey
		for(var i = 0; i < unlockedTrophies.length; i++)
		{
			if(unlockedTrophies[i] == pIndex)
			{
				alreadyUnlocked = true;
				console.log("Chosen one : " + pIndex);
			}
				
		}
			
		//if(type != "MapPointer")
		if(!alreadyUnlocked)
		{
				sprite.image.onload = function () {
                sprite.cache(0, 0, this.width, this.height);
                //trackContainer.addChild(sprite);
                sprite.filters = [filters[0]];
            	sprite.updateCache();
             }
        }

        if(type != "MapPointer") //map pointer trophies are added to the mapPointerContainer
			trackContainer.addChild(sprite);
		else
			mapPointerContainer.addChild(sprite);

		if(type == "Large")
			desiredWidth = (canvasWidth)/4;
		else
			desiredWidth = (canvasWidth)/6;

		var scaleY = (desiredWidth)/sprite.getBounds().height;
		var scaleX = (desiredWidth)/sprite.getBounds().width;

		sprite.scaleY = scaleY;
		sprite.scaleX = scaleX;

		sprite.x = colNo * desiredWidth;
		
		sprite.y = (rowNo*shelfDistance)+UIBarHeight + shelfSize/3;

		sprite.addEventListener("mousedown", handlePress);
 	 	//sprite.addEventListener("mouseup", handleMouseUp);


 		//console.log("Drawn static item : " + shelfPos);
	};

	this.ColorSprite = function()
	{
		sprite.cache(0, 0, this.width, this.height);
        sprite.filters = [filters[1]];
        sprite.updateCache();
	};

	//function SetAlpha(val)
	this.SetAlpha = function(val)
 	{
 		console.log("static setting : " + val);
 		sprite.alpha = val;
 	};

 	function handlePress(event) 
 	{
 		//ADDS TROPHIES TO THE MAP CONTAINER 
 		if(!galleryOpened)
 		{
 			if(type != "Large") //small trophy opens map
 			{
 				var mapTopOpen = Math.floor((Math.random() * 3));
 				//openMapToFloor(mapTopOpen); //0 corresponds to floor 1, 1-2, 2-3, 3-5	
 				console.log("MAP TO OPEN : " + mapTopOpen);
 				openMapToFloor(mapTopOpen);
 			}
 			else //large trophy opens track
 			{
 				//CLEAR ALL CURRENTLY DISPLAYED MAP POINTERS, IF ANY
 				mapPointerContainer.removeAllChildren();
 				currentTrackOpen = largeTrophyNo; //currentTrackOpen now marks the currently open track
 				console.log("current track open : " + largeTrophyNo);

 				var colNo = 0;
 				var rowNo = 2;

 				var res = tracks[largeTrophyNo].split(",");

				for(i=0;i < res.length;i++)
				{
					console.log("Drawing : " + res[i]);
					var loadString = "trophy" + res[i];
        		
					var trackTrophy = new TrackTrophy(rowNo, colNo, res[i]); //the new trophy knows its number
					
        			trackTrophy.init("MapPointer");
							
					colNo++;
				}


 			}
 		}
     		
 	};


	// function handleClick(event)
	// {
 //    	console.log("clicked");
 // 	}

 // 	function handlePress(event) 
 // 	{
 // 		console.log("touch me");
 //     // A mouse press happened.
 //     // Listen for mouse move while the mouse is down:
 //     	event.addEventListener("mousemove", handleMove);
 //     	event.addEventListener("mouseup", handleMouseUp);
 // 	};

 //  	function handleMove(event) 
 //  	{
 //     //  	event.target.x = event.stageX;
 //    	// event.target.y = event.stageY;

 //    	if(!this.inWorld)
 //    	{
 //    		sprite.x = event.stageX;
 //    		sprite.y = event.stageY;
 //    	}
 //    	else
 //    	{
 //    		sprite.x = event.stageX;
 //    		sprite.y = event.stageY;
 //    	}

    	
 // 	};

 // 	//release sprite into the world
 // 	function handleMouseUp(event) 
 // 	{
 // 		// if(!this.inWorld)
 // 		// {
 // 		// 	console.log("Removing from container");
 //  	// 		stage.removeEventListener("mousemove", handleMove);
 //  	// 		if(sprite.x < (0.75*canvasWidth))
 //  	// 		{

 //  	// 			this.inWorld = true;
 //  	// 			var container;
	// 		// 	container = stage.getChildByName("PalletContainer");

 // 		// 		container.removeChild(sprite);

 // 		// 		worldContainer.addChild(sprite);
	// 		// 	console.log("Added succesfully");
 //  	// 		}
 // 		// }	
	// };

	// this.PrintID = function() 
 //    {
 //        //console.log("ID:" + this.num);
	// };
}
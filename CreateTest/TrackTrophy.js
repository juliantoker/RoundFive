function TrackTrophy(rowNo, colNo, pIndex) {

	var loadString = "";
	//console.log("canvas height : " + canvasHeight + " height : " + shelfHeight);
	var rowNo = rowNo; 
	var colNo = colNo; 
	var sprite;
	var largeTrophyNo;

	var index = pIndex;
	var type;

	var isTrackComplete = false;

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
   		type = trophyType;
   		AssignSprite();
   		
   };

   this.init = function(trophyType, LargeTrophyNo) 
   {
   		type = trophyType;
   		largeTrophyNo = LargeTrophyNo;
   		AssignSprite();
   };

   this.init = function(trophyType, LargeTrophyNo, unlockStatus) 
   {
   		isTrackComplete = unlockStatus;
   		type = trophyType;
   		largeTrophyNo = LargeTrophyNo;
   		AssignSprite();
   };

   	//assigns a sprite to add to the item
	function AssignSprite()
	{
		//only works with string specified, not from loading queue
		if(type == "Large")
		{
			pIndex = largeTrophyNo + 39; //since there are 38 small trophies

			var loadString = "trophy"+pIndex;
			sprite = new createjs.Bitmap("assets/Trophies/" + loadString + ".png");
		}
			
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

		if(isTrackComplete)
			alreadyUnlocked = true;

		var trackCheck = sessionStorage.getItem("completedTracks");
		
		//check if track already completed
		if(trackCheck != null)
		{
			console.log("completed tracks length : " + trackCheck.length);
			var res = trackCheck.split(",");

			for(i=0;i < res.length;i++)
			{
				if(largeTrophyNo == res[i])
					alreadyUnlocked = true;
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
        {
        	sprite.name = "LargeTropy" + largeTrophyNo;
        	trackContainer.addChild(sprite);
        }
		else
			mapPointerContainer.addChild(sprite);

		if(type == "Large")
			desiredWidth = (canvasWidth)/4;
		else
			desiredWidth = (canvasWidth)/5;

		var scaleY = (desiredWidth)/sprite.getBounds().height;
		var scaleX = (desiredWidth)/sprite.getBounds().width;

		sprite.scaleY = scaleY;
		sprite.scaleX = scaleX;

		sprite.x = colNo * desiredWidth;
		
		if(type == "Large")
		{
			//sprite.y = ((rowNo+0.45)*shelfDistance)+UIBarHeight + shelfSize/3;
			sprite.y = shelfYPositions[rowNo] - (desiredWidth);
		}
			
		else
		{
			//sprite.y = ((rowNo+0.65)*shelfDistance)+UIBarHeight + shelfSize/3;
			sprite.y = shelfYPositions[rowNo] - (desiredWidth)*0.9;
		}
			

		sprite.addEventListener("mousedown", handlePress);
 	 	//sprite.addEventListener("mouseup", handleMouseUp);
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
 				if(slideOutOpened)
 				{
 					slideOutContainer.visible = false;
 					MoveSlideOut();
 				}
 				var mapTopOpen = Math.floor((Math.random() * 3));
 				//openMapToFloor(mapTopOpen); //0 corresponds to floor 1, 1-2, 2-3, 3-5	
 				console.log("MAP TO OPEN : " + mapTopOpen);
 				openMapToFloor(mapTopOpen);
 			}
 			else //large trophy opens track
 			{
 				// if(tutFirstTimeTrackOpened || (isTutorialSequenceOver == false))
 				// {
 				// 	ShowNextTutorialFrame(5);
 				// 	tutFirstTimeTrackOpened = false;
 				// }
 				//CLEAR ALL CURRENTLY DISPLAYED MAP POINTERS, IF ANY
 				MoveSlideOut(largeTrophyNo);
 				mapPointerContainer.removeAllChildren();
 				currentTrackOpen = largeTrophyNo; //currentTrackOpen now marks the currently open track
 				console.log("current track open : " + largeTrophyNo);

 				questGlow.x = sprite.x + ((canvasWidth)/4)/2 - (questGlow.getBounds().width*glowScale)/2;
 				questGlow.y = sprite.y + ((canvasWidth)/4)/2 - (questGlow.getBounds().height*glowScale)/2;

 				questGlow.visible = true;

 				var colNo = 0;
 				var rowNo = 2;

 				var res = tracks[largeTrophyNo].split(",");

				for(i=0;i < res.length;i++)
				{
					if(colNo > 4)
					{
						rowNo++;
						colNo = 0;
					}
					console.log("Drawing : " + res[i]);
					var loadString = "trophy" + res[i];
        		
					var trackTrophy = new TrackTrophy(rowNo, colNo, res[i]); //the new trophy knows its number
					
        			trackTrophy.init("MapPointer");
							
					colNo++;
				}


 			}
 		}
     		
 	};

}
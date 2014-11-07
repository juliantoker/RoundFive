// NOTE: comments focus mainly on CreateJS logic, not game mechanics.

// (function() {

	var c = createjs;
	
	var ItemPool = function() 
	{
		console.log("Item pool initialized");
		init();
	}
	var p = ItemPool.prototype;
	c.EventDispatcher.initialize(p);

	//p.view;
	
	// p.view;
	// p.width;
	// p.height;
	// p.spriteSheet;
	// p.sprites;
	// p.speed;
	// p.terrainContainers;
	// p.shot;
	// p.hero;
	// p.spritePool;
	// p.dead;
	// p.keyListener;
	// p.tickListener;
	// p.shotDelay;
	// p.stats;
	// p.kills;
	// p.distance;
	// p.hazards;
	// p.score;
	
	 //p._inited;

	
	// p.init = function() 
	// {
	// 	//var i = inte;
	// 	console.log("Initiated : ");  
	// }

	function init()
	{
		console.log("Initiated : ");
	}
	
	//window.Game = Game;
// })();
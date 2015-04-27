(function(){
	window.Settings = function(){
		this.canvas = {
			width  : 475,
			height : 316
		};

		this.resources = [
			{
				"id" : "background",
				"src": "assets/img/tileInMap.png"
			},
			{
				"id" : "background2",
				"src": "assets/img/tileInMap.png"
			}
		];

		this.colorBackground = null;
		this.mediaBackground = this.resources[0].src;
	};
})();
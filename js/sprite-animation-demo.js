// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 
(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {
			
	var coin,
		coinImage,
		canvas;		
		var coin2,
		coinImage2,
		canvas;				
		var coin3,
		coinImage3,
		canvas;	
		var coin4,
		coinImage4,
		canvas;	

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);

	  coin.update();
	  coin.render();
	  coin2.update();
	  coin2.render();
	  coin3.update();
	  coin3.render();
	  coin4.update();
	  coin4.render();
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {
		
		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);
		  
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};
		
		return that;
	}
	
	// Get canvas
	canvas = document.getElementById("coinAnimation");
	canvas.width = 100;
	canvas.height = 100;

		canvas2 = document.getElementById("coinAnimation2");
	canvas2.width = 100;
	canvas2.height = 100;

		canvas3 = document.getElementById("coinAnimation3");
	canvas3.width = 100;
	canvas3.height = 100;

		canvas4 = document.getElementById("coinAnimation4");
	canvas4.width = 100;
	canvas4.height = 100;
	
	// Create sprite sheet
	coinImage = new Image();	
	coinImage2 = new Image();	
	coinImage3 = new Image();	
	coinImage4 = new Image();	
	
	// Create sprite
	coin = sprite({
		context: canvas.getContext("2d"),
		width: 1000,
		height: 100,
		image: coinImage,
		numberOfFrames: 10,
		ticksPerFrame: 10
	});

	coin2 = sprite({
		context: canvas2.getContext("2d"),
		width: 1000,
		height: 100,
		image: coinImage2,
		numberOfFrames: 10,
		ticksPerFrame: 10
	});

	coin3 = sprite({
		context: canvas3.getContext("2d"),
		width: 1000,
		height: 100,
		image: coinImage3,
		numberOfFrames: 10,
		ticksPerFrame: 10
	});

	coin4 = sprite({
		context: canvas4.getContext("2d"),
		width: 1000,
		height: 100,
		image: coinImage4,
		numberOfFrames: 10,
		ticksPerFrame: 10
	});
	
	// Load sprite sheet
	coinImage.addEventListener("load", gameLoop);
	coinImage2.addEventListener("load", gameLoop);
	coinImage3.addEventListener("load", gameLoop);
	coinImage4.addEventListener("load", gameLoop);
	coinImage2.src = "img/icons/bl.png";
	coinImage3.src = "img/icons/b.png";
	coinImage4.src = "img/icons/mask.png";
	coinImage.src = "img/icons/coin.png";

} ());


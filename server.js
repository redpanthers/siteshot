var fs = require('fs');
var data = fs.read('./url.txt');
var casper = require('casper').create();	         	
var urlArray = data.split('\n');
if (urlArray.length <= 0) {
  casper
    .echo("Specify URL's in url.txt")
    .exit(1);
}
var viewportSizes = [
    [320,480],
    [320,533],
    [320,568],
    [360,640],
    [375,667],
    [384,640],
    [400,640],
    [424,753],
    [480,854],
    [960,720],
    [966,604],
    [1280,720],
    [1280,800],
    [1920,1080]
];
casper.start().eachThen(urlArray, function(response) {

	/* Directory to save screenshots abstracted from entered url*/
		var saveDir = response.data.replace( /[^a-zA-Z0-9]/gi, '-' ).replace(/^https?-+/, ''); 

	this.each(viewportSizes, function(casper, viewportSize) {
		this.then(function(){
			this.viewport(viewportSize[0], viewportSize[1]);
		});
		this.thenOpen(response.data, function() {
      this.wait(30000);
    });
    this.then(function(){
    	var FPfilename = saveDir + '/fullpage-' + viewportSize[0] + "x" + viewportSize[1] + ".png";
	    this.captureSelector(FPfilename, 'body');
    });
	});
});
casper.run();
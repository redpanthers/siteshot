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
    [320,480], /* Iphone 4 */
    [320,533], /* HTC Desire Nokia Lumia*/
    [320,568], /* Iphone 5 */
    [360,640], /* Blackberry z30, Nexus 5, HTC One X, Sony Xperia X*/
    [375,667], /* Iphone 6 */
    [384,640], /* Blackberry z10, Nexus 4,  */
    [400,640], /* Samsung Note */
    [424,753], /* LG Optimus LTE */
    [480,854], /* Sony Xperia U */
    [960,720],
    [966,604], /* Nexus 7 */
    [1024,768],
    [1280,720], /* HD */
    [1280,800], /* Nexus 10, Samsung Galaxy Tab*/
    [1920,1080] /* Full HD */
];
casper.start().eachThen(urlArray, function(response) {

	/* Directory to save screenshots abstracted from entered url*/
		var saveDir = response.data.replace( /[^a-zA-Z0-9]/gi, '-' ).replace(/^https?-+/, ''); 

	this.each(viewportSizes, function(casper, viewportSize) {
		this.then(function(){
			this.viewport(viewportSize[0], viewportSize[1]);
		});
		this.thenOpen(response.data, function() {
      this.wait(40000);
    });
    this.then(function(){
    	var FPfilename = saveDir + '/fullpage-' + viewportSize[0] + "x" + viewportSize[1] + ".png";
	    this.captureSelector(FPfilename, 'body');
    });
	});
});
casper.run();
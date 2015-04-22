var casper = require("casper").create();
if (casper.cli.args.length < 1) {
  casper
    .echo("Usage: $ casperjs screenshots.js http://example.com")
    .exit(1)
  ;
} else {
	var url = casper.cli.args[0];
}
/* Viewport sizes */
var viewportSizes = [
    [320,480],
    [320,564],
    [600,800],
    [1024,980],
    [1280,980],
    [1440,2000]
];
/* Directory to save screenshots abstracted from entered url*/
var saveDir = url.replace(/[^a-zA-Z0-9]/gi, '-').replace(/^https?-+/, ''); 
casper.start();

casper.each(viewportSizes, function(self, viewportSize, i) {
 
    // set two vars for the viewport height and width as we loop through each item in the viewport array
    var width = viewportSize[0],
        height = viewportSize[1];
 
    //give some time for the page to load
    casper.wait(50000, function() {
 
        //set the viewport to the desired height and width
        this.viewport(width, height);
 
        casper.thenOpen(url, function() {
            this.echo('Opening at ' + width);
 
            //Set up two vars, one for the fullpage save, one for the actual viewport save
            var FPfilename = saveDir + '/fullpage-' + width + ".png";
            //var ACfilename = saveDir + '/' + width + '-' + height + ".png";
 
            //Capture selector captures the whole body
            this.captureSelector(FPfilename, 'body');
 
            //capture snaps a defined selection of the page
            //this.capture(ACfilename,{top: 0,left: 0,width: width, height: height});
            //this.echo('snapshot taken');
        });
    });
});
casper.run();
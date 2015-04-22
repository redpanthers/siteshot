Site Shot
----------
Generate screenshots of a sites at various resolutions and save them. 

Requirements
=============
1. Phantom JS  `sudo npm install -g phantomjs@1.9.6`
2. Casper JS   `sudo npm install -g casper`

It seems phantomjs 2.0 doesnt work as casper required 1.x version at the time i wrote this.

Working
=======
After installing casperjs and phantomjs globally, export casper js to the project using require. Casper js can be started using `casper.start()`

Casper js has to provision to capture a part of page. If you need to capture the whole page, then specify selector to body. Eg: `this.captureSelector(FPfilename, 'body')`. 

Then run Casper js using `casper.run()`



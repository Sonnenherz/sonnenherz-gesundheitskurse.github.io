var phantomcss = require('phantomcss');

casper.test.begin('LogosArt', function () {

    phantomcss.init({
        rebase: casper.cli.get("rebase"),
        casper: casper,
        failedComparisonsRoot: './test/failures/',
        screenshotRoot: './test/screenshots/',
        addLabelToFailedImage: false
    });

    casper.options.waitTimeout = 20000;

    casper.start('http://localhost:4000/', function() {
        this.waitForSelector('img.map-img');
    });
    casper.viewport(1920, 1080);

    casper.wait(1000, function () {
        phantomcss.screenshot('html');
    });

    casper.then(function () {
        phantomcss.compareAll();
    });

    casper.run(function () {
        phantomcss.getExitStatus(); // pass or fail?
        casper.test.done();
    });
});

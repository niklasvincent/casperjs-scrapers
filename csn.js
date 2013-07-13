var system = require('system');

if (system.args.length < 5) {
  console.info("Please provide civic registration number and PIN as arguments to this script.");
  phantom.exit();
}

var casper = require('casper').create({
    pageSettings: {
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10'
    },
    viewportSize: {
        width: 1024,
        height: 768
    },
    verbose: true,
    logLevel: 'warning',
	 clientScripts:  [
	 	'jquery.min.js'
	 ]
});

casper.start('https://www.csn.se/minasidormobil/inloggning');

casper.then(function() {
	this.click('input[name="logga-in-med"][value="pinkod"]');
});

casper.then(function(civicRegistrationNbr, PIN) {
	var system = require('system');
    this.fill('form[id="loggaInForm"]', {
        'j_username': system.args[4],
		'j_password': system.args[5]
    }, false);
});

casper.then(function() {
    this.click('input[value="Logga in"]');
});

casper.then(function() {
	if ( this.getCurrentUrl() == 'https://www.csn.se/minasidormobil/inloggning?login_error=1' ) {
		console.info("Invalid credentials, log in failed.");
		phantom.exit(1);	
	}
});

casper.then(function() {
	this.click("a[href='/minasidormobil/aterbetalning/aktuellskuld']")
});

casper.then(function() {
	var debt = this.evaluate(function() {
		var debt = $('.floatRight').first().html();
		debt = debt.replace('&nbsp;', '');
		debt = debt.replace(',', '');
		return parseFloat(debt);
	});
	console.log(debt);
});

casper.run();
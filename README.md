casperjs-scrapers
=================

Various scrapers in CasperJS (a PhantomJS extension).

See instructions on [installing Casperjs](http://docs.casperjs.org/en/latest/installation.html).

### CSN (Swedish student debt) ###

Small scraper that uses the mobile version of the CSN (Centrala studiestödsnämnden) website to check your current student debt.

Just run with your civic registration number and PIN as the arguments.

    casperjs csn.js yyyymmdd-xxxx NNNN
    
**Note**: Only works if you have received a PIN code from CSN (needs to be requested and gets sent by snail mail).
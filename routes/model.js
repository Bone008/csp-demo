const express = require('express');
const crypto = require('crypto');
const router = express.Router()

const our_films = {
  "films": [
    { "title": "Fast & Furious", "type": "Action", "description": "Lorem ipsum dolor <b>Fast & Furious</b> sit amet" },
    { "title": "Moon knight", "type": "Action", "description": "Lorem ipsum dolor <b>Moon knight</b> sit amet" },
    { "title": "The Batman", "type": "Action", "description": "Lorem ipsum dolor <b>The Batman</b> sit amet" },
    { "title": "The Northman", "type": "Action", "description": "Lorem ipsum dolor <b>The Northman</b> sit amet" },
    { "title": "Doctor Strange", "type": "Action", "description": "Lorem ipsum dolor <b>Doctor Strange</b> sit amet" },
    { "title": "Halo", "type": "Action", "description": "Lorem ipsum dolor <b>Halo</b> sit amet" },
    { "title": "Spartacus", "type": "Action", "description": "Lorem ipsum dolor <b>Spartacus</b> sit amet" },
    { "title": "The dark knight", "type": "Action", "description": "Lorem ipsum dolor <b>The dark knight</b> sit amet" },
    { "title": "Wolves", "type": "Action", "description": "Lorem ipsum dolor <b>Wolves</b> sit amet" },
    { "title": "Uncharted", "type": "Action", "description": "Lorem ipsum dolor <b>Uncharted</b> sit amet" },
    { "title": "Top Gun", "type": "Action", "description": "Lorem ipsum dolor <b>Top Gun</b> sit amet" },
    { "title": "John wick", "type": "Action", "description": "Lorem ipsum dolor <b>John wick</b> sit amet" },
    { "title": "The train", "type": "Action", "description": "Lorem ipsum dolor <b>The train</b> sit amet" },
    { "title": "Don't breath", "type": "Action", "description": "Lorem ipsum dolor <b>Don't breath</b> sit amet" }
  ],

  "cspVersions": [
    { url: '/', label: 'no protection', exploit: 'include any <script> tag' },
    { url: '/csp1', label: 'whitelist', exploit: 'load an old version of Angular from cdnjs.cloudflare.com and execute code through an Angular expression [TODO: need to check if this actually works without having to add unsafe-eval]' },
    { url: '/csp2', label: 'insecure nonce', exploit: 'include a <base> tag to point to a malicious movies.js file' },
    { url: '/csp3', label: 'secure nonce', exploit: 'hopefully none, but non-XSS attacks are still possible' },
    { url: '/csp4', label: 'Trusted types', exploit: 'Should be coupled with a defence mechanism against server side XSS '},
    { url: '/csp5', label: 'Trusted types 2', exploit: ''},
  ]
};

/**
 * Renders the main page.
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function getMain(req, res) {
  var type = req.query.q;
  renderPar = {
    ...our_films,
    searchedType: type,
    basePath: req.protocol + '://' + req.get('host'),
    reqPath: req.baseUrl + req.path,
    activeCspString: res.get('Content-Security-Policy') || 'N/A',
    activeCspVersion: our_films.cspVersions.find(({ url }) => req.path === url) || {},
    FineGrainedTT: res.FineGrainedTT,
  };
  res.render('mainPage', renderPar)
}

router
  .get('/', getMain)

  // Whitelist
  .get('/csp1', (req, res, next) => {
    res.set('Content-Security-Policy', "object-src 'none'; script-src 'self' https://cdnjs.cloudflare.com/ 'unsafe-eval'");
    next();
  }, getMain)

  // Nonces, but without base-uri
  .get('/csp2', (req, res, next) => {
    const nonce = crypto.randomBytes(16).toString('base64');
    res.set('Content-Security-Policy', `object-src 'none'; script-src 'nonce-${nonce}'`);
    res.locals.nonce = nonce;
    next();
  }, getMain)


  // Nonces, with base-uri
  .get('/csp3', (req, res, next) => {
    const nonce = crypto.randomBytes(16).toString('base64');
    res.set('Content-Security-Policy', `object-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'`);
    res.locals.nonce = nonce;
    next();
  }, getMain)

  .get('/csp4', (req, res, next) => {
    res.set('Content-Security-Policy', `require-trusted-types-for 'script'`);
    res.FineGrainedTT = true;
    next();
  }, getMain)

  .get('/csp5', (req, res, next) => {
    res.FineGrainedTT = true;
    next();
  }, getMain)




module.exports = router
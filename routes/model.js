const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router()


var our_films = {
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
}

//Getting the main page
function getMain(req, res) {
  var type = req.query.q;
  renderPar = our_films;
  renderPar["searchedType"] = type;
  res.render('mainPage', renderPar)
}

router
  .get('/', getMain)
  .get('/csp1', (req, res, next) => {
    res.set('Content-Security-Policy', "script-src 'self' https://ajax.googleapis.com/");
    next();
  }, getMain)

  // , (req, res) => {
  //   res.setHeader('Content-Type', 'text/html');
  //   res.setHeader('Set-Cookie', ['security=csp1']);
  //   res.send("This is csp1")
  // })
  .get('/csp2', getMain)
// , (req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Set-Cookie', ['security=csp2']);
//   res.send("This is csp2")
// })


module.exports = router

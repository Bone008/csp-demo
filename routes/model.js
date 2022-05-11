const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router()


var our_films = {
  "films": [
    { "title": "Fast & Furious", "type": "Action" },
    { "title": "Moon knight", "type": "Action" },
    { "title": "The Batman", "type": "Action" },
    { "title": "The Northman", "type": "Action" },
    { "title": "Doctor Strange", "type": "Action" },
    { "title": "Halo", "type": "Action" },
    { "title": "Spartacus", "type": "Action" },
    { "title": "The dark knight", "type": "Action" },
    { "title": "Wolves", "type": "Action" },
    { "title": "Uncharted", "type": "Action" },
    { "title": "Top Gun", "type": "Action" },
    { "title": "John wick", "type": "Action" },
    { "title": "The train", "type": "Action" },
    { "title": "Don't breath", "type": "Action" }
  ],
  "display": function () {
    return this.title + ": \t" + this.type;
  }

}

//Getting the main page
function getMain(req, res) {
  var type = req.query.q;
  renderPar = our_films;
  renderPar["type"] = type;
  res.render('mainPage', renderPar)
}

router
  .get('/', getMain)
  .get('/csp1', getMain)

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

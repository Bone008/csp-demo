const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;



app
  .set('view engine', 'hjs')


  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))

  // Serve static files
  .use(express.static(__dirname + '/public'))

  .use('/', require('./routes/model'))
  .listen(port, () => {
    console.log(`Server is listening on port ${port} ...`);
  })
  .on('error', (error) => {
    console.error(error);
  });

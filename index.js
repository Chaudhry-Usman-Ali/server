const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('./models')




// Load environment variables from .env file
dotenv.config();


// Initialize Express app
const app = express();


// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(require("./routes/post"))
app.use(require("./routes/comment"))
  
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
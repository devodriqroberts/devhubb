const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');


const app = express();
const port = process.env.PORT || 5000;


// Body Parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());






// 2. DB config
const db = require('./config/keys').mongoURI;

// Connect to mongodb through mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// 3. Use routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);







app.listen(port, () => {
  console.log(`Server has started on port: ${port}.`)
});
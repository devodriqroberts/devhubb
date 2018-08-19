const express = require('express');
const mongoose = require('mongoose');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');



const app = express();
const port = process.env.PORT || 3000;


// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongodb through mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));




app.get('/', (req, res) => {
  res.send('Hello Vod!');
});

// Use routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);







app.listen(port, () => {
  console.log(`Server has started on port: ${port}.`)
});
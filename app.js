const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
//set engine
app.set('view engine', 'ejs');


const dbURI = 'mongodb+srv://rethvik:rethvik45@nodejs.xupzf.mongodb.net/lms';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('*', checkUser);
app.get('/', (req, res) =>{
    res.render('index');
});

app.use(authRoutes);
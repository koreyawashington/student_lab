
require('dotenv').config();

const express = require('express');

const connectToDB = require('./config/database');
const methodOverride = require('method-override');

const Log = require('./models/Log');

const app = express();


app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());


app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});


app.get('/', function (req, res) {
  res.render('Home');
});


app.get('/logs/new', (req, res) => {
  res.render('New');
});

app.post('/logs', (req, res) => {

  if (req.body.shipIsBroken === 'on') {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  Log.create(req.body, (error, createdLog) => {
    res.redirect('/logs');
  });
});

app.get('/logs', (req, res) => {
  Log.find({}, (error, allLogs) => {
    res.render('Index', { logs: allLogs });
  });
});

app.get('/logs/:id', (req, res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    res.render('Show', { log: foundLog }); 
  });
});

app.get('/logs/:id/edit', (req, res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    if (!error) {
      res.render('Edit', { log: foundLog });
    } else {
      res.send({ msg: error.message });
    }
  });
});

app.put('/logs/:id', (req, res) => {
  if (req.body.shipIsBroken === 'on') {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  Log.findByIdAndUpdate(req.params.id, req.body, (error, updatedLog) => {
    res.redirect('/logs');
  });
});

app.delete('/logs/:id', (req, res) => {
  Log.findByIdAndRemove(req.params.id, (error, deletedLog) => {
    res.redirect('/logs');
  });
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(3000, () => {
  console.log('Server is listening at port 3000.');
  connectToDB();
});


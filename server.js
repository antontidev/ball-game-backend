// create an express app
const express = require("express");
const app = express();
const BodyParser = require("body-parser");

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb-url";

// use the express-static middleware
app.use(express.static("public"));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.put('/leaderboard/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const newscore = { name: req.body.name, score: req.body.score };
  db.collection('scores').update(details, newscore, (err, result) => {
    if (err) {
        res.send({'error':'An error has occurred'});
    } else {
        res.send(newscore);
    } 
  });
});


app.get('/leaderboard', (req, res) => {
  db.collection('scores').find({}).toArray((err, result) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send(result);
    }
  });
});

app.delete('/leaderboard/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  db.collection('scores').remove(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send('score ' + id + ' deleted!');
    } 
  });
});


app.get('/leaderboard/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  
  db.collection('scores').findOne(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send(item);
    }
  });
});


app.post('/leaderboard', (req, res) => {
  const score = { name: req.body.name, score: req.body.score };
  db.collection('scores').insertOne(score, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result.ops[0]);
    }
})});

app.listen(process.env.PORT || 3000, () => {
    MongoClient.connect(uri,  { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db('leaderboard');
        console.log("Connected to `" + "`!");
    });
});
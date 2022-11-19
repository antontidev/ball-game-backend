const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = process.env.MONGODB_URI || "mongodb-url";
const DATABASE_NAME = "db-name";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

var database, collection;

app.listen(port, () => {
	   
    MongoClient.connect(CONNECTION_URL,  { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        require('./app/routes')(app, database);
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

});
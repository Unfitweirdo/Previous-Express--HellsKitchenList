const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db, collection;

const url = "mongodb+srv://fwcII:ALBzrVFI9yCvvNwy@cluster0.06k88.mongodb.net/?retryWrites=true&w=majority";
const dbName = "hellsFoodList";

app.listen(8000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    db.collection('foodTasks').find().toArray((err, result) => {
        if (err) return console.log(err)
        console.log(result)
        res.render('index.ejs', { foodTasks: result })
    })
})

app.post('/addFood', (req, res) => {
    db.collection('foodTasks').insertOne({
        foodTasks: req.body.foodTasks,
        completedFood: false
    }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved')
        res.redirect('/')
    })
})

app.put('/editFood', (req, res) => {
    console.log(req.body)
    db.collection('foodTasks')

        .findOneAndUpdate({ foodtasks: req.body.foodtasks, completedFood: false }, {

            $set: {
                completedFood: true
            }
        }, {
            sort: { _id: -1 },
            upsert: false
        }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        })
})

app.delete('/deleteFood', (req, res) => {
    db.collection('foodTasks').deleteMany({}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
    })
})
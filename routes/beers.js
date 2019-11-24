var express = require('express');
var router = express.Router();

const fs = require('fs');

// Get all beers
router.get('/', function (req, res, next) {
    let data = fs.readFileSync(__dirname + "/beers.json");
    res.send(JSON.parse(data));
});

// Get specific beer
router.get('/:id', function (req, res, next) {
    let data = fs.readFileSync(__dirname + "/beers.json");
    let dataArray = JSON.parse(data);

    for (let beer of dataArray) {
        if (beer.id === Number(req.params.id)) {
            return res.send(beer);
        }
    }

    // This is only called if no beer with the given id is found
    next(); // "next()" is what comes after "app.use('/api/beers', beerRouter);" in app.js
});

// Create beer
router.post('/', (req, res, next) => {
    let bodyObject = req.body;

    let filePath = __dirname + "/beers.json";
    let userArray = JSON.parse(fs.readFileSync(filePath));
    userArray.push(bodyObject);
    fs.writeFileSync(filePath, JSON.stringify(userArray));

    res.redirect("/api/beers/" + bodyObject.id);
});

// Update beer
router.put('/:id', (req, res, next) => {
    let bodyObject = req.body;

    let filePath = __dirname + "/beers.json";
    let dataArray = JSON.parse(fs.readFileSync(filePath));

    for (let i = 0; i < dataArray.length; i++) {
        let beer = dataArray[i];

        if (beer.id === Number(req.params.id)) {
            dataArray[i] = bodyObject;
            fs.writeFileSync(filePath, JSON.stringify(dataArray));
            return res.send(`Øl id ${bodyObject.id} er opdateret!`); // POSSIBLE PROBLEM: If the ID is changed to one that already exists - It's probably best not to allow changing the ID
        }
    }

    // This is only called if no beer with the given id is found
    next(); // "next()" is what comes after "app.use('/api/beers', beerRouter);" in app.js
});

// Delete beer
router.delete('/:id', (req, res, next) => {
    let filePath = __dirname + "/beers.json";
    let dataArray = JSON.parse(fs.readFileSync(filePath));

    for (let i = 0; i < dataArray.length; i++) {
        let beer = dataArray[i];

        if (beer.id === Number(req.params.id)) {
            dataArray.splice(i, 1);
            fs.writeFileSync(filePath, JSON.stringify(dataArray));
            return res.send(`Øl id ${req.params.id} er slettet!`);
        }
    }

    // This is only called if no beer with the given id is found
    next(); // "next()" is what comes after "app.use('/api/beers', beerRouter);" in app.js
});

module.exports = router;

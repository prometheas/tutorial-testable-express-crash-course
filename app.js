const express = require('express');
const StarWarsAPI = require('star-wars-api');
const swapi = new StarWarsAPI();
const winston = require('winston');

winston.configure({
    transports: [
        new winston.transports.Console()
    ]
});

const middleware = require('./lib/middleware');

const app = express();

app.set('logger', winston);
app.set('swapi', swapi);

app.get('/', middleware.querySwapi);

app.get('/', middleware.determineTitleForPerson);

app.get('/', (req, res) => {
    const h1Text = `${res.locals.title} ${res.locals.person.name}`;
    res.send(`<h1>${h1Text}</h1>`);
});

app.listen(3000);

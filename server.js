const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const quotation = getRandomElement(quotes);
    res.send({
        quote: quotation
    });
});

app.get('/api/quotes', (req, res, next) => {
    const personToQuote = req.query.person;
    if (personToQuote) {
        const quotesPerPerson = quotes.filter(quote => quote.person === personToQuote);
        res.send({ quotes: quotesPerPerson})
    } else {
        res.send({ quotes: []})
    }
});

app.post('/api/quotes', (req, res, next) => {

    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    };
    
    if (req.query.quote && req.query.person) {
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(400).send();
    }
});

app.listen(PORT);
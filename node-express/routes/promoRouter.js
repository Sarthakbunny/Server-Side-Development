const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
    })
    .get((req, res, next) => {
        res.end('Will send all the promos details');
    })
    .post((req, res, next) => {
        res.end(`Will add promo ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not allowed");
    })
    .delete((req, res, next) => {
        res.end('Deleting all the promos');
    });

promoRouter.route('/:promoId')
    .get((req, res, next) => {
        res.end(`Will send the promo: ${req.params.promoId} details`);
    })
    .post((req, res, next) => {
        res.statusCode=403;
        res.end(`POST function not allowed`);
    })
    .put((req, res, next) => {
        res.write('Updating the promo : ' + req.params.promoId + '\n');
        res.end(`Will update the promo ${req.body.name} with details: ${req.body.description}`);
    })
    .delete((req, res, next) => {
        res.end('Deleting the promo: ' + req.params.promoId);
    });
    
module.exports = promoRouter;
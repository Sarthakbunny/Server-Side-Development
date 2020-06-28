const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
    })
    .get((req, res, next) => {
        res.end('Will send all the Leaders details');
    })
    .post((req, res, next) => {
        res.end(`Will add leader ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not allowed");
    })
    .delete((req, res, next) => {
        res.end('Deleting all the leaders');
    });

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        res.end(`Will send the Leader: ${req.params.leaderId} details`);
    })
    .post((req, res, next) => {
        res.statusCode=403;
        res.end(`POST function not allowed`);
    })
    .put((req, res, next) => {
        res.write('Updating the leader : ' + req.params.leaderId + '\n');
        res.end(`Will update the leader ${req.body.name} with details: ${req.body.description}`);
    })
    .delete((req, res, next) => {
        res.end('Deleting the leader: ' + req.params.leaderId);
    });
    
module.exports = leaderRouter;
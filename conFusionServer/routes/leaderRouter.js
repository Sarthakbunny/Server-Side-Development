const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leader');
const authentiacte = require('../authenticate');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get((req, res, next) => {
        Leaders.find({})
        .then((leaders)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leaders);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .post(authentiacte.verifyUser, (req, res, next) => {
        Leaders.create(req.body)
        .then((leader)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .put(authentiacte.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not allowed on /leader");
    })
    .delete(authentiacte.verifyUser, (req, res, next) => {
        Leaders.remove({})
        .then((leader)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    });

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
        .then((leader)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .post(authentiacte.verifyUser, (req, res, next) => {
        res.statusCode=403;
        res.end(`POST function not allowed on /leader/` + req.params.leaderId);
    })
    .put(authentiacte.verifyUser, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId,{
            $set: req.body
        },{new: true})
        .then((leader)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .delete(authentiacte.verifyUser, (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        },(err)=>next(err))
        .catch((err)=>next(err));
    });
    
module.exports = leaderRouter;
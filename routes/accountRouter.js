'use strict'
const log = console.log
var bodyParser = require('body-parser')
const express = require('express')

const accountRouter = express.Router()
var session = require('express-session')

accountRouter.use(express.static(__dirname + '/pub'))
accountRouter.use(bodyParser.urlencoded({
    extended: true
}))

accountRouter.use(bodyParser.json())
accountRouter.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

const { ObjectID } = require('mongodb')
const mongoose = require('../mongoose.js')
const { User } = require('./../models/user')
const { FrozenAccount } = require('./../models/frozenAccount')

// Route to freeze an account
// Request body: {id:..., username:..., reason: ...}
accountRouter.post('/freeze', (req, res) => {

    if(!req.body.id || !req.body.reason || !req.body.username || !ObjectID.isValid(req.body.id)) {
        res.status(400).send()
    }
    
    const id = req.body.id

    const frozen = new FrozenAccount({
        account_id: id,
        username: req.body.username,
        reason: req.body.reason,
        date: new Date()
    })

    User.findByIdAndUpdate(
        id,
        { status: 1},
        { new: true}
    ).then((user) => {
        if (!user) {
            res.status(404).send()
        }
    })
    .catch((err) => {
        res.status(500).send(err)
    })

    frozen.save().then((frozen) => {
        res.send(frozen)
    }).catch((err) => {
        res.status(400).send(err)
    })

})

// Route to unfreeze an account
accountRouter.delete('/unfreeze', (req, res) => {
    if(!req.body.id || !ObjectID.isValid(req.body.id)) {
        res.status(400).send()
    }

    const id = req.body.id
    console.log("id inside router")
    console.log(id)

    User.findByIdAndUpdate( id,
        { status: 0},
        { new: true}
    ).then((user) => {
        if (!user) {
            res.status(404).send()
        }
    }).catch((err) => {
        res.status(500).send(err)
    })

    FrozenAccount.deleteOne({ account_id: id })
    .then((account) => {
        if (!account) {
            res.status(404).send()
        } else {
            res.send(account)
        }
    }).catch((err) => {
        res.status(500).send(err)
    })

})

// Route to get all frozen accounts
accountRouter.get('/frozen', (req, res) => {
    FrozenAccount.find().then((accounts) => {
        res.send({ accounts })
    }).catch((err) => {
        res.status(500).send(err)
    })
}) 

// Route to get all active accounts
accountRouter.get('/active', (req, res) => {
    User.find({ status: 0} ).then((users) => {
        res.send({ users })
    }).catch((err) => {
        res.status(500).send(err)
    })
})

module.exports = accountRouter
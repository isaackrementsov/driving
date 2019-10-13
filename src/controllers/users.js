const User = require('../models/users');
const randomKey = require('random-key');
const { errorMsg, successMsg } = require('../server/util');

module.exports = {
    create: async (req, res) => {
        try {
            await User.create({username: req.body.username, password: req.body.password, balance: req.body.balance});
            res.json(successMsg());
        }catch(e){
            res.json(errorMsg('There was an issue adding the user', 500));
        }
    },

    login: async (req, res) => {
        try {
            let user = await User.findOne({username: req.body.username, password: req.body.password});

            if(user){
                const token = await randomKey.generate();

                await User.update({_id: user._id}, {$set: {token: token}});

                user.token = token;
                res.json({user});
            }else{
                res.json({user: null});
            }
        }catch(e){
            res.json(errorMsg('There was an issue logging you in', 500));
        }
    },

    getNonAdmin: async (req, res) => {
        try {
            let criteria = req.query.admin ? {admin: false} : {};
            let users = await User.find(criteria);

            res.json({users});
        }catch(e){
            res.json(errorMsg('There was an issue logging you in', 500));
        }
    },

    delete: async (req, res) => {
        try {
            await User.deleteOne({_id: req.params.id});

            res.json(successMsg());
        }catch(e){
            res.json(errorMsg('There was an issue deleting the user', 500));
        }
    },

    update: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, {balance: parseFloat(req.body.balance)});

            res.json(successMsg());
        }catch(e){
            res.json(errorMsg('There was an error updating the user', 500));
        }
    },

    get: async (req, res) => {
        try {
            let user = await User.findOne({token: req.query.token});

            res.json({user});
        }catch(e){
            res.json(errorMsg('There was an error getting the user', 500));
        }
    }
}

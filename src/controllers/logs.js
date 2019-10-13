const Log = require('../models/logs');
const User = require('../models/users');
const { errorMsg, successMsg } = require('../server/util');

module.exports = {
    get: async (req, res) => {
        try {
            let logs = await Log.find({username: User.find({token: req.query.token}).username}).sort({date: 'asc'}).populate('user');

            res.json({logs});
        }catch(e){
            res.json(errorMsg('There was an error getting logs', 500));
        }
    },

    create: async (req, res) => {
        try {
            await Log.create({
                user: req.body.user,
                date: req.body.date,
                rides: req.body.rides
            });

            res.json(successMsg());
        }catch(e){
            res.json(errorMsg('There was an error creating log', 500));
        }
    },

    delete: async (req, res) => {
        try {
            await Log.deleteOne({_id: req.params.id});

            res.json(successMsg());
        }catch(e){
            res.json(errorMsg('There was an error deleting log', 500));
        }
    }
}

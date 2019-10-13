const User = require('../models/users');
const config = require('../../config.json');
const stripe = require('stripe')(config.stripe_secret_key);
const { errorMsg, successMsg } = require('../server/util');

module.exports = {
    makePayment: async (req, res) => {
        try {
            const token = req.body.stripeToken;
            const charge = req.body.charge.toFixed(2);

            await stripe.charges.create({
                amount: 100*charge,
                currency: 'usd',
                description: 'Driving Charge',
                source: token,
                statement_descriptor: 'Driving Descriptor',
            });

            await User.update({token: req.body.token}, {$inc: {balance: charge}});
            res.json(successMsg());
        }catch(e){
            console.log(e);
            res.json(errorMsg('There was an error making the payment', 500));
        }
    }
}

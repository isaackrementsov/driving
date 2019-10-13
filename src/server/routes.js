const router = require('express').Router();
const users = require('../controllers/users');
const logs = require('../controllers/logs');
const payment = require('../controllers/payment');

module.exports = app => {
    app.use('/', router);

    router.get('/api/logs', logs.get);
    router.get('/api/users', users.getNonAdmin);
    router.get('/api/user', users.get);

    router.post('/api/logs/create', logs.create);
    router.post('/api/users/create', users.create);
    router.post('/api/login', users.login);
    router.post('/api/payment', payment.makePayment);

    router.patch('/api/users/update/:id', users.update);

    router.delete('/api/logs/delete/:id', logs.delete);
    router.delete('/api/users/delete/:id', users.delete);
}

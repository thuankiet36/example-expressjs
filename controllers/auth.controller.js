const db = require('../db');
const shortid = require('shortid'); // tạo short-id

module.exports.login = (req, res) => res.render('auth/login');

module.exports.postLogin = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({ email: email }).value(); // Trả về object chứa cả thông tin người dùng đó
    if(!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }

    if(user.password !== password) {
        res.render('auth/login', {
            errors: [
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    }

    res.cookie('userId', user.id); // Tạo cookie trước khi redirect
    res.redirect('/users');
}
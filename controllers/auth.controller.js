const md5 = require('md5');

const db = require('../db');

module.exports.login = (req, res) => res.render('auth/login');

module.exports.postLogin = (req, res) => {
    var email = req.body.email;
    var password = md5(req.body.password); //Mã hóa password

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

    res.cookie('userId', user.id, {
        signed: true  
    }); // Tạo cookie trước khi redirect

    res.redirect('/users');
}
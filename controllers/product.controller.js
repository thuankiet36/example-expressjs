const db = require('../db');

module.exports.index = (req, res) => {
    var page = parseInt(req.query.page) || 1; //n, nếu không có trang nào thì mặc định là trang thứ 1 page=1
    var perPage = 8; //x

    var start = (page-1) * perPage;
    var end = page * perPage;

    // var drop = (page-1) * perPage; //Sử dụng Lodash

    res.render('products/index', {
        products: db.get('products').value().slice(start, end),
        // products: db.get('products').drop(drop).take(perPage).value() // Sử dụng Lodash
    });
};
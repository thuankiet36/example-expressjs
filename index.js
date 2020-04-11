const express = require('express'); // Tạo ra một instance lưu trữ vào biến express
const bodyParser = require('body-parser'); // Sử dụng req.body
const low = require('lowdb'); // db.json
const FileSync = require('lowdb/adapters/FileSync'); // db.json

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [] })
  .write();

const app = express(); // Tạo ra một instance lữu trữ vào biến app

const port = 3000; 

app.set('view engine', 'pug'); // Cấu hình PUG
app.set('views', './views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.render('index', {
    name: 'Kiệt',
})); // Trả về html

app.get('/users', (req, res) => res.render('users/index', {
    users: db.get('users').value()
}));

app.get('/users/search', (req, res) => {
    var q = req.query.q;
    var matchUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
    });
    res.render('users/index', {
        users: matchUsers
    });
}); // Search dựa theo query parameters

app.get('/users/create', (req, res) => {
    res.render('users/create');
}); // Hiển thi (render) ra form create

app.post('/users/create', (req, res) => {
    db.get('users').push(req.body).write(); // Lưu trữ thông tin người dùng
    res.redirect('/users'); // Chuyển sang lại trang users
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)); 
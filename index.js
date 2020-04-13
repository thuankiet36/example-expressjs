const express = require('express'); // Tạo ra một instance lưu trữ vào biến express
const bodyParser = require('body-parser'); // Sử dụng req.body

const userRoute = require('./routes/user.route'); //Import từ user.route.js

const port = 3000; 

const app = express(); // Tạo ra một instance lữu trữ vào biến app
app.set('view engine', 'pug'); // Cấu hình PUG
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public')); // sử dụng Static files

app.get('/', (req, res) => res.render('index', {
    name: 'Kiệt',
})); // Trả về html

app.get('/styles/custom.css', (req, res) => {

})

app.use('/users', userRoute); // có thể check callback từ file user.route.js

app.listen(port, () => console.log('Server listening on port' + port)); 
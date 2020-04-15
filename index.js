require('dotenv').config();

const express = require('express'); // Tạo ra một instance lưu trữ vào biến express
const bodyParser = require('body-parser'); // Sử dụng req.body
const cookieParser = require('cookie-parser'); // Đọc req.cookies ở phía server

const userRoute = require('./routes/user.route'); //Import từ user.route.js
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');

const authMiddleware = require('./middlewares/auth.middleware');

const port = 3000; 

const app = express(); // Tạo ra một instance lữu trữ vào biến app
app.set('view engine', 'pug'); // Cấu hình PUG
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public')); // sử dụng Static files, public là folder public

app.get('/', (req, res) => res.render('index', {
    name: 'Coders Tokyo',
})); // Trả về html

app.use('/users', authMiddleware.requireAuth, userRoute); // có thể check callback từ file user.route.js, đặt middleware kiểm tra đăng nhập người dùng trước userRoute
app.use('/auth', authRoute);
app.use('/products', productRoute);

app.listen(port, () => console.log('Server listening on port' + port)); 
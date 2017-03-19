const express = require('express');
const session = require('express-session');
const parser = require('body-parser').urlencoded({ extended: false });
const { checkLogin, insertUser } = require('./db');

const app = express();
app.use(session({
    secret: 'sh72cjs2c92du82dhfd',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 5000
    }
}));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.listen(3000, () => console.log('Server started'));

app.get('/', (req, res) => res.send('Hello'));

app.get('/vaorap', (req, res) => {
    const request = req;
    if (typeof req.session.daMuaVe === 'number') {
        request.session.daMuaVe++;
        return res.send(`${request.session.username} Moi xem phim`);
    }
    res.send('Ban phai mua ve truoc');
});

app.get('/muave', (req, res) => {
    const request = req;
    request.session.daMuaVe = 1;
    request.session.username = 'PHO';
    res.send('Ban da mua ve');
});

app.get('/dangnhap', (req, res) => {
    res.render('dangnhap');
});

app.post('/dangnhap', parser, (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
    // res.send('XONG');
    checkLogin(username, password, err => {
        if (err) return res.send(`${err} `);
        res.send('Dang Nhap Thanh cong');
    });
});

app.get('/giaodich', (req, res) => {
    if (typeof req.session.daDangNhap === 'number') {
        return res.send('Giao dich');
    } 
    res.send('Vui long dang nhap');
});

app.get('/dangky', (req, res) => res.render('dangky'));

app.post('/dangky', parser, (req, res) => {
    const { username, password } = req.body;
    insertUser(username, password, (err, result) => {
        if (err) return res.send(`${err} `);
        res.send('Dang ky thanh cong');
    });
});
//User: {username, password} dang nhap, giao dich => Moi giao dich 
//Dang nhap => redirect giaodich

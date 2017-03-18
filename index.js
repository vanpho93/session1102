const express = require('express');
const session = require('express-session');

const app = express();
app.use(session({
    secret: 'sh72cjs2c92du82dhfd',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 5000
    }
}));

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

//User: {username, password} dang nhap, giao dich => Moi giao dich 
//Dang nhap => redirect giaodich

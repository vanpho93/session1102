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
    if (typeof req.session.daMuaVe === 'number') {
        req.session.daMuaVe++;
        return res.send('Moi xem phim');
    }
    res.send('Ban phai mua ve truoc');
});

app.get('/muave', (req, res) => {
    req.session.daMuaVe = 1;
    res.send('Ban da mua ve');
});

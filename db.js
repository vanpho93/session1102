const pg = require('pg');
const bcrypt = require('bcrypt');

const config = {
  user: 'postgres',
  database: 'NODE1102',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  max: 5,
  idleTimeoutMillis: 10000
};

const pool = new pg.Pool(config);

function queryDB(sql, arrayData, cb) {
    pool.connect((err, client, done) => {
        if (err) return cb(`${err} `);
        client.query(sql, arrayData, (queryErr, result) => {
            done(queryErr);
            if (queryErr) return cb(`${queryErr} `);
            cb(undefined, result);
        });
    });
}

function checkLogin(username, plainPassword, cb) {
    const sql = `SELECT username, password 
    FROM public."User" 
    WHERE username=$1`;
    queryDB(sql, [username], (err, result) => {
        if (err) return cb(err);
        if (result.rowCount === 0) return cb(new Error('Sai thong tin dang nhap'));
        const { password } = result.rows[0];
        bcrypt.compare(plainPassword, password, (errHash, same) => {
            if (errHash) return cb(errHash);
            if (!same) return cb(new Error('Sai thong tin dang nhap'));
            cb(undefined);
        });
    });
}

function insertUser(username, password, cb) {
    //TODO here
    bcrypt.hash(password, 10, (err, encrypt) => {
        const sql = 'INSERT INTO public."User"( username, password ) VALUES ($1, $2)';
        queryDB(sql, [username, encrypt], cb);
    });
}

// checkLogin('pho1', 'abc', (err, result) => {
//     if (err) return console.log(`${err}`);
//     if (result.rows.length === 0) return console.log('Kiem tra lai thong tin');
//     console.log('Dang nhap thanh cong');
// });

module.exports = { checkLogin, insertUser };


const pg = require('pg');

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

function checkLogin(username, password, cb) {
    const sql = `SELECT username, password 
    FROM public."User" 
    WHERE username=$1 AND "password"=$2`;
    queryDB(sql, [username, password], cb);
}

// checkLogin('pho1', 'abc', (err, result) => {
//     if (err) return console.log(`${err}`);
//     if (result.rows.length === 0) return console.log('Kiem tra lai thong tin');
//     console.log('Dang nhap thanh cong');
// });

module.exports = { checkLogin };


const bcrypt = require('bcrypt');

bcrypt.hash('khoapham', 10, (err, encrypted) => {
    console.log(encrypted);
});

const encrypted = '$2a$10$FfzkiXHdRtJTnmuAR0yyA.B5D6H4k5Nkx8wUGgo6EdGfwBZTTBKGa';

bcrypt.compare('khoapham123', encrypted, (err, same) => {
    console.log(err);
    console.log(same);
});

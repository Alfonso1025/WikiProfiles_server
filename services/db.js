 const mysql      = require('mysql2');
const db = mysql.createConnection({
  host     : 'profilesusers.ce9vmqdoehtk.us-east-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'pilotoAviador',
  database : 'profilesusers'
});

module.exports=db  
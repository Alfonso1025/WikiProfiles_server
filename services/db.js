const mysql      = require('mysql2');
const db = mysql.createConnection({
  host     : 'alfonsodatabase.cfd2eq2xlttv.us-east-2.rds.amazonaws.com',
  user     : 'Alfonsoadmin',
  password : 'piloto25Aviador',
  database : 'profiles_users'
});

module.exports=db
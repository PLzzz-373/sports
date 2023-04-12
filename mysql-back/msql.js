const ms = require("ms");
const mysql = require("mysql");

const option = {
  host: "localhost",
  user: "root",
  password: "52553566",
  database: "keshe",
  port: "3306",
};

const con = mysql.createConnection(option);

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("数据库连接成功");
  }
});

setInterval(() => {
  con.query("SELECT 1");
}, 5000);

function sqlQuery(strSql, arr) {
  return new Promise((reslove, reject) => {
    con.query(strSql, arr, (err, result) => {
      if (err) {
        reject(err);
      } else {
        reslove(result);
      }
    });
  });
}

module.exports = sqlQuery;

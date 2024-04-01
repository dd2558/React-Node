const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;
const cors = require("cors");

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));

const db = mysql.createPool({
  host: "localhost",
  user: "dd2558",
  password: "gkehddnjs10",
  database: "bbs2",
});

app.get("/list", (req, res) => {
  const sqlQuery = "SELECT *FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});


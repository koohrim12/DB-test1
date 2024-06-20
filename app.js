// TODO
// 1. 테이블 만들어 보기
// 2. 만든 테이블 안네 내용 넣어보기
// 3. 넣은 내용 읽어보기 콘솔로
// 4. 특정 부분을 바꾸어보기 (업데이트)
// 5. 내용 지워 보기

const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/chinook.db");

// insert one row into the student table
db.run(
  `INSERT INTO student(name, email) VALUES('이종현', '1428ksu@gmail.com')`,
  function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  }
);

// close the database connection
db.close();

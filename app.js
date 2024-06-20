// TODO
// 1. 테이블 만들어 보기
// 2. 만든 테이블 안네 내용 넣어보기
// 3. 넣은 내용 읽어보기 콘솔로
// 4. 특정 부분을 바꾸어보기 (업데이트)
// 5. 내용 지워 보기

const sqlite3 = require("sqlite3").verbose();

// 데이터베이스 연결 생성
let db = new sqlite3.Database("./mydatabase.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the mydatabase.db SQLite database.");
});

// students 테이블 생성
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  )`,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Created students table.");
    }
  );

  // 데이터 추가
  let stmt = db.prepare("INSERT INTO students (name, age) VALUES (?, ?)");
  stmt.run("구하림", 24);
  stmt.run("구나경", 22);
  stmt.finalize();

  // 데이터 조회
  db.each("SELECT id, name, age FROM students", (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`${row.id}: ${row.name} - ${row.age} years old`);
  });
});

// 데이터베이스 연결 닫기
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Closed the database connection.");
});

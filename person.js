// TODO
// *1. 테이블 만들어 보기
// *2. 만든 테이블 안에 내용 넣어보기
// *3. 넣은 내용 읽어보기 콘솔로
// 4. 특정 부분을 바꾸어보기 (업데이트)
// 5. 내용 지워 보기

const sqlite3 = require("sqlite3").verbose();
// 데이터베이스 연결 생성

let db = new sqlite3.Database("./mydatabase2.db", (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("mydatabase.db SQLite 데이터베이스에 연결되었습니다.");
});

// 데이터 생성
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS persons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER
    )`
  ),
    (err) => {
      if (err) {
        console.error(err.message);
      }
    };
  console.log("Created person table.");

  // 데이터 추가

  let add = db.prepare(" insert into persons  (name,age) values(?, ?)");
  add.run("구하림", 24);
  add.run("구인수", 56);
  add.run("송이현", 30);
  add.run("김정수", 29);
  add.run("이연승", 30);
  add.run("정호연", 27);
  add.finalize();

  // 데이터 조회
  db.each("select id, name, age from persons", (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`${row.id}:${row.name} - ${row.age} old`);
  });
});

// 데이터베이스 연결 닫기
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("데이터 베이스 연결 닫았음");
});

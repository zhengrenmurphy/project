const sqlite3 = require('sqlite3');

let sqlDb;

// name the columns of our tables for localization
const columnNames = {
  userId: "id",
  userName: "name",
  userPass: "password",
  shortName: "shortName",
  shortCreator: "creator",
  shortURL: "url",
  // new update
  freetID: "freetID",
  isRefreet:"isRefreet",
  content: "content",
  creatorID: "creatorUserID",
  upvoteTableID: "upvoteTableID",
  upvoteStatus: "upvoteStatus",
  refreetID: "refreetID",
  refreetTableID: "refreetTableID",
  followedID: "followedID",
  followerID: "followerID",
  followTableID: "followTableID",
  freetParentID:"parentOfRefreetID",
  freetParentStatus:"statusOfParentFreet",

};
Object.freeze(columnNames);

function createDb() {
  console.log("created our db!");
  sqlDb = new sqlite3.Database('freetdb.db', function() {
    createUserTable();
    createShortsTable();
    // update 
    createFreetTable();
    createUpvoteTable();
    createFollowTable();
    createRefreetTable();
  });
};

function createUserTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS users (
    ${columnNames.userId} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.userName} TEXT NOT NULL UNIQUE,
    ${columnNames.userPass} TEXT NOT NULL

  )`);
  
};

function createShortsTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS shorts (
    ${columnNames.shortName} TEXT PRIMARY KEY,
    ${columnNames.shortURL} TEXT NOT NULL,
    ${columnNames.shortCreator} INTEGER NOT NULL,
    FOREIGN KEY(${columnNames.shortCreator})
    REFERENCES users(${columnNames.userId})
  )`);
};



// update
function createFreetTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS freets (
    ${columnNames.freetID}  INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.creatorID}  INTEGER NOT NULL,
    ${columnNames.content} TEXT NOT NULL, 
    ${columnNames.isRefreet} INTEGER NOT NULL DEFAULT "0", 
    FOREIGN KEY(${columnNames.creatorID})
    REFERENCES users(${columnNames.userID})
  )`);
};

// could be both promary and foreign and two foreign key with right syntax?
function createUpvoteTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS upvotes (
    ${columnNames.upvoteTableID}  INTEGER PRIMARY KEY AUTOINCREMENT,
    ${columnNames.creatorID}  INTEGER NOT NULL,
    ${columnNames.freetID}  INTEGER NOT NULL,
    ${columnNames.upvoteStatus} TINYINT(1) NOT NULL DEFAULT "1", 
    FOREIGN KEY(${columnNames.creatorID})
    REFERENCES users(${columnNames.userID})
    FOREIGN KEY(${columnNames.freetID})
    REFERENCES freets(${columnNames.freetID})
  )`);
};

function createFollowTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS follows (
    ${columnNames.followTableID} INTEGER PRIMARY KEY NOT NULL,
    ${columnNames.followerID} INTEGER NOT NULL,
    ${columnNames.followedID} INTEGER NOT NULL,
    FOREIGN KEY(${columnNames.followerID})
    REFERENCES users(${columnNames.userID})
    FOREIGN KEY(${columnNames.followedID})
    REFERENCES users(${columnNames.userID})
  )`);
};



function createRefreetTable() {
sqlDb.run(`CREATE TABLE IF NOT EXISTS refreets (
  ${columnNames.refreetTableID} INTEGER PRIMARY KEY NOT NULL,
  ${columnNames.freetParentID} INTEGER NOT NULL,
  ${columnNames.refreetID} INTEGER NOT NULL UNIQUE,
  ${columnNames.freetParentStatus} INTEGER NOT NULL DEFAULT "1", 
  FOREIGN KEY(${columnNames.freetParentID})
  REFERENCES freets(${columnNames.freetID})
  FOREIGN KEY(${columnNames.refreetID})
  REFERENCES freets(${columnNames.freetID})
)`);
};


// Helper wrapper functions that return promises that resolve when sql queries are complete.

function run(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.run(sqlQuery, (err) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
};

function get(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.get(sqlQuery, (err, row) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(row);
      }
    })
  });
};

function all(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.all(sqlQuery, (err, rows) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
};

createDb();

module.exports = {
  columnNames,
  get,
  all,
  run,
};
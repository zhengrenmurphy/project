const sqlite3 = require("sqlite3");

let sqlDb;

const columnName={
  businessType:'businessType',
  username: 'username',
  password:'password',
  firstName:'firstName',
  lastName:'lastName',
  email:'email'
}

function createDb() {
  console.log("created our db!");
  sqlDb = new sqlite3.Database("koshdb.db", function() {
    createUserTable();
    createBusinessTable();
    createCustomerReservationTable();
    createBusinessReservationTable();
  });
}

function createUserTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS user (
      businessType INTEGER CHECK (businessType IN (0,1)),
      username TEXT NOT NULL UNIQUE PRIMARY KEY,
      password TEXT NOT NULL,
      email TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL
    )`);
}

function createBusinessTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS business (
      businessID INTEGER PRIMARY KEY AUTOINCREMENT,
      claimed INTEGER CHECK (claimed IN(0, 1)),
      username TEXT UNIQUE,
      businessName TEXT NOT NULL,
      street TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip TEXT NOT NULL,
      openStatus INTEGER CHECK (openStatus IN (0,1, 2)),
      takeout INTEGER CHECK (takeout IN (0,1,2)), 
      delivery INTEGER CHECK (delivery IN (0,1,2)), 
      outdoor INTEGER CHECK (outdoor IN (0,1,2)), 
      indoor INTEGER CHECK (indoor IN (0,1,2)), 
      indoorShopping INTEGER CHECK (indoorShopping IN (0,1,2)), 
      curbside INTEGER CHECK (curbside IN (0,1,2)), 
      safety INTEGER CHECK (safety IN (0,1,2)), 
      parking INTEGER CHECK (parking IN (0,1,2)), 
      mask INTEGER CHECK (mask IN (0,1,2)), 
      capacity INTEGER,
      hourFrom TEXT, 
      hourTo TEXT, 
      dayFrom TEXT,
      dayTo TEXT,
      facebook TEXT,
      ins TEXT,
      twitter TEXT,
      description TEXT,
      lat NUMERIC,
      lng NUMERIC,
      FOREIGN KEY (username)
      REFERENCES user(username)
    )`);
}

function createCustomerReservationTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS customerReservation (
      id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      time TEXT NOT NULL,
      businessName TEXT NOT NULL,
     
      FOREIGN KEY (username)
      REFERENCES user(username)
    )`);
}

function createBusinessReservationTable() {
  sqlDb.run(`CREATE TABLE IF NOT EXISTS businessReservation (
      username TEXT NOT NULL UNIQUE PRIMARY KEY,
      businessName TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      length INTEGER NOT NULL,
      timeFrom TEXT NOT NULL,
      timeTo TEXT NOT NULL,
      monday TEXT NOT NULL,
      tuesday TEXT NOT NULL,
      wednesday TEXT NOT NULL,
      thursday TEXT NOT NULL,
      friday TEXT NOT NULL,
      saturday TEXT NOT NULL,
      sunday TEXT NOT NULL,
      FOREIGN KEY (username)
      REFERENCES user(username)
    )`);
}

function run(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.run(sqlQuery, (err) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function get(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.get(sqlQuery, (err, row) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function all(sqlQuery) {
  return new Promise((resolve, reject) => {
    sqlDb.all(sqlQuery, (err, rows) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

createDb();

module.exports = {
  get,
  all,
  run,
  columnName
};

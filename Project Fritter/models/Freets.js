const db = require('../db/db_config');

class Freets {
    /**
     * view all freets
     */
    static async findAll() {
        return db.all(`SELECT * FROM freets LEFT OUTER JOIN users ON freets.${db.columnNames.creatorID} = users.${db.columnNames.userId} `);
    }

    /**
     * get the freets by an ID
     */
    static async get(userID) {        
        return db.all(`SELECT * FROM freets LEFT OUTER JOIN users ON freets.${db.columnNames.creatorID} = users.${db.columnNames.userId} WHERE ${db.columnNames.creatorID} == '${userID} ' `);
    }

    /**
     * delete the freets by an ID
     */
    static async delete(userID) {      
        return Freets.get(userID)
              .then( (userRecord) => {
                db.run(`DELETE FROM freets WHERE ${db.columnNames.creatorID} = '${userID}'`);
                return userRecord;
              });  

    }
    /**
     * delete the freets by an freetID
     */
    static async deleteFromFreetID(freetID) {      
        return Freets.get(freetID)
              .then( (userRecord) => {
                db.run(`DELETE FROM freets WHERE ${db.columnNames.freetID} = '${freetID}'`);
                return userRecord;
              });  

    }
    /**
     * insert the freets
     */
    static async set(userID, freetContent) {
        return db.run(`INSERT INTO freets (${db.columnNames.creatorID}, ${db.columnNames.content}) VALUES ('${userID}', '${freetContent}')`)
                  .then(() => {
                    return Freets.get(userID);
                  });
      }
    /**
     * set the refreets
     */
      static async setRefreet(userID, freetContent, status) {
        // first insert the short into the DB and wait for completion
        // and then fetch the new short from the DB

        // (${db.columnNames.userName}, ${db.columnNames.password})
        return db.run(`INSERT INTO freets (${db.columnNames.creatorID}, ${db.columnNames.content}, ${db.columnNames.isRefreet}) VALUES ('${userID}', '${freetContent}', '${status}')`)
                  .then(() => {
                    return Freets.get(userID);
                  });
      }
     /**
     * check whether a freet exists
     */
      static async has(freetIDNum) {  
        let freetRecord = await db.get(`SELECT * FROM freets WHERE ${db.columnNames.freetID} == '${freetIDNum}'`);
        if (freetRecord){
            return true;
        }else{
            return false;
        }
        // return db.get(`SELECT * FROM users WHERE ${db.columnNames.userName} == '${name}'`);
    }
    /**
     * get the refreets
     */
    static async getFromFreetID(freetIDNum) {        
        return db.get(`SELECT * FROM freets WHERE ${db.columnNames.freetID} == '${freetIDNum}'`);
    }

    static async getNewUpdatefreet() {        
      return db.get(`SELECT * FROM freets ORDER BY ${db.columnNames.freetID} DESC`);
    }

    static async getRefreet() {        
      return db.get(`SELECT * FROM freets ORDER BY ${db.columnNames.freetID} DESC`);
    }

    static async updateContent(freetIDNum, freetContent) {
        return db.run(`UPDATE freets 
            SET ${db.columnNames.content} = '${freetContent}' 
            WHERE ${db.columnNames.freetID} = '${freetIDNum}'`)
            .then( () => {
              return Freets.getFromFreetID(freetIDNum);
            });
      }





}
module.exports = Freets;
const db = require('../db/db_config');

class Refreets {

    /**
     * insert a refreet
     */
    static async set(parentFreetId, refreetID) {
        return db.run(`INSERT INTO refreets (${db.columnNames.freetParentID}, ${db.columnNames.refreetID}) VALUES ('${parentFreetId}', '${refreetID}')`)
                  .then(() => {
                    return Refreets.get(refreetID);
                  });
      }
    /**
     * get a refreet
     */    
    static async get(refreetID) {        
        return db.all(`SELECT * FROM refreets WHERE ${db.columnNames.refreetID} == '${refreetID}'`);
    }
    /**
     * gett a refreet
     */
    static async getRefreetFromOriginal(refreetID) {      
        return db.all(`SELECT * FROM refreets WHERE ${db.columnNames.freetParentID} == '${refreetID}'`);
    }

    /**
     * update a refreet
     */
    static async updateParentStatus(freetIDNum) {
        let newStatus = 0;
        return db.run(`UPDATE refreets 
            SET ${db.columnNames.freetParentStatus} = '${newStatus}' 
            WHERE ${db.columnNames.freetParentID} = '${freetIDNum}'`)
            
      }


    static async deleteFromParentFreetID(freetID) {          
        return db.run(`DELETE FROM refreets WHERE ${db.columnNames.refreetID} = '${freetID}'`);
    }

    

}
module.exports = Refreets;
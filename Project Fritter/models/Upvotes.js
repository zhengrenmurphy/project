const db = require('../db/db_config');

class Upvotes {
    /**
     * Add an Upvote.
     * 
     * @param {integer} creatorID
     * @param {integer} freetID
     *
     * @return {Upvote} - created Upvote
     */
    static async addOne(creatorID, freetID) {
        return db.run(`INSERT INTO upvotes (${db.columnNames.freetID}, ${db.columnNames.creatorID}, ${db.columnNames.upvoteStatus}) VALUES ( '${freetID}', '${creatorID}', '1')`)
            .then(() => {
            return Upvotes.findOne(creatorID, freetID);
            });
    }

    /**
     * Find an Upvote by creatorID and freetID.
     * 
     * @param {integer} creatorID
     * @param {integer} freetID
     *
     * @return {Upvote}
     */
    static async findOne(creatorID, freetID) {
        return db.get(`SELECT * FROM upvotes WHERE ${db.columnNames.creatorID} = ${creatorID} 
        AND ${db.columnNames.freetID} = ${freetID}`);
    }

    /**
     * Find an Upvote by creatorID and freetID.
     * 
     * @param {integer} freetID
     *
     * @return {Upvote}
     */
    static async countOne(freetID) {
        let record = db.all(`SELECT COUNT(*) as "sum" FROM upvotes WHERE ${db.columnNames.freetID} = ${freetID} AND ${db.columnNames.upvoteStatus} = "1"`);
        return record;
    }


    

    /**
     * Return an array of all the Upvotes.
     * 
     * @return {Upvote[]}
     */
    static async findAll() {
        return db.all(`SELECT * FROM upvotes`);
    }

    /**
     * Update an Upvote with a new status (0 for withdrawn, 1 for upvoted).
     * 
     * @param {integer} creatorID
     * @param {integer} freetID
     * @param {integer} status
     * 
     * @return {Upvote | undefined}
     */
     static async updateOne(creatorID, freetID, upvoteStatus) {
        return db.run(`UPDATE upvotes 
        SET ${db.columnNames.upvoteStatus} = ${upvoteStatus} 
        WHERE ${db.columnNames.creatorID} = ${creatorID} AND ${db.columnNames.freetID} = ${freetID}`)
        .then( () => {
          return Upvotes.findOne(creatorID, freetID);
        });
     }

     /**
      * Delete an Upvote by creatorID and freetID.
      * 
      * @param {integer} creatorID
      * @param {integer} freetID
      * 
      * @return {Upvote | undefined}
      */
     static async deleteOne(creatorID, freetID) {
        return Upvotes.findOne(creatorID, freetID)
        .then( (upvote) => {
          db.run(`DELETE FROM upvotes WHERE ${db.columnNames.creatorID} = ${creatorID}
          AND ${db.columnNames.freetID} = ${freetID}`);
          return upvote;
        });
     }

     /**
      * Delete all Upvotes associated with userID
      * 
      * @param {integer} userID
      * 
      * @return {Upvote | undefined}
      */
     static async deleteUser(userID) {
        return Upvotes.findAll()
        .then( (upvotes) => {
            db.run(`DELETE FROM upvotes WHERE ${db.columnNames.creatorID} = ${userID}`);
            return upvotes;
        });
     }
}
module.exports = Upvotes;
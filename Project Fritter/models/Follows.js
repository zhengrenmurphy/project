
const db = require('../db/db_config');

class Follows {
    /**
     * Add a Follows relation.
     * 
     * @param {integer} followerID
     * @param {integer} followedID
     *
     * @return {Follow} - created Follows
     */
    static async addOne(followerID, followedID) {
        return db.run(`INSERT INTO follows (${db.columnNames.followerID}, ${db.columnNames.followedID}) 
        VALUES ( ${followerID}, ${followedID})`)
              .then(() => {
                return Follows.findOne(followerID, followedID);
              });
    }

    /**
     * Find a Follows relation between followerID and followingID.
     * 
     * @param {integer} followerID
     * @param {integer} followedID
     *
     * @return {Follows} 
     */
    static async findOne(followerID, followedID) {
        return db.get(`SELECT * FROM follows WHERE ${db.columnNames.followerID} = ${followerID} 
        AND ${db.columnNames.followedID} = ${followedID}`);
    }

    /**
     * Find all users that a user is following, by followerID. 
     * 
     * @param {integer} followerID
     * 
     * @return {Follows[]}
     */
    static async findFollowing(followerID) {
        return db.all(`SELECT followedID FROM follows WHERE ${db.columnNames.followerID} = ${followerID}`);
    }

    /**
     * Find all users that follow a user, by followedID.
     * 
     * @param {integer} followedID
     * 
     * @return {Follows[]}
     */
    static async findFollowers(followedID) {
        return db.all(`SELECT followerID FROM follows WHERE ${db.columnNames.followedID} = ${followedID}`);
    }

    /**
     * Return an array of all the Follows.
     * 
     * @return {Follows[]}
     */
    static async findAll() {
        return db.all(`SELECT * FROM follows`);
    }

     /**
      * Deletes a Follows relation.
      * 
      * @param {integer} followerID
      * @param {integer} followedID
      * 
      * @return {Follow | undefined}
      */
     static async deleteOne(followerID, followedID) {
        return Follows.findOne(followerID, followedID)
        .then( (followRelation) => {
          db.run(`DELETE FROM follows WHERE ${db.columnNames.followerID} = ${followerID} 
          AND ${db.columnNames.followedID} = ${followedID}`);
          return followRelation;
        });
     }

     /**
      * Deletes all entries involving user.
      * 
      * @param {integer} userID
      * 
      * @return {Follow | undefined}
      */
     static async deleteUser(userID) {
        return Follows.findFollowers(userID)
        .then( (followers) => {
            db.run(`DELETE FROM follows WHERE ${db.columnNames.followerID} = ${userID} 
            OR ${db.columnNames.followedID} = ${userID}`);
            return followers;
        });
     }
}
module.exports = Follows;
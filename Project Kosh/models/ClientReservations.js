const db = require("../db/db_config");

/**
 * @typeof ClientReservations
 *
 * @prop {string} username - name of user
 * @prop {number} id - unique id of the reservation
 * @prop {string} time - name of user
 * @prop {string} businessName - name of business they made a reservation at
 */

/**
 * @class ClientReservations
 *
 * Stores all ClientReservations.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class ClientReservations {
  /**
   * Add a ClientReservation.
   *
   * @prop {string} username - name of user
   * @prop {string} time - name of user
   * @prop {string} businessName - name of business they made a reservation at
   * @return {ClientReservation} - created user reservation
   */
  static addUserRes(username, time, businessName) {
    return db
      .run(
        `INSERT INTO customerReservation (username, time, businessName) VALUES ('${username}', '${time}', '${businessName}')`
      )
      .then(() => {
        return {username, time, businessName}
      });
  }

  /**
   * Find a ClientReservation for User by id.
   * @param {number} id - id of ClientReservation
   * @return {ClientReservation| undefined} - ClientReservation if found
   */
  static async findOneRes(id) {
    return await db.get(`SELECT * FROM customerReservation WHERE id = '${id}'`);
  }

  /**
   * Find all ClientReservations for User.
   * @param {string} username - username of User
   * @return {ClientReservation[] | []} - all ClientReservations found for User
   */
  static findAllRes(username) {
    return db.all(`SELECT businessName, GROUP_CONCAT(time) AS time, GROUP_CONCAT(id) AS id FROM (SELECT * FROM customerReservation WHERE username = '${username}') GROUP BY businessName`).then(clientRes => {
      return clientRes
    });
  }
  
  /**
   * Find all ClientReservations for Business.
   * @param {string} businessName - name of Business
   * @return {ClientReservation[] | []} - all ClientReservations found for User
   */
  static async findAllResBusiness(businessName) {
    return await db.all(`SELECT GROUP_CONCAT(username) AS username, time FROM customerReservation WHERE businessName = '${businessName}' GROUP BY time`);
  }

  /**
   * Delete a ClientReservation.
   * 
   * @param {number} id - id of ClientReservation to be deleted
   */
  static async deleteOne(id) {
    return ClientReservations.findOneRes(id)
          .then( (UserRes) => {
            if(UserRes !== undefined){
                db.run(`DELETE FROM customerReservation WHERE id = '${id}'`);
            }
          });
  }
}

module.exports = ClientReservations;
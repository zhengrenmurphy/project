const db = require("../db/db_config");

/**
 * @typeof BusinessReservations
 *
 * @prop {string} username
 * @prop {number} capacity
 * @prop {number} length 
 * @prop {string} timeFrom
 * @prop {string} timeTo 
 * @prop {string} monday
 * @prop {string} tuesday 
 * @prop {string} wednesday 
 * @prop {string} thursday 
 * @prop {string} friday 
 * @prop {string} saturday 
 * @prop {string} sunday 
 */

/**
 * @class BusinessReservations
 *
 * Stores all BusinessReservations.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class BusinessReservations {
  /**
   * Add a BusinessReservation.
   * @param {string} username - username of business owner
   * @param {string} businessName - name of business
   * @param {number} capacity - reservation capacity for that week for clients
   * @param {number} length - time slot reservation length
   * @param {string} timeFrom - opening time of business
   * @param {string} timeTo - closing time of business
   * @param {string} monday - stringified array of checkbox values for monday
   * @param {string} tuesday - stringified array of checkbox values for tuesday
   * @param {string} wednesday - stringified array of checkbox values for wednesday
   * @param {string} thursday - stringified array of checkbox values for thursday
   * @param {string} friday - stringified array of checkbox values for friday
   * @param {string} saturday - stringified array of checkbox values for saturday
   * @param {string} sunday - stringified array of checkbox values for sunday
   * @return {BusinessReservation} - created user reservation
   */
  static addBusinessResTable(username, businessName, capacity, length, timeFrom, timeTo, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
    return db
      .run(
        `INSERT INTO businessReservation (username, businessName, capacity, length, timeFrom, timeTo, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('${username}', '${businessName}', ${capacity}, ${length}, '${timeFrom}', '${timeTo}', '${monday}', '${tuesday}', '${wednesday}', '${thursday}', '${friday}', '${saturday}', '${sunday}')`
      )
      .then(() => {
        return {username, businessName, capacity, length, timeFrom, timeTo, monday, tuesday, wednesday, thursday, friday, saturday, sunday}
      });
  }

  /**
   * Get BusinessReservations Table.
   * @param {string} username - name of business
   * @return {BusinessReservation| undefined} - ClientReservation if found
   */
  static async getResTable(username) {
    return await db.get(`SELECT * FROM businessReservation WHERE username = '${username}'`)
  }

  /**
   * Get BusinessReservations Table by businessName.
   * @param {string} businessName - name of business
   * @return {BusinessReservation| undefined} - ClientReservation if found
   */
  static async getResTableClient(businessName) {
    return await db.get(`SELECT * FROM businessReservation WHERE businessName = '${businessName}'`)
  }
  
  /**
   * Edit BusinessReservations Table.
   * @param {string} username - username of business owner
   * @param {number} capacity - reservation capacity for that week for clients
   * @param {number} length - time slot reservation length
   * @param {string} timeFrom - opening time of business
   * @param {string} timeTo - closing time of business
   * @param {string} monday - stringified array of checkbox values for monday
   * @param {string} tuesday - stringified array of checkbox values for tuesday
   * @param {string} wednesday - stringified array of checkbox values for wednesday
   * @param {string} thursday - stringified array of checkbox values for thursday
   * @param {string} friday - stringified array of checkbox values for friday
   * @param {string} saturday - stringified array of checkbox values for saturday
   * @param {string} sunday - stringified array of checkbox values for sunday
   * @return {BusinessReservation[] | []} - all BusinessReservations found for User
   */
  static async editBusinessResTable(username, capacity, length, timeFrom, timeTo, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
    return await db.get(`UPDATE businessReservation SET capacity=${capacity}, length=${length}, timeFrom='${timeFrom}', timeTo='${timeTo}', monday='${monday}', tuesday='${tuesday}', wednesday='${wednesday}', thursday='${thursday}', friday='${friday}', saturday='${saturday}', sunday='${sunday}' WHERE username = '${username}'`)
  }
}

module.exports = BusinessReservations;
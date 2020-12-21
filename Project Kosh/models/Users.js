const db = require("../db/db_config");

/**
 * @typeof User
 *
 * @prop {string} username - id of the user
 * @prop {string} firstName - name of user
 * @prop {string} lastName - name of user
 * @prop {string} password - password
 * @prop {string} email - email
 * @prop {integer} businessType - client = 0, business = 1
 */

/**
 * @class Users
 *
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  /**
   * Add a User.
   *
   * @param {string} username - User name
   * @param {string} firstName - User name
   * @param {string} lastName- User name
   * @param {string} email - User name
   * @param {string} password - User name
   * @param {integer}businessType -businessType
   * @return {User} - created user
   */
  static async addOne(username, firstName, lastName, email, password, businessType) {
    // first insert the user into the db then fetch the user from the DB
    return db
      .run(
        `INSERT INTO user (businessType, username, firstName, lastName, email, password) VALUES ('${businessType}', '${username}', '${firstName}', '${lastName}', '${email}', '${password}')`
      )
      .then(() => Users.findOne(username));
  }

  /**
   * Find a User by username.
   * @param {string} username - username of User to find
   * @return {User | undefined} - found User
   */
  static async findOne(username) {
    return await db.get(`SELECT * FROM user WHERE username = '${username}'`);
  }

  /**
   * Find a User by email.
   * @param {string} email - email of User to find
   * @return {User | undefined} - found User
   */
  static async findOneEmail(email){
    return await db.get(`SELECT * FROM user WHERE email = '${email}'`);
  }
  /**
   * Check password
   * @param {string} username - username
   * @param {string} password - password
   * @return {boolean} - true/false
   */
  static async checkPassword(username, password) {
    return (await this.findOne(username)).password === password;
  }

  /**
   * Check if user is a business 
   * @param {string} username - username
   * @return {boolean} - true(if business)/false
   */
  static async isBusiness(username){
    return await db.get(`SELECT businessType FROM user WHERE username = '${username}'`);
  }

  /**
   * Return an array of all of the Users.
   * @return {User[]}
   */
  static async findAll() {
    return await db.all(`SELECT * FROM user`);
  }
   /**
   * Update first Name.
   * 
   * @param {string} username- username
   * @param {string} firstName - new firstName
   * @return {string | undefined} - updated firstName
   */
  static async updateFirstName(username, firstName) {
    return db.run(`UPDATE user 
          SET firstName = '${firstName}' 
          WHERE username = '${username}'`)
          .then( () => {
            return firstName;
          });

  }

   /**
   * Update last Name.
   * 
   * @param {string} username- username
   * @param {string} lastName - new lastName
   * @return {string | undefined} - updated lastName
   */
  static async updateLastName(username, lastName) {
      return db.run(`UPDATE user 
          SET lastName = '${lastName}' 
          WHERE username = '${username}'`)
          .then( () => {
            return lastName;
          });
  
  }
   /**
   * Update username.
   * 
   * @param {string} username- username
   * @param {string} newUsername - new username
   * @return {string | undefined} - updated username
   */
  static async updateUsername(username, newUsername) {
    return db.run(`UPDATE user 
          SET username = '${newUsername}' 
          WHERE username = '${username}'`)
          .then( () => {
            return newUsername;
          });
 
  }
   /**
   * Update password.
   * 
   * @param {string} username- username
   * @param {string} password - new password
   * @return {string | undefined} - updated paswword
   */
  static async updatePassword(username, password) {
      return db.run(`UPDATE user 
          SET password = '${password}' 
          WHERE username = '${username}'`)
          .then( () => {
            return username;
          });
    
  }
   /**
   * Update email.
   * 
   * @param {string} username- username
   * @param {string} email - new email
   * @return {string | undefined} - updated email
   */
  static async updateEmail(username, email) {
      return db.run(`UPDATE user 
          SET email = '${email}' 
          WHERE username = '${username}'`)
          .then( () => {
            return email;
          });
  
  }

  /**
   * Delete an account.
   * 
   * @param {string} username - username of user to delete
   * @return {Short | undefined} - deleted user
   */
  static async deleteOne(username) {
    return Users.findOne(username)
          .then( (User) => {
            db.run(`DELETE FROM user WHERE username = '${username}'`);
            return User;
          });
  }
}

module.exports = Users;

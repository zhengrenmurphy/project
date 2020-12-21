const db = require("../db/db_config");

class Business {
  /**
   * get all of the business information
   */
  static async findAll() {
    return await db.all(`SELECT * FROM business `);
  }

  /**
   * get all of the business information
   */
  static async findBusinessName(username) {
    return await db.all(`SELECT businessName FROM business WHERE username = '${username}'`);
  }

    /**
     * get all of the business information
     */
    static async findAllLocation() {
        return await db.all(`SELECT lat, lng FROM business `);
    }

    /**
     * get all of the business information which has takeout services
     */
    static async findAllTakeout() {
        let takeoutTrue = 1;
        return await db.all(`SELECT * FROM business WHERE takeout = '${takeoutTrue}'`);
    }

    /**
     * get all of the business information which has delivery services
     */
    static async findAllDelivery() {
        let deliveryTrue = 1;
        return await db.all(`SELECT * FROM business WHERE delivery = '${deliveryTrue}'`);
    }

    /**
     * get all of the business information which has outdoor services
     */
    static async findAllOutdoor() {
        console.log("there");
        let outdoorTrue = 1;
        return await db.all(`SELECT * FROM business WHERE outdoor = '${outdoorTrue}'`);
    }

    


  /**
   * get the business information by the business ID
   */
  static async get(busiID) {
    return await db.all(
      `SELECT * FROM business WHERE businessID = '${busiID}' `
    );
  }

  /**
   * get the business information by the business ID
   */
  static async getFromName(busiName) {
    return db.all(`SELECT * FROM business WHERE businessName = '${busiName}' `);
  }


    static async getFromPattern(pattern) {
        return db.all(`SELECT * FROM business WHERE LOWER(businessName) LIKE '${pattern.toLowerCase()}%'`)
    }
    /**
     * get the business information by the business ID
     */
    static async getFromUser(userName) {        
        return await db.all(`SELECT * FROM business WHERE username = '${userName}' `);
    }

  /**
   * delete the business information by an ID
   */
  static async delete(busiID) {
    return Business.get(busiID).then((busiRecord) => {
      db.run(`DELETE FROM business WHERE businessID = '${busiID}'`);
      return busiRecord;
    });
  }

  /** 
   * delete the claim to a business by username, resetting username and
   * claim status of business
   */
  static async deleteClaim(userName) {
    const bName = await Business.getFromUser(userName).businessName;
    await db.run(
      `UPDATE business SET username=null, claimed=0 WHERE userName='${userName}'`
      )
      .then(() => {
        return Business.getFromName(bName);
      })
      .catch((err) => console.log(error));
  }

  /**
   * insert the business
   */
  static async setInfo(
    uName,
    bName,
    streetInfo,
    cityInfo,
    stateInfo,
    zipInfo,
    openInfo,
    takeoutInfo,
    deliInfo,
    outdoorInfo,
    indoorInfo,
    inShopInfo,
    curbInfo,
    safeInfo,
    parkInfo,
    maskInfo,
    capaInfo,
    hourFromInfo,
    hourToInfo,
    dayFromInfo,
    dayToInfo,
    fbInfo,
    insInfo,
    twInfo,
    desInfo,
    latInfo,
    lngInfo
  ) {
    return db
      .run(
        `INSERT INTO business (username, businessName, street, city, state, zip,
            openStatus, takeout, delivery, outdoor, indoor, indoorshopping,
            curbside, safety, parking, mask, capacity, hourFrom,
            hourTo, dayFrom, dayTo, facebook, ins, twitter, description, lat,lng, claimed) VALUES 
            ('${uName}', '${bName}', '${streetInfo}', '${cityInfo}', '${stateInfo}', '${zipInfo}', ${openInfo}, ${takeoutInfo},
             ${deliInfo}, ${outdoorInfo}, ${indoorInfo}, ${inShopInfo}, ${curbInfo}, ${safeInfo}, ${parkInfo}, 
             ${maskInfo}, '${capaInfo}', '${hourFromInfo}', '${hourToInfo}','${dayFromInfo}', '${dayToInfo}', '${fbInfo}', '${insInfo}', '${twInfo}',
             '${desInfo}', '${latInfo}', '${lngInfo}', 1)`
      )
      .then(() => {
        return Business.getFromName(bName);
      })
      .catch((err) => console.log(err));
  }

  /**
   * check whether a record exists
   */
  static async has(busiName) {
    let busiRecord = await db.get(
      `SELECT * FROM business WHERE businessName = '${busiName}'`
    );
    if (busiRecord) {
      return true;
    } else {
      return false;
    }
  }

  static async updateUsername(businame, username) {
    return await db
      .run(
        `UPDATE business
            SET username = '${username}' WHERE businessName = '${businame}'`
      )
      .then(() => {
        return Business.getFromName(businame);
      });
  }

  static async updateClaim(businessName) {
    return await db
      .run(
        `UPDATE business
            SET claimed = 1 WHERE businessName ='${businessName}'`
      )
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async getClaim(businessName) {
    let isClaimed = await db.get(
      `SELECT claimed FROM business WHERE businessName ='${businessName}'`
    );
    if (isClaimed) {
      return isClaimed.claimed ? true : false;
    } else {
      return false;
    }
  }

  static async uploadFile(businessName, file) {
    await db.run(
      `UPDATE business SET proof = '${file.originalname}' WHERE businessName ='${businessName}'`
    ).then().catch();
  }

  /**
   * update the business information
   * @param {*} freetIDNum
   * @param {*} freetContent
   */
  static async updateContent(
    uName,
    openInfo,
    takeoutInfo,
    deliInfo,
    outdoorInfo,
    indoorInfo,
    inShopInfo,
    curbInfo,
    safeInfo,
    parkInfo,
    maskInfo,
    capaInfo,
    hourFromInfo,
    hourToInfo,
    dayFromInfo,
    dayToInfo,
    desInfo,
    latInfo,
    lngInfo,
    facebookInfo,
    insInfo,
    twitterInfo,
    streetInfo,
    cityInfo,
    stateinfo,
    zipInfo
  ) {
    return await db
      .run(
        `UPDATE business 
            SET openStatus = '${openInfo}', takeout = '${takeoutInfo}',
            delivery = '${deliInfo}', outdoor = '${outdoorInfo}', indoor = '${indoorInfo}', indoorShopping = '${inShopInfo}', 
            curbside = '${curbInfo}', safety = '${safeInfo}', parking = '${parkInfo}', 
            mask = '${maskInfo}', capacity = '${capaInfo}', hourFrom = '${hourFromInfo}', hourTo = '${hourToInfo}',
            dayFrom = '${dayFromInfo}', dayTo = '${dayToInfo}', description = '${desInfo}', lat = '${latInfo}',lng = '${lngInfo}',
            facebook = '${facebookInfo}', ins = '${insInfo}',twitter= '${twitterInfo}', street = '${streetInfo}',
            city = '${cityInfo}', state = '${stateinfo}', zip = '${zipInfo}'
            WHERE username = '${uName}'`)
            .then( () => {
              return Business.getFromUser(uName);
            });
      }
}
module.exports = Business;

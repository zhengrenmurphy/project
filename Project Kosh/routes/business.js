const express = require("express");
const session = require("express-session");
var multer = require("multer");
const upload = multer({
  dest: './uploads',
});
const router = express.Router();

const Business = require("../models/Business");

// Convenience function for return sending an error response
const sendError = (res, status, errorMessage) => {
  return res.status(status).send(JSON.stringify({ errorMessage }));
};

// Convenience function for sending a success response
const sendSuccess = (res, body = {}) => {
  return res
    .status(200)
    .send(JSON.stringify(body))
    .end();
};

/**
 * Sign out
 * @name POST/api/business/signout
 * @throws {400} - if already signed out
 */
router.post("/signout", (req, res) => {
  try {
    req.session.username = null;
    res.status(200).json({ message: "You are signed out." });
  } catch {
    sendError(res, 400, "sign out fails!");
  }
  //     }
});

/**
 * Delete Business Account, only deletes username and claim fields, but
 * keep business info
 * @name put/api/business/claim
 * @throws {400} - if account not successfully deleted
 */
router.put("/claim", async(req, res) => {
  try {
    const userName = req.body.username;
    const account = await Business.deleteClaim(userName);
    return sendSuccess(res, account);
  } catch (error) {
    return sendError(res, 400, "Could not delete the claim to business account");
  }
});

/**
 * view business information
 * @name GET/api/business
 * @throws {400} could not find the records
 */
router.get("/", async(req, res) => {
    try{
        let busiRecord = await Business.findAll();
        return sendSuccess(res, busiRecord );
    } catch {
      return sendError(res, 400, "Could not get the business information!");
    }
    
  });

/**
 * get business name from username
 * @name GET/api/business
 * @throws {400} could not find the records
 */
router.get("/name/:username", async(req, res) => {
  try{
      let name = await Business.findBusinessName(req.params.username);
      res
        .status(200)
        .json({
            businessName: name[0].businessName,
            message: "Business Name Retrieved",
        })
        .end();
  } catch {
    return sendError(res, 400, "Could not get the business name!");
  }
  
});

/**
 * view business information which has takeout service
 * @name GET/api/business/takeout
 * @throws {400} could not find the records
 */
router.get("/takeout", async(req, res) => {
    try{
        let busiRecord = await Business.findAllTakeout();
        return sendSuccess(res, busiRecord );
    } catch {
      return sendError(res, 400, "Could not get the business information!");
    }
    
});

/**
 * view business location
 * @name GET/api/business/location
 * @throws {400} could not find the records
 */
router.get("/location", async(req, res) => {
  try{
      let busiRecord = await Business.findAllLocation();
      return sendSuccess(res, busiRecord );
  } catch {
    return sendError(res, 400, "Could not get the business information!");
  }
  
});

/**
 * view business information which has delivery service
 * @name GET/api/business/delivery
 * @throws {400} could not find the records
 */
router.get("/delivery", async(req, res) => {
    try{
        let busiRecord = await Business.findAllDelivery();
        return sendSuccess(res, busiRecord );
    } catch {
      return sendError(res, 400, "Could not get the business information!");
    }
    
  });

/**
 * view business information which has outdoor service
 * @name GET/api/business/outdoor
 * @throws {400} could not find the records
 */
  router.get("/outdoor", async(req, res) => {
    try{
        let busiRecord = await Business.findAllOutdoor();
        return sendSuccess(res, busiRecord );
    } catch {
      return sendError(res, 400, "Could not get the business information!");
    }
    
  });




/**
 * view a single business information
 * @name GET/api/business/single
 * @throws {400} could not find the records
 */
router.get("/single", async (req, res) => {
  try {
    const userName = req.session.username;
    let busiRecord = await Business.getFromUser(userName);
    console.log(busiRecord);

    return sendSuccess(res, busiRecord);
  } catch {
    return sendError(res, 400, "Could not get the business information!");
  }
});

  /**
   * Get business names that match search pattern
   * @name GET/api/business/search/:pattern?
   * @throws {400} could not find the records
   */
router.get("/search/:pattern?", async(req, res) => {
    try {
        let pattern = req.params.pattern;
        let busiRecords = await Business.getFromPattern(pattern);
        return sendSuccess(res, busiRecords);
    } catch {
        return sendError(res, 400, "Could not get businesses matching pattern");
    }
})  

/**
 * check if the business information exist or not
 * @name GET/api/business/exist
 * @throws {400} could not find the records
 */
router.get("/exist/:name", async (req, res) => {
  try {
    const businessName = req.params.name;
    // let busiRecord = await Business.get(422);
    let busiRecordExist = await Business.has(businessName);
    // let busiRecord = await Business.getFromUser(userName);
    return sendSuccess(res, busiRecordExist);
  } catch {
    return sendError(res, 400, "Could not get the business information!");
  }
});

/**
 * create new business information
 * @name POST/api/business/
 * @throws {400} could not insert the records
 */
router.post("/", async (req, res) => {
  const userName = req.body.username;
  try {
    const businessName = req.body.businame;
    const address = "";
    const city = "";
    const state = "";
    const zipcode = "";
    const openStatus = 2;
    const takeout = 2;
    const delivery = 2;
    const outdoor = 2;
    const indoor = 2;
    const indoorShopping = 2;
    const curbside = 2;
    const safety = 2;
    const parking = 2;
    const mask = 2;
    const capacity = 0;
    const hourFrom = "";
    const hourTo = "";
    const dayFrom = "";
    const dayTo = "";
    const facebook = "";
    const ins = "";
    const twitter = "";
    const description = "";
    const lat = 42.3737213; // defult coordinate, need manual modify after the new business enter in
    const lng = -71.09936191; // defult coordinate, need manual modify after the new business enter in
    await Business.setInfo(
      userName,
      businessName,
      address,
      city,
      state,
      zipcode,
      openStatus,
      takeout,
      delivery,
      outdoor,
      indoor,
      indoorShopping,
      curbside,
      safety,
      parking,
      mask,
      capacity,
      hourFrom,
      hourTo,
      dayFrom,
      dayTo,
      facebook,
      ins,
      twitter,
      description,
      lat,
      lng
    );
    res
      .status(200)
      .json({ message: "You have successfully added your business to kosh!" });
  } catch {
    return sendError(
      res,
      400,
      "Could not success fully update the business store"
    );
  }
});
/**
 * update the user information
 * @name PUT/api/business/updateuser
 * @throws {400} could not update the records
 */
router.put("/user", async (req, res) => {
  const username = req.body.username;
  const businessName = req.body.businame;
  try {
    const claimed = await Business.updateUsername(businessName, username);
    sendSuccess(res, claimed);
  } catch {
    return sendError(res, 400, "Could not update the username succefully");
  }
});

/**
 * @name POST/api/business/file/
 * @throws {400} could not upload
 */
router.post("/file/:business", upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    await Business.uploadFile(req.params.business, file);
    sendSuccess(res, "file uploaded");
  } catch {
    return sendError(res, 400, "Could not upload file");
  }
});

/**
 * claimed business
 * @name PUT/api/business/claim/
 * @throws {400} could not update
 */
router.put("/claim", async (req, res) => {
  const businessName = req.body.businessName;
  try {
    const businessRecord = await Business.updateClaim(businessName);
    sendSuccess(res, businessRecord);
  } catch {
    return sendError(res, 400, "Could not claim succefully");
  }
});

/**
 * is business claimed
 * @name GET/api/business/claim/
 * @thows {400} could not update
 */
router.get("/claim/:business", async (req, res) => {
  const businessName = req.params.business;
  try {
    const businessRecord = await Business.getClaim(businessName);
    sendSuccess(res, businessRecord);
  } catch {
    return sendError(res, 400, "Could not check claim succefully");
  }
});

/**
 * update new business information
 * @name PUT/api/business/update
 * @throws {400} could not update the records
 */
router.put("/", async (req, res, next) => {
  const userName = req.session.username;
  const businessRecord = await Business.getFromUser(userName);
  // const businessRecord = await Business.get(422);
  try {
    if (businessRecord) {
      var openStatus = 0;
      if (req.body.os.toString() === "true") {
        openStatus = 1;
      }

      if (req.body.to === true) {
        var takeout = 1;
      } else {
        var takeout = 0;
      }
      if (req.body.dl === true) {
        var delivery = 1;
      } else {
        var delivery = 0;
      }
      if (req.body.od === true) {
        var outdoor = 1;
      } else {
        var outdoor = 0;
      }
      if (req.body.ind === true) {
        var indoor = 1;
      } else {
        var indoor = 0;
      }
      if (req.body.inshop === true) {
        var indoorShopping = 1;
      } else {
        var indoorShopping = 0;
      }
      if (req.body.cs === true) {
        var curbside = 1;
      } else {
        var curbside = 0;
      }
      if (req.body.st === true) {
        var safety = 1;
      } else {
        var safety = 0;
      }
      if (req.body.pk === true) {
        var parking = 1;
      } else {
        var parking = 0;
      }
      if (req.body.mask === true) {
        var mask = 1;
      } else {
        var mask = 0;
      }
      if (req.body.lat === null) {
        var lat = 0;
      } else {
        var lat = req.body.lat;
      }
      if (req.body.lng === null) {
        var lng = 0;
      } else {
        var lng = req.body.lng;
      }
      if (req.body.fb === null) {
        var facebook = businessRecord.facebook;
      } else {
        var facebook = req.body.fb;
      }
      if (req.body.ins === null) {
        var ins = businessRecord.ins;
      } else {
        var ins = req.body.ins;
      }
      if (req.body.twitter === null) {
        var twitter = businessRecord.twitter;
      } else {
        var twitter = req.body.twitter;
      }

      var capacityInfo = req.body.capacity;
      var hourFrom = req.body.hourFrom;
      var hourTo = req.body.hourTo;
      var dayFrom = req.body.dayFrom;
      var dayTo = req.body.dayTo;
      var description = req.body.des;
      var street = req.body.street;
      var city = req.body.city;
      var state = req.body.state;
      var zip = req.body.zip;
      let newBusiInfo = await Business.updateContent(
        req.session.username,
        openStatus,
        takeout,
        delivery,
        outdoor,
        indoor,
        indoorShopping,
        curbside,
        safety,
        parking,
        mask,
        capacityInfo,
        hourFrom,
        hourTo,
        dayFrom,
        dayTo,
        description,
        lat,
        lng,
        facebook,
        ins,
        twitter,
        street,
        city,
        state,
        zip
      );
      sendSuccess(res, newBusiInfo);
    } else {
      return sendError(
        res,
        400,
        "The business information is not availabel anymore"
      );
    }
  } catch {
    return sendError(res, 400, "Could not update the business information");
  }
});
module.exports = router;

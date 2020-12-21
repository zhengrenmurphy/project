const express = require("express");
const session = require("express-session");
const router = express.Router();

const Users = require('../models/Users');
const Freets = require('../models/Freets');
const Upvotes = require('../models/Upvotes');
const Follows = require('../models/Follows');
const Refreets = require('../models/Refreets');
console.log("done");

router.use(session({ secret: "6170", resave: true, saveUninitialized: true }));

// Convenience function for return sending an error response
const sendError = (res, status, errorMessage) => {
  return res.status(status).send(JSON.stringify({ errorMessage }));
};

// Convenience function for sending a success response
const sendSuccess = (res, body = {}) => {
  return res.status(200).send(JSON.stringify(body));
};

// // for debugging purposes, log the request method and session id
// router.use(function (req, _, next) {
//   console.log(
//     "Processing " +
//       req.method +
//       " " +
//       req.url +
//       " session: " +
//       req.session.id +
//       " username: " +
//       req.session.username
//   );
//   req.requestTime = Date.now();
//   next();
// });

// view all freets or view freets by a certain author
router.get("/freets", async(req, res) => {
    console.log("newdone0");
    // view all freets by a certain author
    if ("author" in req.query) {
      // const username = req.query.author;

      // const myID = req.query.author;
      // const usernameInfo = await Users.getFromID(myID);
      const username = req.query.author;
      // update 5: cannot accept empty author name
      if (username.length === 0) {
        return sendError(res, 400, "Author name cannot be empty");
      };
      let userExist = await Users.has(username);
      if (userExist) {
        let userID = await Users.get(username);
        console.log(userID);
        let freetsRecord = await Freets.get(userID.id);
        return sendSuccess(res, freetsRecord);
      } else {
        return sendError(res, 400, "No user with name " + username);
      }
    }
    // view all freets
    else {

      let freetsRecord = await Freets.findAll();
      return sendSuccess(res, freetsRecord);
    }
  });


// Check that user is authenticated
router.use(function (req, res, next) {
    if ("uid" in req.session) {
      next();
    } else {
      return sendError(res, 400, "You aren't logged in");
    }
  });


// create a new freet
router.post("/freets", async(req, res, next) => {

    const myID = req.session.uid;
    const usernameInfo = await Users.getFromID(myID);
    const username = usernameInfo.name;
    try {
      const message = req.body.freetName;
      if (message.length > 140) {
        sendError(res, 400, "Freet must be no more than 140 characters!");
      }
      // create freet cannot accepts empty message
      if (message.length === 0) {
        return sendError(res, 400, "Freet must not be empty!");
      }
  
      let userInfo = await Users.get(username);
      await Freets.set(userInfo.id, message);
  
      let freetsRecord = await Freets.getNewUpdatefreet();
      //error
      sendSuccess(res, freetsRecord);
    } catch {
      return sendError(res, 400, "Expected a message for the new freet");
    }
  });

// get the username
router.get("/freets/owner", async(req, res, next) => {
  try {
    console.log("cool");
    // console.log(req.body);
    console.log(req.session.uid);
    console.log(req.query.id);
    // console.log(req.body.userID);

    if ( String(req.session.uid) === String(req.query.id)){
      console.log("here");
      return sendSuccess(res, true);
    }
    return sendSuccess(res, false);
  }catch {
    return sendError(res, 400, "owner!");
  }
});
  
// edit an existing freet
router.patch("/freets", async(req, res, next) => {
    console.log("unique");
    const myID = req.session.uid;
    const usernameInfo = await Users.getFromID(myID);
    const username = usernameInfo.name;
    try {
      const { id, content } = req.body;
      const freetId = String(id);
      const message = String(content);
  
      if (message.length > 140) {
        return sendError(res, 400, "Freet must be no more than 140 characters!");
      }
  
      // cannot accept an empty ID
      if (freetId.length === 0) {
        return sendError(res, 400, "Freet ID cannot be empty!");
      }
      let freetExist = await Freets.has(freetId);
      let freetInfo = await Freets.getFromFreetID(freetId);
      let userInfo = await Users.get(username);
      // we cannot update a refreet
      if (freetInfo.isRefreet === 1) {
        return sendError(res, 400, "You cannot edit a refreet!");
      }
      if (freetExist && freetInfo.creatorUserID === userInfo.id) {
        let newFreetInfo = await Freets.updateContent(freetId, message);
        //error
        return sendSuccess(res, newFreetInfo);
      } else if (
        freetExist &&
        freetInfo.creatorUserID !== userInfo.id
      ) {
        return sendError(res, 400, "Unauthorized to edit this freet");
      } else {
        return sendError(res, 400, "Freet with id " + freetId + "doesn't exist");
      }
    } catch {
      return sendError(res, 400, "Expected freetId and new message");
    }
  });
  
  
// delete a freet
router.delete("/freets", async(req, res, next) => {
    const myID = req.session.uid;
    const usernameInfo = await Users.getFromID(myID);
    const username = usernameInfo.name;
    try {
      const freetId = req.query.id;
      // we could not delete the freet if the freet ID is empty
      if (freetId.length === 0){
        return sendError(res, 400, "The freet ID cannot be empty");
      }    
  
      let freetInfo = await Freets.getFromFreetID(freetId);
      let userInfo = await Users.get(username);
  
      // user could only delete their own freets
      if (freetInfo.creatorUserID !== userInfo.id) {
        return sendError(res, 400, "Unauthorized to delete this freet");
      } else {
        let deleteFreetInfo = await Freets.deleteFromFreetID(freetId);
        await Refreets.updateParentStatus(freetId);
        return sendSuccess(res, deleteFreetInfo);
      }
    } catch {
      return sendError(res, 400, "Expected freetId");
    }
  });

  


// get the upvote count
router.get("/upvote", async (req, res) => {
  try {
    console.log(req.query);
    
    const freetID = req.query.id;
    const freets = await Upvotes.countOne(freetID);
    // console.log(freets);
    // console.log(freets.sum);
    // console.log(freets[0].sum);
    return sendSuccess(res, freets[0].sum);

  }
  
  catch (error) {
    return sendError(res, 400, "the upvote freet is invalid!");
  }
});

// upvote a freet
router.post("/upvote", async (req, res, next) => {
    try {
      const myID = req.session.uid;
      // const freetID = req.query.id;
      // console.log(req.query);
      // console.log(req.body);
      const freetID = req.body.id;
  
      // check that freet exists
      const freet = await Freets.has(freetID);
      if (freet) {
        // check if freet is already in Upvote table
        const upvote = await Upvotes.findOne(myID, freetID);
        if (upvote) {
          // check status
          if (upvote.upvoteStatus === 0) {
            const newUpvote = await Upvotes.updateOne(myID, freetID, 1);
            return sendSuccess(res, { upvote: newUpvote });
          }
          else {
            return sendError(res, 400, "You've already upvoted this freet!");
          }
        }
        // create new entry if new upvote
        else {
          const newUpvote = await Upvotes.addOne(myID, freetID);
          return sendSuccess(res, newUpvote);
        }
      }
      else {
        return sendError(res, 400, "Freet with id " + String(freetID) + " doesn't exist");
      }
    }
    catch (error) {
      return sendError(res, 400, "Could not upvote the freet");
    }
  });
  
  // withdraw an upvote for a freet
  router.patch("/upvote", async (req, res) => {
    try {
      const myID = req.session.uid;
      const freetID = req.body.id;
  
      // check that freet exists
      const freet = await Freets.has(freetID);
      if (freet) {
        // check if freet is already in Upvote table
        const upvote = await Upvotes.findOne(myID, freetID);
        if (upvote) {
          // check status
          if (upvote.upvoteStatus === 1) {
            const newUpvote = await Upvotes.updateOne(myID, freetID, 0);
            return sendSuccess(res, { upvote: newUpvote });
          } else {
            return sendError(res, 400, "You've already withdrawn your upvote for this freet!");
          }
        } else {
          return sendError(res, 400, "You haven't upvoted this freet yet");
        }
      } else {
        return sendError(res, 400, "Freet with id " + String(freetID) + " doesn't exist");
      }
    } catch (error) {
      return sendError(res, 400, "Could not withdraw the upvote for the freet");
    }
  });

  // refreets from a original freets
router.post("/refreets", async (req, res, next) => {
    console.log('wow');
    console.log(req.body);
    console.log(req.query);
    const myID = req.session.uid;
    const usernameInfo = await Users.getFromID(myID);
    const username = usernameInfo.name;
    try {
    
      const freetID = req.body.id;
      if (freetID.length === 0){
        return sendError(res, 400, "The freet ID cannot be empty!");
      }
      let freetInfo = await Freets.getFromFreetID(freetID);
      // if the parent freet does not exist, we cannot refreet
      if (!freetInfo){
        return sendError(res, 400, "Freet ID does not exist!");
      }
      let userInfo = await Users.get(username);
      let isFreetStatus = 1;
      let userFreet = await Freets.setRefreet(userInfo.id, freetInfo.content, isFreetStatus );
      let refreetInfo = await Freets.getRefreet();
      let refreet = await Refreets.set(freetID, refreetInfo.freetID);
      return sendSuccess(res, refreetInfo);
  
    }
    catch {
      return sendError(res, 400, "Expected a message for the new refreet");
    }
  
  
  });
  
  // get the refreets from a freet ID
  router.get("/refreets", async (req, res, next) => {
    const myID = req.session.uid;
    const usernameInfo = await Users.getFromID(myID);
    const username = usernameInfo.name;
    try{
    const freetId = req.query.id;
    if (freetId.length === 0){
        return sendError(res, 400, "The freet ID cannot be empty");
    }
    let freetInfo = await Freets.getFromFreetID(freetId);
    let refreetInfo = await Refreets.getRefreetFromOriginal(freetId);
    // if the parent freet does not exist, we cannot get the refreets
    if (!freetInfo && !refreetInfo){
        return sendError(res, 400, "Freet ID does not exist!");
    }
    let refreetRecord = await Refreets.getRefreetFromOriginal(parseInt(freetId));
    return sendSuccess(res, refreetRecord );
    }
    catch {
      return sendError(res, 400, "Expected a message for the new refreet");
    }
  
  });
  
  // for most of the /freets endpoints, return the list of all freets
  router.use("/freets", async function (_, res) {
    let freetsRecord = await Freets.findAll();
    //error
    return sendSuccess(res, freetsRecord);
  });
  
  router.use(function (req, res) {
    return sendError(res, 404, "The resource you're looking for does not exist");
  });
  
  module.exports = router;
  
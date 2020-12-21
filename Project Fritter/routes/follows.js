const express = require('express');

const Follows = require('../models/Follows');
const Users = require('../models/Users');

const v = require('./validators');

const router = express.Router();


// follow a user
router.post(
  "/",
  [
  v.ensureUserLoggedIn,
  ],
  async (req, res) => {
  try {
    const myID = req.session.uid;
    const theirId = req.body.name;

    console.log(`myID: ${myID}, theirId: ${theirId}`);


    const follow = await Follows.addOne(myID, theirId);
    //sendSuccess(res, follow);
    res.status(201).json({ message: "Successfully followed user" }).end();

  } catch (error) {
    res.status(400).json({error : error.message});
  }
});


// unfollow a user
router.put(
  "/",
  [
  v.ensureUserLoggedIn,
  ],
  async (req, res) => {
  try {
    const myID = req.session.uid;
    const theirId = req.body.name;
    console.log(req.body);

    console.log(`myID: ${myID}, theirId: ${theirId}`);


    const follow = await Follows.deleteOne(myID, theirId);
    //sendSuccess(res, follow);
    res.status(201).json({ message: "Successfully unfollowed user" }).end();

  } catch (error) {
    res.status(400).json({error : error.message});
  }
});


// get following
router.get(
  "/following",
  [
  v.ensureUserLoggedIn,
  ],
  async (req, res) => {
  try {
    const myID = req.session.uid;

    const following = await Follows.findFollowing(myID);
    //sendSuccess(res, follow);
    var new_following = [];

    for (const x of following) {
      const user = await Users.getFromID(x.followedID);
      new_following.push(user);
    };
    res.status(201).json({following : new_following}).end();

  } catch (error) {
    res.status(400).json({error : error.message});
  }
});


// get followers
router.get(
  "/followers",
  [
  v.ensureUserLoggedIn,
  ],
  async (req, res) => {
  try {
    const myID = req.session.uid;

    const followers = await Follows.findFollowers(myID);
    let new_followers = [];
    for (const x of followers) {
      const user = await Users.getFromID(x.followerID);
      new_followers.push(user);
    };
    res.status(201).json({followers : new_followers}).end();

  } catch (error) {
    res.status(400).json({error : error.message});
  }
});

module.exports = router;
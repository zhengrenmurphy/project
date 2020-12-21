const express = require("express");

const Users = require("../models/Users");

const router = express.Router();

/**
 * Get all users.
 *
 * @name GET /api/users
 * @throws {503} - if can't fetch users
 */
router.get("/", [], async (req, res) => {
  try {
    // fetch all user from the DB
    let users = Users.findAll();
    res
      .status(200)
      .json(users)
      .end();
  } catch (error) {
    res
      .status(503)
      .json({ error: "Could not fetch users" })
      .end();
  }
});

/**
 * Get single user
 * @name GET/api/clients/:username?
 * @throws {503} - if can't fetch users
 */
router.get("/:username?", [], async (req, res) => {
  try{
    // fetch single user from the DB
    let user = await Users.findOne(req.session.username);

    res
      .status(200)
      .json(user)
      .end();
  } catch (error) {
    res
      .status(503)
      .json({ error: "Could not fetch user" })
      .end();
  }
});

/**
 * Sign out
 * @name POST/api/clients/signout
 * @throws {400} - if already signed out
 */
router.post("/signout", (req, res) => {
  if (req.session.username == null) {
    res.status(400).json({ error: "You are already signed out." });
  } else {
    req.session.username = null;
    res.status(200).json({ message: "You are signed out." });
  }
});

/**
 * Create new user.
 *
 * @name POST /api/clients
 * @return {username} - the created username
 * @throws {400} - if username/password empty
 * @throws {403} - if name or email is already taken
 * @throws {401} - if not signed in
 */
router.post("/", async (req, res) => {
  if (req.session.username == null) {
    if (
      req.body.username.length === 0 ||
      req.body.password.length === 0 ||
      req.body.email.length === 0 ||
      req.body.firstName.length === 0 ||
      req.body.lastName.length === 0
    ) {
      res.status(400).json({
        error:
          "The username, password, email, firstName, lastName must be at least 1 character.",
      });
    } else if (await Users.findOne(req.body.username)) {
      res.status(403).json({ error: "This username already exists." });
    } else if (await Users.findOneEmail(req.body.email)) {
      res.status(403).json({ error: "This email already exists." });
    } else {
      await Users.addOne(
        req.body.username,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password,
        req.body.businessType
      );
      res
        .status(200)
        .json({
          username: req.body.username,
          message: "Username created, please sign in!",
        })
        .end();
    }
  } else {
    res.status(401).json({ error: "Please sign out to create a new user." });
  }
});

/**
 * Sign in
 * @name POST/api/clients/signin/:username?
 * @param {username} - username to sign in
 * @return {username} - current username
 * @throws {400} - if username/password empty
 * @throws  {401} - if password is incorrect or if already signed in
 * @throws {404} - if username does not exist
 */
router.post("/signin/:username?", async (req, res) => {
  if (req.session.username == null) {
    if (req.params.username.length === 0 || req.body.password.length === 0) {
      res.status(400).json({
        error: "The username and password must be at least 1 character.",
      });
    } else if (!(await Users.findOne(req.params.username))) {
      res.status(404).json({ error: "The username does not exists" });
    } else {
      if (await Users.checkPassword(req.params.username, req.body.password)) {
        req.session.username = req.params.username;
        let isBusiness = await Users.isBusiness(req.params.username);
        res
          .status(200)
          .json({
            isBusiness: isBusiness.businessType,
            message: "You are signed in.",
          })
          .end();
      } else {
        res.status(401).json({ error: "Wrong password" });
      }
    }
  } else {
    res.status(401).json({ error: "You are already signed in." });
  }
});

/**
 * Update first name
 * @name PUT/api/clients/firstname/:firstname
 * @param {firstname} - new firstname
 * @return {firstname} - new firstname
 * @throws {400} - if username empty
 * @throws {401} - if not signed in
 */
router.put("/firstname/:firstname?", async (req, res) => {
  if (req.session.username == null) {
    res.status(401).json({ error: "Please sign in to update first name." });
  } else {
    if (req.params.firstname.length === 0) {
      res
        .status(400)
        .json({ error: "The first name must be at least 1 character." });
    } else {
      await Users.updateFirstName(req.session.username, req.params.firstname);
      res
        .status(200)
        .json({ message: "First name updated" })
        .end();
    }
  }
});

/**
 * Update last name
 * @name PUT/api/clients/lastname/:lastname
 * @param {lastname} - new lastname
 * @throws {400} - if username empty
 * @throws {401} - if not signed in
 */
router.put("/lastname/:lastname?", async (req, res) => {
  if (req.session.username == null) {
    res.status(401).json({ error: "Please sign in to update last name." });
  } else {
    if (req.params.lastname.length === 0) {
      res
        .status(400)
        .json({ error: "The last name must be at least 1 character." });
    } else {
      await Users.updateLastName(req.session.username, req.params.lastname);
      res
        .status(200)
        .json({ message: "Last name updated" })
        .end();
    }
  }
});

/**
 * Update username
 * @name PUT/api/clients/username/:username?
 * @param {username} - new username
 * @return {username} - new username
 * @throws {400} - if username empty
 * @throws {401} - if not signed in
 * @throws {403} - if username already exists
 */
router.put("/username/:username?", async (req, res) => {
  if (req.session.username == null) {
    res.status(401).json({ error: "Please sign in to update first name." });
  } else if (req.params.username.length === 0) {
    res
    .status(400)
    .json({ error: "The username must be at least 1 character." });
  }else{
      let user = await Users.findOne(req.params.username)
      if (user){
        res.status(403).json({ error: "This username already exist." });
      }else{
        await Users.updateUsername(req.session.username, req.params.username);
        req.session.username = req.params.username;
        res
          .status(200)
          .json({ message: "Username updated" })
          .end();
      }
  }

});

/**
 * Update password
 * @name PUT/api/clients/password/
 * @throws {400} - if password empty
 * @throws {401} - if not signed in
 */
router.put("/password", async (req, res) => {
  if (req.session.username == null) {
    res.status(401).json({ error: "Please sign in to update password." });
  } else {
    if (req.body.password.length === 0) {
      res
        .status(400)
        .json({ error: "The password must be at least 1 character." });
    } else {
      await Users.updatePassword(req.session.username, req.body.password);
      res
        .status(200)
        .json({ message: "Password updated" })
        .end();
    }
  }
});

/**
 * Update email
 * @name PUT/api/clients/email/
 * @throws {400} - if email empty
 * @throws {401} - if not signed in
 * @throws {403} -f email already exists
 */
router.put("/email", async(req, res) => {
  if (req.session.username == null) {
    res.status(401).json({ error: "Please sign in to update email." });
  } else if (req.body.email.length === 0) {
      res
        .status(400)
        .json({ error: "The email must be at least 1 character." });
  }else if(await Users.findOneEmail(req.body.email)){
    res.status(403).json({ error: "This email already exist." });
  } else {
      
      await Users.updateEmail(req.session.username, req.body.email);
      res
        .status(200)
        .json({ message: "Email updated" })
        .end();
    }
});


/**
 * Delete a user.
 * 
 * @name DELETE /api/clients/
 * @return {User} - the deleted user
 * @throws {401} - if not signed in
 */
router.delete('/', async (req, res) => {
  if (req.session.username == null) {
    res.status(401).json({ error: "Please sign in to delete account." });
  }else{
    await Users.deleteOne(req.session.username);
    req.session.username = null;
    res.status(200)
    .json({message: "Deleted account"})
    .end();
  }
    
});

module.exports = router;

const express = require("express");

const BusinessReservations = require("../models/BusinessReservations");

const router = express.Router();

/**
 * Create new BusinessReservation table.
 *
 * @name POST /api/businessRes/add
 * @return {BusinessReservation} - the created client reservation
 * @throws {401} - if not signed in
 */
router.post("/add", (req, res) => {
    BusinessReservations.addBusinessResTable(req.body.username, req.body.businessName, req.body.capacity, req.body.length, req.body.timeFrom, req.body.timeTo, req.body.monday, req.body.tuesday, req.body.wednesday, req.body.thursday, req.body.friday, req.body.saturday, req.body.sunday).then((businessResTable)=> {
        res
        .status(200)
        .json({
            table: businessResTable,
            message: "Business Reservataion Table created!",
        })
        .end();
    });

});

/**
 * Get BusinessReservation table for business.
 *
 * @name GET /api/businessRes
 */
router.get("/", [], async (req, res) => {
    try {
      let reservationTable = await BusinessReservations.getResTable(req.session.username);
      res
        .status(200)
        .json(reservationTable)
        .end();
    } catch (error) {
      res
        .status(503)
        .json({ error: "No reservations table!" })
        .end();
    }
  });

  /**
 * Get BusinessReservation table for client.
 *
 * @name GET /api/businessRes/client
 */
router.get("/client/:businessName", [], async (req, res) => {
  try {
    let reservationTable = await BusinessReservations.getResTableClient(req.params.businessName);
    res
      .status(200)
      .json(reservationTable)
      .end();
  } catch (error) {
    res
      .status(503)
      .json({ error: "No reservations table!" })
      .end();
  }
});

/**
 * Update BusinessReservation table
 * @name PUT /api/businessRes/edit
 * @param {username} - new username
 * @return {username} - new username
 * @throws {401} - if not signed in
 */
router.put("/edit", async (req, res) => {
    if (req.session.username == null) {
      res.status(401).json({ error: "Please sign in to edit reservation table" });
    } else{
        let reservationTable = await BusinessReservations.editBusinessResTable(req.session.username, req.body.capacity, req.body.length, req.body.timeFrom, req.body.timeTo, req.body.monday, req.body.tuesday, req.body.wednesday, req.body.thursday, req.body.friday, req.body.saturday, req.body.sunday)
        res
        .status(200)
        .json({
            table: reservationTable,
            message: "Business Reservataion Table edited!",
        })
        .end();
    }
  
  });

  module.exports = router;
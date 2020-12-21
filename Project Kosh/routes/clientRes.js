const express = require("express");

const ClientReservations = require("../models/ClientReservations");

const router = express.Router();

/**
 * Get all ClientReservations for User.
 *
 * @name GET /api/clientRes
 * @throws {503} - if no reservations exist
 */
router.get("/", [], async (req, res) => {
  try {
    let reservations = await ClientReservations.findAllRes(req.session.username);
    reservations = reservations.map(reservation=> {
        return {
            businessName: reservation.businessName,
            time: reservation.time.replace(/,/g, "").split(/(?<=\M)/),
            id: reservation.id.split(',')
        }
    })
    res
      .status(200)
      .json(reservations)
      .end();
  } catch (error) {
    res
      .status(404)
      .json({ error: "No reservations made!" })
      .end();
  }
});

/**
 * Get all ClientReservations for Business.
 *
 * @name GET /api/clientRes/business
 */
router.get("/business/:businessName", [], async (req, res) => {
    try {
      let reservations = await ClientReservations.findAllResBusiness(req.params.businessName);
      res
        .status(200)
        .json(reservations)
        .end();
    } catch (error) {
      res
        .status(404)
        .json({ error: "No reservations made!" })
        .end();
    }
  });

/**
 * Create new ClientReservation.
 *
 * @name POST /api/clientRes/add
 * @return {ClientReservation} - the created client reservation
 * @throws {403} - if reservation is already made for that user
 * @throws {401} - if not signed in
 */
router.post("/add", (req, res) => {
  if (req.session.username !== null) {
    ClientReservations.findAllRes(req.session.username).then((reservations)=> {
        if (reservations !== undefined){
            reservations = reservations.filter(reservation => {
                if(reservation.businessName === req.body.businessName && req.body.time.includes(reservation.time)){
                    return reservation
                }
            }).map(res => res.time)
            if (reservations.length !== 0) {
              req.body.time = req.body.time.filter(time => {
                if(!reservations.includes(time)){
                    return time
                }
              })
            }
        } 
        if(req.body.time.length !== 0){
            req.body.time.forEach(time => {
                ClientReservations.addUserRes(
                    req.session.username,
                    time,
                    req.body.businessName
            
                    ).then((clientRes) => {
                    res
                    .status(200)
                    .json({
                        reservation: clientRes,
                        message: "Reservation created!",
                    })
                    .end();
                });
            })
        } else {
            res
            .status(200)
            .json({
                message: "Reservation already existed!",
            })
            .end();
}
    })
  } else {
    res.status(401).json({ error: "Please signin to create a reservation." });
  }
});

/**
 * Delete a ClientReservation.
 * 
 * @name DELETE /api/clientRes/delete
 */
router.delete('/delete', async (req, res) => {
    await ClientReservations.deleteOne(req.body.id);
    res.status(200)
    .json({message: "Deleted reservation."})
    .end();
});

module.exports = router;
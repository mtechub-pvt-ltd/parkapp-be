const express = require("express"),
router=express.Router();

const controller = require("../controllers/parkingCapacityController")

router.post ("/addCapacity" ,controller.addCapacity);
router.get ("/getParkingCapacity" , controller.parkingCapacity);
// router.get ("/getParkingsByUserId/:userId" , controller.getParkedCarsByUserId);
// router.delete("/deleteParking/:parkingId", controller.deleteParkings);
// router.put ("/unPark" , controller.unPark);

module.exports = router;

const express = require("express"),
router=express.Router();

const controller = require("../controllers/parkedCarsController")

router.post ("/parkVehicle" ,controller.parkCar);
router.get ("/getParkings" , controller.getParkedCars);
router.get ("/getOnlyParkedCars" , controller.getOnlyParkedCars);
router.get ("/getParkingsByUserId/:userId" , controller.getParkedCarsByUserId);
router.delete("/deleteParking/:parkingId", controller.deleteParkings);
router.put ("/unPark" , controller.unPark);
router.put("/updateParking", controller.updateParking);
router.get("/parking_count", controller.getParkingCount);
router.get("/getParkedVehicles_in_parking", controller.getParkedVehicles_in_parking);


module.exports = router;


const express = require("express"),
router=express.Router();
const upload = require("../middlewares/multer")

const controller = require("../controllers/locationController")

router.post ("/createLocation" , upload.array("images") ,controller.createLocations);
router.get ("/getAllLocations" , controller.getLocations);
router.delete("/deleteLocation/:location_id", controller.deleteLocation);
router.put ("/updateLocation" ,upload.array("images") , controller.updateLocation);
router.get("/getLocationByType" , controller.getLocationByType)
router.get("/getLocationByTypeWithOnePic" , controller.getLocationByTypeWithOnePic)
router.get("/getAllLocationWithOnePic" , controller.getAllLocationsWithOnePic)
router.get("/getLocationById/:location_id" , controller.getLocationById)




module.exports = router;
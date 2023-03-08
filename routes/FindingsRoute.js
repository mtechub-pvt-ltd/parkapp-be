const express = require("express"),
router=express.Router();

const controller = require("../controllers/FindingController")

router.post ("/addFindings" ,controller.addFindings);
router.get ("/getAllFindings" , controller.getFindings);
// router.get ("/getFindingsByPlaceType/:placeType" , controller.getFindingsByPlaceType);
router.get ("/getFindingsByUserId/:userId", controller.getFindingsByUserId);
router.get ("/getUserFindingForLocation", controller.getFindingsByLocId_userId);
router.delete("/deleteFindings/:findingsId", controller.deleteFindings);
router.put ("/updateFindings" , controller.updateFindings);
router.get ("/getAllSavedLocIfFindingsNotExist" , controller.getAllLocIfFindingsNotExist);
router.get ("/getAllSavedLocIfFindingsNotExistByUserId/:userId" , controller.getAllLocIfFindingsNotExistByUserId);



module.exports = router;
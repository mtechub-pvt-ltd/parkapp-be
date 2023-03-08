const express = require("express"),
router=express.Router();

const controller = require("../controllers/contactController")

router.post("/createContactDetails" ,controller.addContactDetails);
router.get("/getContactDetail" , controller.getContactDetails);
router.delete("/deleteContactDetail/:contactDetailId",controller.deleteContactDetail);

module.exports = router;
const express = require("express"),
router=express.Router();

const controller = require("../controllers/titleController")

router.post ("/addTitle" ,controller.addTitle);
router.get ("/getTitles" , controller.getTitles);
router.delete("/deleteTitle/:titleId", controller.deleteTitle);
router.put ("/updateTitle" , controller.updateTitle);
module.exports = router;
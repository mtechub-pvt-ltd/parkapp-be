const express = require("express"),
router=express.Router();

const controller= require("../controllers/userController");


router.post("/createUser",controller.createUser)
router.get("/getUser/:userId",controller.getUser)
router.get("/getAllUsers/",controller.getAllUser)
router.delete("/deleteUser/:userId",controller.deleteUser)
router.put("/updateUser",controller.updateUser)


module.exports=router ;
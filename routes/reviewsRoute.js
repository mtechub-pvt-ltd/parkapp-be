
const express = require("express"),
router=express.Router();

const controller = require("../controllers/reviewController")
const upload = require("../middlewares/multer")

router.post ("/createReview",upload.single("picture") ,controller.createReview);
router.get ("/getAllReviews" , controller.getAllReviews);
router.get ("/getReviewsByUserId/:user_id" , controller.getReviewsByUserId);
router.delete("/deleteReview/:review_id", controller.deleteReview);
router.put ("/updateReview" ,upload.single("picture"), controller.updateReview);
router.get ("/getReviewsByLocation",controller.getReviewsByLocation);

module.exports = router;
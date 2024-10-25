const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage}= require("../cloudConfig.js");
const upload = multer({storage:storage});

router
    .route("/")
    .get(wrapAsync(listingController.index))//Index Route
    .post(isLoggedIn,
        upload.single("listing[image]"),
        wrapAsync(listingController.createListing)); //create route

//to create new route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router.route("/:id")
.get(wrapAsync(listingController.ShowListing)) //show route
.put(isLoggedIn, isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingController.updateListing)) //update route
.delete(isLoggedIn, isOwner,wrapAsync(listingController.deleteListing)); //delete route


//to edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
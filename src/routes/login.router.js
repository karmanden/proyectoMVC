const router = require("express").Router();
const controller = require("../controller/login.controller");
const passport = require("passport");

router.get("/login", controller.getLogin);
router.post("/login", passport.authenticate("auth", {
    successRedirect: '/dashboard',
    failureRedirect: "/login",
    failureFlash: true
}), controller.postLogin);

module.exports = router;

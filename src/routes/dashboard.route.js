const router = require("express").Router();
const controller = require("../controller/dashboard.controller");

router.get("/dashboard", controller.isAuthenticated, controller.getDashboard);

router.get('/update', controller.isAuthenticated, controller.getUpdateDateClient)
router.get('/reservar', controller.isAuthenticated, controller.getReservar)

router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/');
})
module.exports = router;

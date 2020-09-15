const router = require("express").Router();
const controller = require("../../controller/client/client.controller");


router.get('/client', controller.isAuthenticated, controller.getClient)
router.get('/client/reserva', controller.isAuthenticated, controller.getClientReserva)


router.post('/client/update', controller.isAuthenticated, controller.postUpdateDateClient)

router.get('/habitacion/available', controller.isAuthenticated, controller.getHabitacionesLibres)
router.post('/habitacion/agregar', controller.isAuthenticated, controller.postReservarHabitacion)
router.post('/habitacion/eliminar', controller.isAuthenticated, controller.deleteReserva)

module.exports = router
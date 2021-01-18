const router = require('express').Router()
const stationCtrl = require('../controllers/stationCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/stations')
    .get(stationCtrl.getStations)
    .post(auth, authAdmin, stationCtrl.createStation)

router.route('/stations/:Id')
    .delete(auth, authAdmin, stationCtrl.deleteStation)
    .put(auth, authAdmin, stationCtrl.updateStation)
    .get(auth, authAdmin, stationCtrl.getStation)

module.exports = router
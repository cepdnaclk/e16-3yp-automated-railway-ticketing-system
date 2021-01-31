const router = require('express').Router()
const uncomTravelCtrl = require('../controllers/UncomTravelCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const check = require('../middleware/check') 

router.route('/:Id')
    .get(auth, authAdmin, uncomTravelCtrl.getUncomTravel)

router.route('/start/:Id')
    .post(check, uncomTravelCtrl.createTravel)

router.route('/class/:Id')
    .put(check, uncomTravelCtrl.updateClass)

router.route('/end/:Id')
    .put(check, uncomTravelCtrl.endTravel)

router.route('/removeFreez/:Id')
    .put(auth, authAdmin, uncomTravelCtrl.removeFreez)

module.exports = router
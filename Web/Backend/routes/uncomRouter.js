const router = require('express').Router()
const uncomTravelCtrl = require('../controllers/UncomTravelCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/:Id')
    .get(auth, authAdmin, uncomTravelCtrl.getUncomTravel)

router.route('/start/:Id')
    .post(auth, authAdmin, uncomTravelCtrl.createTravel)

router.route('/class/:Id')
    .put(auth, authAdmin, uncomTravelCtrl.updateClass)

router.route('/end/:Id')
    .put(auth, authAdmin, uncomTravelCtrl.endTravel)

router.route('/removeFreez/:Id')
    .put(auth, authAdmin, uncomTravelCtrl.removeFreez)

module.exports = router
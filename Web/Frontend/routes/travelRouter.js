const router = require('express').Router()
const travelCtrl = require('../controllers/travelCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/travel/:Id')
    .get(auth, travelCtrl.getTravels)

module.exports = router
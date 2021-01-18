const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/payment')
    .post(auth, authAdmin, paymentCtrl.createPayment)

router.route('/payment/:Id')
    .get(auth, authAdmin, paymentCtrl.getPayment)
    .put(auth, authAdmin, paymentCtrl.updatePayment)

module.exports = router
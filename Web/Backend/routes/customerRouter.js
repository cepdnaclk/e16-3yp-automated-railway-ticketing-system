const router = require('express').Router()
const customerCtrl = require('../controllers/customerCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/register')
    .post(auth, authAdmin, customerCtrl.register)

router.route('/all')
    .get(auth, authAdmin, customerCtrl.getCustomers)

router.route('/update/:Id')
    .put(auth, authAdmin, customerCtrl.updateCustomer)

router.route('/:Id')
    .get(auth, customerCtrl.getCustomer)
    .delete(auth, authAdmin, customerCtrl.deleteCustomer)



module.exports = router
const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/infor', auth, userCtrl.getUser)

router.put('/changePassword/:Id', auth, userCtrl.changePassword)

router.delete('/:Id', auth, authAdmin, userCtrl.deleteUser)

router.get('/:Id', auth, authAdmin, userCtrl.findUser)

module.exports = router
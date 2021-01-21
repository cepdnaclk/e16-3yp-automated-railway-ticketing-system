const router = require('express').Router()
const trainCtrl = require('../controllers/trainCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/trains')
    .get(trainCtrl.getTrains)
    .post(auth, authAdmin, trainCtrl.createTrain)

router.route('/trains/:Id')
    .delete(auth, authAdmin, trainCtrl.deleteTrain)
    .put(auth, authAdmin, trainCtrl.updateTrain)
    .get(auth, authAdmin, trainCtrl.getTrain)

module.exports = router
var express = require('express');
const userController = require('../controllers/user');
var router = express.Router();

router.post('/create', async(req, res) =>{
    await userController.createUser(req,res)
})

router.post('/users/generateOTP', async (req, res) => {
    await userController.genOtp(req, res)
})

router.get('/users/:user_id/verifyOTP', async (req, res) =>{
    await userController.verifyOtp(req, res)
})
module.exports = router;

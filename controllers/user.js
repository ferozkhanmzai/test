const users = require("../models/user")
const moment = require('moment')
const { Op } = require('sequelize')
module.exports = {

    createUser: async (req, res) => { 
        try {
            let {
                name,
                phone_number
            } = req.body
           await users.create({
                name:name,
                phone_number:phone_number
            }).then(created =>{
                if (created){
                    res.send({
                        created
                    })
                }else{
                    res.send({
                        success:false
                    })
                }
            })
        } catch (error) {
            
        }
    },
    genOtp: async (req, res) => { 
        
        try {
            let {
                phone_number
            } = req.body
           await users.findOne({
               where:{
                   phone_number:phone_number
               }
            }).then(async found =>{
                let randNo = Math.floor(1000 + Math.random() * 9000);
                found.otp = randNo;
                found.otp_expiration_date = moment().add(5, 'minutes').format("YYYY-MM-DD HH:mm:ss")
                let saveOtp = await found.save()
                if (saveOtp){
                    res.status(200)
                    res.send({
                        success:true,
                        message:'Successfully sent. Please check.',
                        otp:randNo
                    })
                }else{
                    res.status(404)
                    res.send({
                        success:false,
                        message:'No data found'
                    })
                }
            })
        } catch (error) {
            res.status(500)
                    res.send({
                        success:false,
                        message:error
                    })
        }
    },
    verifyOtp:async(req, res)=>{
        try {
            console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
           let qOtp = req.query.otp 
             await users.findOne({
               where:{
                   id:req.params.user_id,
                   otp:qOtp,
                   otp_expiration_date: {
                    [Op.gt]: moment().format('YYYY-MM-DD HH:mm:ss')
                  }
               }
            }).then(async found =>{
                if (found){
                    res.status(200)
                    res.send({
                        success:true,
                        message:'Congrats!OTP is matched',
                        data:found
                    })
                }else{
                    res.status(404)
                    res.send({
                        success:false,
                        message:'No data found'
                    })
                }
            })
        } catch (error) {
            res.status(500)
                    res.send({
                        success:false,
                        message:error
                    })
        } 
    }
}  
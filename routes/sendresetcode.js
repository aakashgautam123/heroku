const express = require('express');
const connection = require('../database/config.js')
var session = require('express-session')
var nodemailer = require('nodemailer')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const router = express.Router();




router.post('/sendresetcode',urlencodedParser,(req,res)=>{
            console.log(req.body.emailid);
            var code =  Math.floor(Math.random()*4000)+1000
            var stringcode = code.toString();
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'aakashgautam107@gmail.com',
              pass: 'hello123321'
            }
          });

          var mailOptions = {
            from: 'bantabaandcompany@gmail.com',
            to: req.body.emailid,
            subject: 'Password Reset code',
            html:`<h1 style="color:red">Your Password Reset Code is ${stringcode} </h1><p>Please go to this link <a href='http://127.0.0.1:3000/newpassword'><button style='background-color:blue;color:white;border:1px solid blue;border-radius:4px;padding:10px;'>Reset Password</button></a>`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              var query = `UPDATE members SET password_reset_code = '${stringcode}'  WHERE user_name = '${req.body.emailid}'`;
              console.log(query);
              connection.query(query,(err,resx,fields)=>{
                  console.log(fields);
              })
              res.redirect('/newpassword');
              
            }
          });


         
  


})








module.exports = router;
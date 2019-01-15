const express = require('express');
const connection = require('../database/config.js')
var session = require('express-session')
var nodemailer = require('nodemailer')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const router = express.Router();




router.post('/invite',(req,res)=>{

            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'aakashgautam107@gmail.com',
              pass: 'hello123321'
            }
          });

          var mailOptions = {
            from: 'bantabaandcompany@gmail.com',
            to: req.body.emailId,
            subject: req.body.sub,
            html: req.body.message
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.json({success:true});
            }
          });
          if(req.body.stafforstudent === 'student'){
            var query2 = "UPDATE students SET invitation_status = ? WHERE student_parent_email = ?";
          }
          else if (req.body.stafforstudent === 'staff')
          {
            var query2 = "UPDATE admin_staff SET invitation_status = ? WHERE staff_admin_email = ?";
          }
          
          data = [1,req.body.emailId];
          connection.query(query2,data,(err,rows,fields)=>{

          })


  


})








module.exports = router;
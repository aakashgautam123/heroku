const express = require('express');
const connection = require('../database/config.js')
var session = require('express-session')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const router = express.Router();



router.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
 	var username = req.body.user_name;
 	var password = req.body.user_password;
 	
 	connection.query("SELECT * FROM members WHERE user_name = '" +  username + "' and user_password = '"+ password +"'",function(err,rows,fields)
 	{

 		var length = rows.length
 		if(length == 1)
 		{
			 console.log('Login successful from authentication.js')
			 console.log(rows);
 			req.session.loggedIn = true;
 			req.session.username = rows[0].user_name;
 			req.session.schoolname = rows[0].school_name;
 			req.session.schoolid = rows[0].user_id;
 			connection.query(`SELECT COUNT(*) AS studentNumber  FROM students WHERE student_school_id = ${rows[0].user_id}`,(err,resi,fields)=>{
 			
 			req.session.studentNumber = resi[0].studentNumber;
 				connection.query(`SELECT COUNT(*) AS roomNumber  FROM rooms WHERE school_id = ${rows[0].user_id}`,(err,resu,fields)=>{
				 req.session.roomNumber  = resu[0].roomNumber;
					connection.query(`SELECT COUNT(*) AS staffNumber  FROM admin_staff WHERE staff_school_id = ${rows[0].user_id}`,(err,resx,fields)=>{
						req.session.total_staffs = resx[0].staffNumber;
						
						return res.redirect('profile');
					})
 				
 			})
 			

 			})
 			
 			
 		}
 		else
 		{

 			res.end("Incorect Credentials");
 		}

	 	});


})
router.get('/logout',function(req,res)
{
	req.session.destroy();
	res.redirect('/');
})

module.exports = router;
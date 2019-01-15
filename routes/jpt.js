var express = require('express')
var connection = require('../database/config.js')

var router = express.Router();

router.post('/', function(req, res) {
	var query = "SELECT * FROM students WHERE student_id = ?";
	var student_id = req.body.id;
	connection.query(query,[student_id],(err,rows,fields)=>{
		

		res.json({name:rows[0].student_name,age:rows[0].student_age,parent_name:rows[0].student_parent_name,tel:rows[0].student_contact_number,avatar:rows[0].student_profile_image,
					address:rows[0].student_address,dob:rows[0].student_dob,checkIn:rows[0].student_time_in,checkOut:rows[0].student_time_out,
					mealType:rows[0].student_mealtype,allergies:rows[0].student_allergies,
					studentId:rows[0].student_id,parentEmail:rows[0].student_parent_email




		})
	})
});

module.exports = router;
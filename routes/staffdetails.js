var express = require('express')
var connection = require('../database/config.js')

var router = express.Router();

router.post('/staffdetails', function(req, res) {
	var query = "SELECT * FROM admin_staff WHERE staff_admin_id = ?";
	var staff_id = req.body.id;
	connection.query(query,[staff_id],(err,rows,fields)=>{
		
		console.log(rows);
		res.json({
            email:rows[0].staff_admin_email,
            appoint_date:rows[0].staff_appoint_date,
            phone_number:rows[0].staff_phone_number,
            gov_id:rows[0].staff_gov_id,
			staff_room_id:rows[0].staff_room_id,
			name:rows[0].admin_staff_name,
			room:rows[0].staff_room_id




		})
	})
});

module.exports = router;
const express = require('express')
var formidable = require('formidable')
var bodyParser = require('body-parser')
var connection = require('../database/config.js')
var mv = require('mv')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router()

router.get("/staffs" , (req,res) => {
	var query = " SELECT * FROM admin_staff where staff_school_id = ? ";
	connection.query(query,[req.session.schoolid],(err,rows,fields)=>{
		connection.query("SELECT * FROM rooms WHERE school_id="+req.session.schoolid,(err,results,fields)=>{
			connection.query("SELECT * FROM staff",(err,resy,fields)=>{
				var emails = [];
				resy.forEach(function(item)
				{
					emails.push(item.staff_email);
				})
				
				res.render('staff',{data:rows,list:results,emails:emails,school:req.session.schoolname});
			})
			
		})
		
		

	})
})



router.post("/addstaff",urlencodedParser, (req,res)=>{
	
	var staff_name = req.body.staff_name;
	var staff_school_id  = req.session.schoolid;
	var staff_admin_email = req.body.staff_admin_email;
	var staff_appoint_date = req.body.staff_appoint_date;
	var staff_phone_number = req.body.staff_phone_number;
	var staff_gov_id = req.body.staff_gov_id;
	var room = req.body.room;
	
	var query0 = "SELECT room_id FROM rooms WHERE room_name = ?"; 
	connection.query(query0,[room],(err,results,fields)=>{
		var insert = "INSERT INTO admin_staff(staff_school_id,staff_admin_email,staff_appoint_date,staff_phone_number,staff_gov_id,admin_staff_name,invitation_status,staff_room_id) VALUES (?,?,?,?,?,?,?,?)";
		connection.query(insert,[staff_school_id,staff_admin_email,staff_appoint_date,staff_phone_number,staff_gov_id,staff_name,0,room],(err,rows,fields)=>{
			if(err) console.log(err)
			console.log('Ok');
			res.redirect('/staffs');
	
	})

	})
	

})



router.post("/updatestaff",urlencodedParser,(req,res)=>{
	var staff_id = req.body.staff_id;
	var staff_name = req.body.staff_edited_name;
	var staff_admin_email = req.body.staff_admin_edited_email;
	var staff_appoint_date = req.body.staff_appoint_edited_date;
	var staff_phone_number = req.body.staff_phone_edited_number;
	var staff_gov_id = req.body.staff_gov_edited_id;
	var staff_room_id = req.body.room;

	var update = "UPDATE admin_staff SET staff_admin_email = ? , staff_appoint_date = ? , staff_phone_number = ? , staff_gov_id = ? , admin_staff_name = ?  , staff_room_id = ? WHERE  staff_admin_id = ?";
	var data = [staff_admin_email,staff_appoint_date,staff_phone_number,staff_gov_id,staff_name,staff_room_id,staff_id];
	connection.query(update,data,(err,rows,fields)=>{
		if(err) console.log(err);
		res.redirect('/staffs');
	});

})


router.post('/deletestaff',(req,res)=>{
	var staff_id = req.body.staff_id;
	var deletestaff = "DELETE * FROM admin_staff WHERE staff_admin_id = ?";
	connection.query(deletestaff,[staff_id],(err,rows,fields)=>{
		if(err) console.log(err)
		res.json({'success':true});
	})
})
module.exports = router;
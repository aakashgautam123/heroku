const express = require('express')
var formidable = require('formidable')
var bodyParser = require('body-parser')
var connection = require('../database/config.js')
var mv = require('mv')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router()

router.post('/addstudent',urlencodedParser,function(req,res)
{		
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
	    var std_name = fields.student_name;
		var std_age = fields.age;
		var std_parent_name = fields.parent_name;
		var std_tel = fields.telephone_number;
		var std_parent_email = fields.student_edited_parent_email1;
		var std_room = fields.room;
		var query1 = "SELECT room_id FROM rooms WHERE room_name = ?";
		connection.query(query1,[std_room],(err,results,fields)=>{
			var query = "INSERT INTO students(student_name,student_age,student_parent_name,student_school_id,student_contact_number,student_profile_image,student_room_id,student_parent_email) VALUES('"+std_name+"','"+std_age+"','"+std_parent_name+"','"+req.session.schoolid+"','"+std_tel+"','"+image_path+"','"+results[0].room_id+"','"+std_parent_email+"')";
			connection.query(query);
		})
		var image_path = '/images/'+files.profile_picture.name;
		
		var oldpath = files.profile_picture.path;
		var newpath = 'D:/Project/public/images/' + files.profile_picture.name;
		mv(oldpath, newpath, function (err) {
        if (err) throw err;
       
        res.redirect('/students');
      	});
		 
		
	     
	      
	    	});
		
    
})
router.get('/students',urlencodedParser,function(req,res)

{	
	console.log("I am from new router");

	

	connection.query(`SELECT * FROM students WHERE student_school_id = ${req.session.schoolid}  ORDER BY student_id DESC` ,function(err,rows,fields){
		connection.query("SELECT * FROM rooms WHERE school_id="+req.session.schoolid,(err,results,fields)=>{
			connection.query("SELECT * FROM parent",(err,resi,fields)=>{

				var emails = [];
				resi.forEach(function(item)
				{
					emails.push(item.parent_email);
				})

				res.render('students',{data:rows,list:results,schoolName:req.session.schoolname,emails:emails});

			});
			
		});	




			



		
		


	});
})


router.post('/updatestudent',urlencodedParser,function(req,res)
{
	console.log('Inside here executing query');
	let stu_id = req.body.studentid;
	let dob = req.body.dob;
	let address = req.body.address;
	let time_in = req.body.time_in;
	let time_out = req.body.time_out;
	let gender = req.body.gender;
	let meal_type = req.body.meal_type;
	let allergies = req.body.allergies;
	let email = req.body.student_edited_parent_email;
	console.log(stu_id+'hari');

	
	let queryString = 'UPDATE students SET student_address = ? , student_dob = ? ,  student_time_in = ? , student_time_out = ? , student_gender = ? , student_mealtype = ? , student_allergies = ? , student_parent_email = ? WHERE student_id = ?';
	let data = [address,dob,time_in,time_out,gender,meal_type,allergies,email,stu_id];
	connection.query(queryString,data,(err,results,fields)=>{
		if(err){
			return console.error(err.message);
		}

		console.log(results.affectedRows);
	});
	
	res.redirect('/students');
})


router.post('/deletestudent',(req,res)=>{
	var query = "DELETE FROM students WHERE student_id = ? ";

	connection.query(query,[req.body.studentId],(err,rows,fields)=>{
		if(err){
			return console.error(err.message);
		}
		res.json({success: true})
	})

})

module.exports = router;
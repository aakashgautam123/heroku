
var express=require('express');
var util = require('util');
var fs = require('fs');
var session = require('express-session');
var app=express();
var nodemailer = require('nodemailer')
var events = require('events');

var jpt = require("./routes/jpt");
var staffdetails = require("./routes/staffdetails.js");
var parent = require("./routes/parent");
var sendreset = require("./routes/sendresetcode");
var invite = require("./routes/invite");
var staff = require("./routes/staff")

app.use(session({secret:'hello123'}));

app.set('view engine', 'pug')


var bodyParser = require('body-parser');
app.use(bodyParser.json())
const connection = require('./database/config.js')

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const router = require('./routes/student.js');
const auth_router = require('./routes/authentication.js');
app.use(router);
app.use(auth_router);
app.use("/jpt", jpt);
app.use(staffdetails);
app.use(staff);
app.use(invite);
app.use(parent);
app.use(sendreset);
app.get('/', function (req, res) {
 	res.render('welcome');
   	
})



app.get('/profile',function(req,res)
{
		if(req.session.loggedIn)
			res.render('profile',{'username':req.session.username,'studentNumber':req.session.studentNumber,'schoolName':req.session.schoolname,'roomNumber':req.session.roomNumber,'staffs':req.session.total_staffs});
		else
			res.send('Invalid access attempt');
})

app.get('/room',function(req,res)
{

		if(req.session.schoolid)
		{
			connection.query("SELECT * FROM rooms WHERE school_id = "+req.session.schoolid,function(err,rows,fields){


			var roomLength = rows.length;
			if(roomLength !== 0){
			
			console.log(roomLength);
			var finalData = [];
			
			rows.forEach(room => {


				const room_name = room.room_name;
				const room_id = room.room_id;

				connection.query("SELECT count(*) AS numstudents FROM students WHERE student_room_id='"+ room_id +"'", function(err, rows, fields) {
					connection.query("SELECT count(*) AS numstaffs FROM admin_staff WHERE staff_room_id='"+ room_id +"'", function(err, rowsv, fields) {
						var obj = {
							roomName: room_name,
							roomId: room_id,
							numstudents: rows[0].numstudents,
							numStaffs:rowsv[0].numstaffs
						};
	
						finalData.push(obj);
	
						if(roomLength === finalData.length) {
							console.log(finalData);
						res.render('room',{data:finalData});					}
	
						
						
	
					});
					
					} );
					

			});

		}
		else {
			res.render('room',{data:''});
		}
		


	});

		}
		else
		{
			res.end("session schoolid not available");
		}
	


})
app.get('/eachroom/:id',function(req,res)
{
	var id = req.params.id;
	var defaultroomid = 0;
	connection.query("SELECT * FROM students WHERE student_room_id="+defaultroomid,function(err,rows2,fields)
	{
			connection.query("SELECT * FROM students WHERE student_room_id="+id,function(err,rows3,fields)
			{
				connection.query("SELECT * FROM rooms WHERE room_id = "+id,function(err,rows,fields){

			 	res.render('eachroom',{roomdata:rows,students:rows2,stud:rows3});


		

	});	
		


	});
	
	});
	
	// res.render('eachroom',{roomid:id});
	
});

app.post('/addroom',urlencodedParser,function(req,res)
{
	var room_name = req.body.room;

	connection.query("INSERT INTO rooms(room_name,school_id) VALUES('"+room_name+"','"+req.session.schoolid+"')");
	res.redirect('/room')
	

})

app.post('/updatestudentroom',urlencodedParser,function(req,res)
{
	console.log("UPDATE students SET student_room_id= "+req.body.room_id + " WHERE student_id= "+req.body.stud_id)
	connection.query("UPDATE students SET student_room_id= "+req.body.room_id + " WHERE student_id= "+req.body.stud_id);

})

app.get('/deletestudentfromroom',urlencodedParser,function(req,res)
{
	query = "UPDATE students SET student_room_id=0 WHERE student_id="+req.query.id;
	connection.query(query,function(err,rows,fields)
	{
		if(!err)
		{
			console.log('Deleted');
			res.send('deleted')
		}
	});

})
app.get('/forgotpassword',(req,res)=>{
	res.render('passwordreset');
})
app.get('/newpassword',(req,res)=>{
	res.render('newpassword');
})
app.post('/updatepassword',urlencodedParser,(req,res)=>{
	console.log('I am herere');
	var resetcode = req.body.resetcode;
	var email = req.body.email;
	var newpassword = req.body.newpassword;
	var confirmpassword = req.body.confirmpassword;
	
	
	
	var lastword = resetcode.substr(-1);
	if(lastword === 'p')
	{
		var checkreset = `SELECT * FROM parent WHERE parent_email = '${email}' and parent_reset_code = '${resetcode}' `;
		var updatepass = `UPDATE parent SET parent_password = '${newpassword}' WHERE parent_email = '${email}'`;
	}
	else if(lastword === 's')
	{
		var checkreset = `SELECT * FROM staff WHERE staff_email = '${email}' and staff_reset_code = '${resetcode}' `;
		var updatepass = `UPDATE staff SET staff_password = '${newpassword}' WHERE staff_email = '${email}'`;
	}
	else
	{
		var updatepass = `UPDATE members SET user_password = '${newpassword}' WHERE user_name = '${email}'`;
		var checkreset = `SELECT * FROM members WHERE user_name = '${email}' and password_reset_code = '${resetcode}' `;
	}
	
	console.log(checkreset);

	connection.query(checkreset,(err,resz,fields)=>{
		console.log(resz);
		if(resz.length == 1)
		{
			if(newpassword === confirmpassword)
			{
				connection.query(updatepass,(err,resp,fields)=>{
					res.redirect('/');
				})
			}
		}
	})
	
})
app.get('/signup',(req,res)=>{
	res.render('signup');
})
app.post('/signup',urlencodedParser,(req,res)=>{
	var schoolname = req.body.schoolname;
	var email = req.body.email;
	var establisheddate = req.body.establisheddate;
	var numberofstudents = req.body.numberofstudents;
	var location = req.body.location;
	var password = req.body.password;

	var requestaccount = `INSERT INTO request_account_school VALUES ('',?,?,?,?,?,?)`;
	var data = [schoolname,email,establisheddate,numberofstudents,location,password];
	connection.query(requestaccount,data,(err,resg,fields)=>{
		if(err) console.log(err)
		var outputmessage = `
		
		<strong>Dear Admin<strong>,
		<p style='margin-left:30px;'><strong>${schoolname}</strong> Wants to Create an account in Kinder</p>
		<h2>Contact Details</h2>
		<ul>
		<li>Name-${schoolname}</li>
		<li>Established Date-${establisheddate}</li>
		<li>Number of Students-${numberofstudents}</li>
		<li>Location-${location}</li>
		<li>Desired Password-${password}</li>
		</ul>
		
		
		
		`
		var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'aakashgautam107@gmail.com',
              pass: 'hello123321'
            }
          });

          var mailOptions = {
            from: 'bantabaandcompany@gmail.com',
            to: 'aakashgautam107@gmail.com',
            subject: 'REQUEST SCHOOL ACCOUNT CREATION',
            html: outputmessage
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
			  console.log('Email sent: ' + info.response);
			  
			  res.render('welcome',{success:`<h1 style="color:red;">Your Request was submitted Sucessfully</h1>`});

			  
            }
          });

	})
})
app.post('/changepass',urlencodedParser,(req,res)=>{
	var currentPassword = req.body.current_password;
	var newPassword = req.body.new_password;
	var confirmPassword = req.body.confirm_password;

	var query = `SELECT * FROM members WHERE user_name='${req.session.username}' and user_password='${currentPassword}'`;
	console.log(query);
	connection.query(query,(err,rowsc,fields)=>{
		console.log(rowsc);
		if(rowsc.length == 1)
		{
			if(newPassword === confirmPassword)
			{	console.log('User authenticated');
				var updatepass = `UPDATE members SET user_password ='${newPassword}' WHERE user_name = '${req.session.username}' `;
				console.log(updatepass);
				connection.query(updatepass,(err,rowu,fields)=>{
					if(!err) console.log('Password Changed');
					res.redirect('/');
				})
			}
		}
	})
})
app.get('/login', function (req, res) {
	res.sendFile('index.html',{ root:'views' });
	  
})


var server = app.listen(process.env.PORT,function() {console.log('Sever up and running')});
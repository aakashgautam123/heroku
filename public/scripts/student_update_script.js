
let updatebutton = document.getElementsByClassName('updatebutton');


document.getElementById('photo').addEventListener('change',showFileName);
function showFileName(event){
	var input = event.srcElement;
	var fileName = input.files[0].name;
	document.getElementById('choosephoto').innerHTML = fileName;
}

function addZero(num) {
	var val = String(num);
	if(val.length < 2) {
		val = '0' + val;
	}

	return val;
}

Array.from(updatebutton).forEach(function(item)
{	
	item.addEventListener('click',function()
	{	

		fetch('http://127.0.0.1:3000/jpt', {method: "POST", headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify({id: item.id})
		}).then(res => res.json())
		.then(response => 
					{

						document.getElementById('student_avatar').src = response.avatar;
						document.getElementById('student_edited_parent_email').value = response.parentEmail;
						document.getElementById('stu_id').value = response.studentId;
						document.getElementById('student_edited_name').value = response.name;
						document.getElementById('student_edited_age').value = response.age;
						document.getElementById('student_edited_parent').value = response.parent_name;
						document.getElementById('student_edited_tel').value = response.tel;
						document.getElementById('student_edited_address').value = response.address;
						var date = new Date(response.dob);
						var dob = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDay())}`;
						console.log(dob);
						document.getElementById('student_edited_dob').value = String(dob);


						document.getElementById('student_edited_timeIn').value = response.checkIn;
						document.getElementById('student_edited_timeOut').value = response.checkOut;
						document.getElementById('student_edited_meal').value = response.mealType;
						document.getElementById('student_edited_allergies').value = response.allergies;
						


						



						
					}


			);

	})
})
let deletebuttons = document.getElementsByClassName('deletestudent');


Array.from(deletebuttons).forEach(function(item)
{	
	item.addEventListener('click',function()
	{	
		fetch('http://127.0.0.1:3000/deletestudent',{method: "POST", headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify({studentId: item.id})
		}).then(res => res.json())
		.then(response => {
			if(response.success) {
				window.location.href = 'http://127.0.0.1:3000/students';
			}
		})

	})
});


let inviteButtons = document.getElementsByClassName('invitestudent');

Array.from(inviteButtons).forEach(function(item)
{	
	item.addEventListener('click',function()
	{	
		var output = `
			<strong>Dear</strong> ${this.getAttribute('data-studentname')},
			&nbsp;&nbsp;&nbsp;<p><strong>${this.getAttribute('data-schoolName')}</strong> invites you to use <strong>Kinder</strong>.Please visit the link below </p>
			<p><button style="background-color:#0080FF;color:white;padding:20px;border:1px solid blue;border-radius:6px;"><a style="color:white;text-decoration:none;" href='http://127.0.0.1'>Click Here</a></button></P>
		
		
		`;
		console.log(item);
		fetch('http://127.0.0.1:3000/invite',{method: "POST", headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify({emailId: item.id,sub:`[Action Required] ${this.getAttribute('data-schoolName')} invites you to Kinder`,stafforstudent:'student',message:output})
		}).then(res => res.json())
		.then(response => {
			if(response.success) {
				location.reload(true);
				console.log('success');
			}
		})

	})
});







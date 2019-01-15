let updatestaff = document.getElementsByClassName('updatestaffbutton');


function addZero(num) {
	return ('00' + String(num)).slice(-2);
}
Array.from(updatestaff).forEach(function(item)
{	
	item.addEventListener('click',function()
	{
		document.getElementById('staff_id').value = item.id;

		fetch('http://127.0.0.1:3000/staffdetails',{ method:'POST', headers:{
			"Content-Type":"application/json"
		},body:JSON.stringify({id:item.id})
	}).then(res => res.json()).then(response => {
		document.getElementById('staffname').value = response.name;
		document.getElementById('staff_admin_email').value = response.email;
	
		document.getElementById('staff_phone_number').value = response.phone_number;
		document.getElementById('staff_gov_id').value = response.gov_id;
		var date = new Date(response.appoint_date);
		var appoint_date = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
		document.getElementById('staff_appoint_date').value = appoint_date;
		document.getElementById('staffRoom').value = response.room;
		






	});
	


	})	

		
})

let inviteButtons = document.getElementsByClassName('invitestudent');

Array.from(inviteButtons).forEach(function(item)
{	

	
	console.log('OK');
	item.addEventListener('click',function()
	{	
		var output = `
			<strong>Dear</strong> ${this.getAttribute('data-staffname')},
			&nbsp;&nbsp;&nbsp;<p><strong>${this.getAttribute('data-schoolName')}</strong> invites you to use <strong>Kinder</strong>.Please visit the link below </p>
			<p><button style="background-color:#0080FF;color:white;padding:20px;border:1px solid blue;border-radius:6px;"><a style="color:white;text-decoration:none;" href='http://127.0.0.1'>Click Here</a></button></P>
		
		
		`;
		
		fetch('http://127.0.0.1:3000/invite',{method: "POST", headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify({emailId: item.id,sub:`[Action Required] ${this.getAttribute('data-schoolName')} INVITES YOU TO JOIN KINDER`,stafforstudent:'staff',message:output})
		}).then(res => res.json())
		.then(response => {
			if(response.success) {
				location.reload(true);
				console.log('success');
			}
		})

	})
});
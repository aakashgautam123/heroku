window.onload = function(){ 

	var list_items = document.getElementsByClassName('clickable');

	for(i=0;i<list_items.length;i++)
	{
		student_id = list_items[i].getAttribute('id');

		list_items[i].addEventListener('click',function(event)
		{
			document.getElementById(event.target.id).style.backgroundColor = 'lightblue';

			var id = event.target.id;
			var baseURI = event.target.baseURI;
			var room_id = baseURI.slice(31,34);

			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
		       // Typical action to be performed when the document is ready:
		       console.log('Updated');
		   }
		};
		xhttp.open("POST", '/updatestudentroom', true);
		xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhttp.send('stud_id='+id+'&room_id='+room_id);


	});

	}

	var removebutton = document.getElementsByClassName('removebutton');
	for(i=0;i<removebutton.length;i++){
		removebutton[i].addEventListener('click',function(event){
			var result = confirm("Are you sure?")

			if(result){
				// console.log('OK');
				
				// var http = new XMLHttpRequest();
				// 	http.open("GET",'/deletestudentfromroom?id='+event.target.id,true);
				// 	http.onreadyStatechange = function(data)
				// 		{
				// 			console.log(data	)
				// 			window.location.reload();
				// 		};
				// 	http.send();

				$.ajax({
					type: 'GET',
					url: '/deletestudentfromroom?id='+event.target.id,
					success: function(data){
						console.log(data)
						if(data==='deleted'){
							location.reload(true);
						}
					}
				});

			}
		});

	}



}
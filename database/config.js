
var mysql = require('mysql')

var connection = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password:'',
	database:'kinderco'
});
connection.connect((error)=>{
	if(!!error){
		console.log('Error');
	}

	else
	{
		console.log('Connected');
	}
});


module.exports = connection;

console.log('I am here');
var npass = document.getElementById('npass');


document.getElementById('cpass').addEventListener('input',()=>{
    if(cpass.value === npass.value)
    {
        document.getElementById('message').innerHTML = 'Password Matched';

        document.getElementById('message').style.color = 'green';
    }

    else if (cpass.value !== npass.value)
    {
        document.getElementById('message').innerHTML = 'Password Not Matched';
        document.getElementById('message').style.color = 'red';
    }

})
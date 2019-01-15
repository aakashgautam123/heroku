const express = require('express');
const connection = require('../database/config.js')
var session = require('express-session')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const router = express.Router();




router.get('/parent',(req,res)=>{

	res.render('parent');


})
module.exports = router
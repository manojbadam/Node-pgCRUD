var pg = require("pg")
var express = require("express")
var bodyparser = require("body-parser")
var cors = require('cors')
var app = express()
var multer = require('multer');

//app.use(cors());
//app.use(multer());
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  		next();
	});
//var port = 5433;
var data;
//var data = [{"name":"Basava", "Sex": "Male"},{"name":"Manoj", "Sex":"Male"},{"name":"Sai","Sex":"Male"}];

var writeResults = function(req,res){
	console.log("Write Results");
	res.writeHead(200, {'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Headers': 'X-Requested-With, accept, content-type',
						'Access-Control-Allow-Methods': 'GET'});
	res.write(data);
	res.end();
};

var getRecords = function(req,res,callback){
	console.log("Get Records");
	var conString = "pg://postgres:3267635@localhost:5432/TestDB";
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query('select id,fname,lname,0 as "Dbupdate" from Student  order by id');
		query.on("row", function (row, result) {
			result.addRow(row);
	});
	query.on("end", function (result) {
			client.end();
			data = JSON.stringify(result.rows, null, "    ");
			//console.log(data);
			callback(req,res);
	});
};

var updateRecords = function(req,res){
	var conString = "pg://postgres:3267635@localhost:5432/TestDB";
	var client = new pg.Client(conString);
	client.connect();
	//console.log(req.body.fname);
	//var query = client.query("update \"Student\" set fname = '"+ req.fname +"' where id = "+req.id);
	client.query("update Student set fname = $1 where id = $2",[req.body.fname,req.body.id],function(err,result){
		if(err) {
      return console.error('error running update query', err);
    }
    client.end();
});
	
	// res.writeHead(200, {'Content-Type': 'text/plain'});
	res.writeHead(200, {'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Headers': 'X-Requested-With, accept, content-type',
						'Access-Control-Allow-Methods': 'POST'});

    res.write("Updated record to " + req.body.fname);
    res.end();
}	

var insertRecords = function(req,res)
{
	console.log("In insert");
   // Connect to DB
   var conString = "pg://postgres:3267635@localhost:5432/TestDB";
   var client = new pg.Client(conString);
   client.connect(); 

   client.query("INSERT INTO Student(fname, lname) values($1, $2)", [req.body.fname, req.body.lname],function(err,result){
	if(err) {
      return console.error('error running Insert query', err);
    }
    client.end();
   });
   // res.writeHead(200, {'Content-Type': 'text/plain'});
   res.writeHead(200, {'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Headers': 'X-Requested-With, accept, content-type',
						'Access-Control-Allow-Methods': 'POST'});
   res.write("1 record is inserted.\n");
   res.end();
   console.log("Inserted 1 records");
}

var deleteRecords = function(req,res){
	console.log("In Delete");

	// Connect to DB
	var conString = "pg://postgres:3267635@localhost:5432/TestDB";
   	var client = new pg.Client(conString);
   	client.connect(); 

   	//Delete record
   	client.query("DELETE FROM Student WHERE id = $1",[req.body.id],function(err,result){
   		if(err) {
      return console.error('error running Insert query', err);
    }
    client.end();
   	});
   	// res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.writeHead(200, {'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Headers': 'X-Requested-With, accept, content-type',
						'Access-Control-Allow-Methods': 'POST'});
    res.write("Deleted record where id = "+ req.body.id);
    res.end();
    console.log("Deleted record");	
}


app.get('/',function(req,res){
	getRecords(req,res,writeResults);
})

app.post('/Update',function(req,res){
	console.log(req.body.fname);
    console.log(req.body.lname);
    updateRecords(req,res);
})

app.post('/Insert', function(req,res){
	console.log(req.body.fname);
    console.log(req.body.lname);
    console.log(req.body);
    insertRecords(req,res);
})

app.post('/del',function(req,res){
	console.log(req.body.id);
	deleteRecords(req,res);
})

var server = app.listen(5433,function(){
	var host = "localhost"
	var port = "5433"
});
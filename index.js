var pg = require("pg")
var http = require("http")
var port = 5433;
//var data;
var data = [{"name":"Basava", "Sex": "Male"},{"name":"Manoj", "Sex":"Male"},{"name":"Sai","Sex":"Male"}];

var writeResults = function(req,res){
	console.log("Write Results");
	res.writeHead(200, {'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*'});
	res.write(data);
	res.end();
};

var getRecords = function(req,res,callback){
	console.log("Get Records");
	var conString = "pg://postgres:3267635@localhost:5432/TestDB";
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query('select id,fname,lname,0 as "Dbupdate" from "Student"  order by id');
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

var updateRecords = function(req,res,callback){
	console.log("update Records");
	//var conString = "pg://postgres:3267635@localhost:5432/TestDB";
	//var client = new pg.Client(conString);
	client.connect();
	console.log(req.body);
	//var query =  
}	

http.createServer(function(req, res) {
	if(req.method == 'GET') {
	console.log("Get Request in main");
	getRecords(req,res,writeResults);
	//list_data(req,res);
	//setInterval(list_records,3000);
	}
	if(req.method == 'POST'){
		updateRecords(req,res,writeResults)
	}
}).listen(port);
	console.log("Connected to " + port + "   localhost" );
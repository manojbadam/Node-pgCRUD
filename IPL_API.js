var pg = require("pg")
var express = require("express")
var bodyparser = require("body-parser")
var cors = require('cors')
var app = express()

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    if ('OPTIONS' === req.method) {
    	console.log("Entered use");
        res.status(204).send();
    }
    else {
    	console.log("Entered Else block");
        next();
    }
	});

var writeResults = function(req,res){
	console.log("Write Results");
	res.writeHead(200, {'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Headers': 'X-Requested-With, accept, content-type',
						'Access-Control-Allow-Methods': 'GET'});
	res.write(data);
	res.end();
};

app.get('/getMatcheDetails',function(req,res){
	var conString = "pg://postgres:3267635@localhost:5432/TestDB";
	var client = new pg.Client(conString);
	client.connect();

	var query = client.query('select * from webMatchDetails');
		query.on("row", function (row, result) {
			result.addRow(row);
	});

	query.on("end", function (result) {
			client.end();
			data = JSON.stringify(result.rows, null, "    ");
			//console.log(data);
			writeResults(req,res);
	});
	//getMatchDetails(req,res,writeResults);
})

app.post('/postMatchPred',function(req,res){
	console.log("Enter Post");
	var conString = "pg://postgres:3267635@localhost:5432/TestDB";
	var client = new pg.Client(conString);
	client.connect();

	client.query("INSERT INTO userMatchPredictionsXref(username,matchid, selection) values($1, $2, $3)", [req.body.username, req.body.matchid,req.body.selection],function(err,result){
	if(err) {
      return console.error('error running Insert query', err);
    }
    client.end();
   });

	res.writeHead(200, {'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Headers': 'X-Requested-With, accept, content-type',
						'Access-Control-Allow-Methods': 'POST'});
	res.write("1 record is updated.\n");
	res.end();
	console.log("1 record updated");
})

var server = app.listen(5433,function(){
	var host = "localhost"
	var port = "5433"
});
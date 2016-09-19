var express = require('express')
	,app = express();
var request = require('request');
var cookie = require('cookie');
var oauth = require('./oauth');

var session = new Array();
var search = new Array();
var search_token = new Array();

var host = 'http://localhost';
var apiUrl = 'https://api.instagram.com';
var DB_url = 'mongodb://localhost:27017/hash_search';
var oauthUrl = apiUrl+'/oauth/access_token';
var searchHashTagUrlInicio = apiUrl+'/v1/tags/';
var searchHashTagUrlFim = '/media/recent?access_token=';
var port = 8080;
var hora = new Date();

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var ObjectId = require('mongodb').ObjectID;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
	res.send('Hash Search on air!');
	res.end();
});

app.get('/oauth', function(req, res){
	oauth.code = req.query.code;
	request.post({url:oauthUrl, form: oauth}, function(error, response, body){
		if(!error && response.statusCode == 200){
			session.push(body); 
			current_session = JSON.parse(session[session.length-1]);
			res.setHeader('Set-Cookie', cookie.serialize('access_token', String(current_session.access_token), { httpOnly: false }));
			res.redirect(host+'#/search');
			res.end();
		}
	});
});

app.get('/user', function(req, res){
	res.setHeader('Access-Control-Allow-Origin', host);
	res.setHeader('Access-Control-Allow-Credentials', true);
	var cookies = cookie.parse(req.headers.cookie || ''); 
	var cookie_access_token = cookies.access_token;
	for(i=0; i< session.length; i++){
		current_session = JSON.parse(session[i]);
		if(current_session.access_token == cookie_access_token){
			res.send(current_session);
			res.end();
		}
	}
	res.statusCode = 404;
	res.send('Função só pode ser chamada após processo de autenticação ser realizado');
	res.end();
});

app.get('/getOauth', function(req, res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send('{ "client_id": "'+oauth.client_id+'", "redirect_uri": "'+oauth.redirect_uri+'" }');
	res.end();
});

app.get('/search/hashtag', function(req, res){
	request.get(searchHashTagUrlInicio+req.query.q+searchHashTagUrlFim+req.query.access_token, function (error, response, body){
		if(!error && response.statusCode == 200){
			var cookies = cookie.parse(req.headers.cookie || '');
			search.push(body);
			search_token[search.length-1] = cookies.access_token;
			res.redirect(host+'#/search');
			res.end();
		} else {
			res.statusCode = response.statusCode;
			res.redirect(host+'#/search');
			res.end();
		}
	})
});

app.get('/search/result', function(req, res){
	res.setHeader('Access-Control-Allow-Origin', host);
	res.setHeader('Access-Control-Allow-Credentials', true);
	var cookies = cookie.parse(req.headers.cookie || '');
	for(i=search.length-1; i>=0;  i--){
		current_search = search[i];
		if(search_token[i] == cookies.access_token){
			res.send(current_search);
			res.end();
		}
	}
	res.statusCode = 404;
	res.send('Nenhuma busca feita');
});

app.post('/search/save', function(req, res){
	res.header("Access-Control-Allow-Origin", host);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Credentials', true); 
	var item_a_inserir = {
		access_token: req.body.access_token,
		timestamp: req.body.timestamp,
		data: req.body.data
	};
	MongoClient.connect(DB_url, function(err, db) {
		assert.equal(null, err);
		console.log('Conectado ao  banco para fazer a inclusão');
		db.collection('hash_search').insertOne(item_a_inserir, function(err, result) {
			assert.equal(null, err);
			console.log('item inserido: '+item_a_inserir);
			db.close();
		});
	});
	res.redirect(host+'#/search');
	res.end();
});

app.get('/search/save', function(req, res){
	res.header('Access-Control-Allow-Origin', host);
	res.header('Access-Control-Allow-Credentials', true);
	var cookies = cookie.parse(req.headers.cookie || '');
	var timestamp = new Date();
	for(i=search.length-1; i>=0;  i--){
		current_search = JSON.parse(search[i]);
		if(search_token[i] == cookies.access_token){
			var item_a_inserir = {
				access_token: cookies.access_token,
				timestamp: timestamp,
				data: current_search.data
			};
			MongoClient.connect(DB_url, function(err, db) {
				assert.equal(null, err);
				console.log('Conectado ao  banco para fazer a inclusão');
				db.collection('hash_search').insertOne(item_a_inserir, function(err, result) {
					assert.equal(null, err);
					console.log('item inserido: '+item_a_inserir);
					db.close();
				});
			});
			res.redirect(host+'#/search');
			res.end();
		} 
	}
});

app.get('/search/saved', function(req, res){
	res.header('Access-Control-Allow-Origin', host);
	res.header('Access-Control-Allow-Credentials', true);
	var cookies = cookie.parse(req.headers.cookie || '');
	console.log('cookies.access_token = '+cookies.access_token);
	
	var findSearch = function(db, callback) {
		var collection = db.collection('hash_search');
		collection.find({ "access_token": cookies.access_token }).toArray(function(err, docs){
			assert.equal(err, null);
			console.log("Found the following records");
			console.dir(docs);
			res.send(docs);
			callback(docs);
		});
	};
	MongoClient.connect(DB_url, function(err, db) {
		assert.equal(null, err);
		console.log("Conectado ao banco para fazer a busca");
		findSearch(db, function(){
			db.close();
		});
	});
});

app.delete('/search/saved/delete', function(req, res){
	var deleteSearch = function(db, callback) {
		var collection = db.collection('hash_search');
		collection.deleteOne({ _id : ObjectId(req.body.id) }, function(err, result) {
			assert.equal(err, null);
			if(result.deletedCount == 1){ console.log('Removed the document with the field _id equal to '+req.query.id); }
			console.log('Removed the document with the field _id equal to '+req.body.id);
			callback(result);
		});
	};
	MongoClient.connect(DB_url, function(err, db) {
		assert.equal(null, err);
		console.log("Conectado ao banco para fazer a exclusão");
		deleteSearch(db, function(){
			db.close();
		});
	});
	
});

app.get('/search/saved/delete', function(req, res){
	console.log('_id a ser deletado: '+req.query.id);
	var deleteSearch = function(db, callback) {
		var collection = db.collection('hash_search');
		collection.deleteOne({ _id: ObjectId(req.query.id) }, function(err, result) {
			assert.equal(err, null);
			if(result.deletedCount == 1){ console.log('Removed the document with the field _id equal to '+req.query.id); }
			res.redirect(host+'#/search');
			callback(result);
		});
	};
	MongoClient.connect(DB_url, function(err, db) {
		assert.equal(null, err);
		console.log("Conectado ao banco para fazer a exclusão");
		deleteSearch(db, function(){
			db.close();
		});
	});
	
});

app.listen(port, function(){
	console.log('Listening on port '+port+' \nStarted @: '+hora);
});
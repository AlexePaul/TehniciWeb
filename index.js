const express = require('express');
const fs = require('fs')
const crypto = require('crypto');
const session = require('express-session');

app = express();
app.set("view engine", "ejs");
 
app.use('/Assets', express.static(__dirname+'/Assets'));
app.use('/CSS', express.static(__dirname+'/CSS'));
app.use(express.urlencoded({extend:true})) 
app.use(session({secret: 'abcdefg', resave: true, saveUninitialized: false}));

app.get(['/', '/index'], function(req, res)
{
    res.render('pagini/index');
});
 
app.get('/ceva', function(req, res)
{
    res.send('altceva');
});
 
app.get('/*', function(req, res)
{
    res.render('pagini' + req.url, function(err, rez)
	{
		if(err){
			res.render("pagini/404");
		}
		else{
			res.send(rez);
		}
	});
});

caleJson=__dirname+"/Assets/json/utilizatori.json";
app.post("/inregistrare", function(req, res){
	let useri;
	if(!fs.existsSync(caleJson)){
		useri = {useri:[]}
	}
	else{
		useri = fs.readFileSync(caleJson).toString("utf8")
		req.body.parola = crypto.scryptSync(req.body.parola, "parola criptare", 32).toString('hex');
		useri.useri(req.body);
		fs.writeFileSync(caleJson, Json.stringify(useri));
		res.render("pagini/inregistrare", {raspuns:"ok"})
	}
});
 
app.listen(8080);
console.log('Server started.');
 
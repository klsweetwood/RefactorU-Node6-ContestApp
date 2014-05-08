var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser());

submissions = [];

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/submitForm', function(req, res) {
	res.render('submitForm');
});

app.get('/submissions', function(req, res) {
	res.render('submissions', {
		submissions: submissions
	});
});

app.get('/winner', function(req, res) {
	res.render('winner');
});

app.get('/vote', function(req, res) {
	if (submissions.length > 0) {
		res.render('vote', {
			randomVideos: _.sample(submissions, 2)
		});		
	}
	else {
		res.render('vote', {
			submissions: submissions
		});
	}
})

app.post('/formsubmit', function(req, res) {
	submissions.push(req.body);
	res.redirect('/submissions');
})

var server = app.listen(8041, function() {
	console.log('Express server listening on port ' + server.address().port);
});

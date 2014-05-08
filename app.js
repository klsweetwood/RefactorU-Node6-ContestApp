var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser());


// List of all video submissions
submissions = [];

// List of the current videos displayed on the vote page
currentVideos = [];

// Adds two random videos from submissions to currentVideos if
// currentVideos has 0 or 1 videos in it.
function randomVideos() {
	if (currentVideos.length < 2) {
		currentVideos = _.sample(submissions, 2);
	}
}

// If the video object has not had any votes, the function will
// create a vote key on the object and set it equal to 1. If 
// the video already has votes, votes will be incremented by 1.
function vote(video) {
	if (video.votes === undefined) {
		video.votes = 1;
		return;
	}
	video.votes++;
}


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
	randomVideos();
	res.render('vote', {
		randomVideos: currentVideos,
	});
});

app.get('/nextVideos', function(req, res) {
	currentVideos = [];
	res.redirect('/vote');
});

app.post('/formsubmit', function(req, res) {
	submissions.push(req.body);
	res.redirect('/submissions');
});

app.post('/vote/:videoIndex', function(req, res) {
	vote(currentVideos[req.params.videoIndex]);
	res.redirect('/vote');
})


var server = app.listen(8041, function() {
	console.log('Express server listening on port ' + server.address().port);
});

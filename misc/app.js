var express = require('express')
  , http = require('http');

var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use("/dist", express.static(__dirname + '/../dist'));
app.use(express.errorHandler());

app.get('/', function(req, res) {
  res.render("index");
});

http.createServer(app)
  .listen(port, function(){
    console.log('Visit http://127.0.0.1:' + port);
  });

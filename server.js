var express = require('express'),
  path = require('path'),
  fs = require('fs');
var compression = require('compression');
var app = express();
var staticRoot = 'dist/front-end';

app.set('port', (process.env.PORT || 8080));

app.use(compression());

app.use(function (req, res, next) {
  var accept = req.accepts('html', 'json', 'xml');
  if (accept !== 'html') {
    return next();
  }

  var ext = path.extname(req.path);
  if (ext !== '') {
    return next();
  }
  fs.createReadStream(staticRoot + '/index.html').pipe(res);
});

app.use(express.static(staticRoot));

app.route('/*').get(function (req, res) {
  return res.sendFile(path.join(staticRoot + '/index.html'));
});

app.listen(app.get('port'), function () {
  console.log('app running on port', app.get('port'));
});

var gzippo = require('gzippo');
var logger = require('morgan');
var express = require('express');
var app = express();
app.use(logger('dev'));
app.use(gzippo.staticGzip('' + __dirname + '/dist'));
app.listen(process.env.PORT || 5000);

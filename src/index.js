var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var handlebars = require('koa-handlebars');
var Router = require('koa-router');
var mongoose = require('mongoose');
var config = require('../config');
var router = require('./router');

var app = koa();

mongoose.connect(config.mongoDB);

var requests = 0;
app.use(function* (next) {
	requests++;
	yield next;
});

app.use(bodyParser());

app.use(handlebars({
	defaultLayout: 'main.hbs',
	layoutsDir: 'src/layouts',
	viewsDir: 'src/views'
}));

app.use(router.routes());

module.exports = app;


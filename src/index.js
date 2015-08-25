var koa = require('koa');
var handlebars = require('koa-handlebars');
var Router = require('koa-router');
var mongoose = require('mongoose');
var config = require('../config');

var app = koa();

mongoose.connect(config.mongoDB);

var User = require('./models/user');

var router = Router();
router.get('/', function* (next) {
	this.body = 'hello #' + requests;
});

router.get('/ddd', function* (next) {
        this.body = 'hello /ddd';
});

router.get('/user/:id', function* (next) {
	yield this.render('user', {id: this.params.id});
});

router.get('/users', function* (next) {
	this.body = yield User.find();
});

var requests = 0;
app.use(function* (next) {
	requests++;
	yield next;
});

app.use(handlebars({
	defaultLayout: 'main.hbs',
	layoutsDir: 'src/layouts',
	viewsDir: 'src/views'
}));

app.use(router.routes());

module.exports = app;


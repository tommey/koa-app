var koa = require('koa');
var handlebars = require('koa-handlebars');
var Router = require('koa-router');

var app = koa();
var router = Router();

var requests = 0;

router.get('/', function* (next) {
	this.body = 'hello #' + requests;
});

router.get('/ddd', function* (next) {
        this.body = 'hello /ddd';
});

router.get('/user/:id', function* (next) {
	yield this.render('user', {id: this.params.id});
});

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


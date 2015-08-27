var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var Router = require('koa-router');
var mongoose = require('mongoose');
var config = require('../config');
var router = require('./router');

var app = koa();

mongoose.connect(config.mongoDB);

app.use(function* (next) {
        var start = new Date();
        console.log('Request', this.method, this.path, start);
        yield next;
        console.log('Request processed in', (new Date()).getTime() - start.getTime(), 'ms');
});

app.use(bodyParser());

app.use(router.routes());

module.exports = app;


var config = {};

config.port = process.env.PORT || 80;
config.mongoDB = "mongodb://localhost/koa-app";

module.exports = config;


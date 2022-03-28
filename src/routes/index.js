const express = require('express');
const seriesRouter = require('./series.router');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v2', router);
  router.use('/series', seriesRouter);
}

module.exports = routerApi;

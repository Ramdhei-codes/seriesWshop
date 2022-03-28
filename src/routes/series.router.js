const express = require('express');
const SeriesService = require('../services/series.service');
const SerieModel = require('../models/series.models');
const service = new SeriesService();
const seriesRoutes = express.Router();

seriesRoutes.post('/', async (req, res) => {
  try {
    const series = SerieModel(req.body);
    const data = await service.createSeries(series);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

seriesRoutes.get('/', async (req, res) => {
  try {
    const data = await service.listSeries();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: err });
  }
});

seriesRoutes.get('/:serieId', async (req, res) => {
  const { serieId } = req.params;
  service
    .showSeries(serieId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ message: err }));
});

seriesRoutes.get('/actors/:actorName', async (req, res) => {
  try {
    const { actorName } = req.params;
    const data = await service.getSeriesByActorName(actorName);
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

seriesRoutes.get('/premier/:premier_date', async (req, res) => {
  try {
    const { premier_date } = req.params;
    const data = await service.showSerieByDate(premier_date)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message:error })
  }
});

seriesRoutes.put('/:serieId', async (req, res) => {
  try {
    const { serieId } = req.params;
    const { serie, number_seasons, original_lenguage, features_seasons } =
      req.body;
    const data = await service.editSeries(
      serieId,
      serie,
      number_seasons,
      original_lenguage,
      features_seasons
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

seriesRoutes.delete('/:serieId', async (req, res) => {
  try {
    const { serieId } = req.params;
    const deleted = await service.removeSeries(serieId);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = seriesRoutes;

const serieSchema = require('../models/series.models');
const Boom = require('@hapi/boom');

class SeriesService {
  async createSeries(serie) {
    serie.save();
    return serie;
  }
  async listSeries() {
    return new Promise((resolve, reject) => {
      resolve(serieSchema.find());
    });
  }
  async showSeries(seriesId) {
    return serieSchema.findById({ _id: seriesId }).then((series) => {
      if (!series) throw Boom.notFound('Series not found');
      return series;
    });
  }
  async editSeries(
    seriesId,
    serie,
    number_seasons,
    original_lenguage,
    features_seasons
  ) {
    return serieSchema.findById({ _id: seriesId }).then((series) => {
      if (!series) throw Boom.notFound('Series not found');
      return serieSchema.updateOne(
        { _id: seriesId },
        { serie, number_seasons, original_lenguage, features_seasons }
      );
    });
  }
  async removeSeries(seriesId) {
    return serieSchema.findById({ _id: seriesId }).then((series) => {
      if (!series) throw Boom.notFound('Series not found');
      return serieSchema.deleteOne(series);
    });
  }

  async getSeriesByActorName(actorName) {
    const series = await serieSchema.find();
    //Solución 1
    const matchedSeries = series.filter((serie) =>
      serie.features_seasons.cast.includes(actorName)
    );

    if (matchedSeries.length === 0)
      throw Boom.notFound('No series featuring that actor');

    //Solución 2
    // const matchedSeries = [];

    // series.forEach((serie) => {
    //   if (serie.features_seasons.cast.includes(actorName)) {
    //     matchedSeries.push(serie);
    //   }
    // });
    return matchedSeries;
  }

  async showSerieByDate(premier_date) {
    const data = await serieSchema.find({
      'features_seasons.premier_date': premier_date,
    });
    if (data.length === 0)
      throw Boom.notFound('No series premiered on that date');
    return data;
  }
}

module.exports = SeriesService;

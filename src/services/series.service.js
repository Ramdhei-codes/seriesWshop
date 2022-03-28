const serieSchema = require('../models/series.models');

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
    return serieSchema.findById({ _id: seriesId });
  }
  async editSeries(
    seriesId,
    serie,
    number_seasons,
    original_lenguage,
    features_seasons
  ) {
    return serieSchema.updateOne(
      { _id: seriesId },
      { serie, number_seasons, original_lenguage, features_seasons }
    );
  }
  async removeSeries(seriesId) {
    const removedSeries = serieSchema.findById({ _id: seriesId });
    return serieSchema.deleteOne(removedSeries);
  }

  async getSeriesByActorName(actorName) {
    const series = await serieSchema.find();
    //Solución 1
    const matchedSeries = series.filter((serie) =>
      serie.features_seasons.cast.includes(actorName)
    );

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
    return serieSchema.find({ 'features_seasons.premier_date': premier_date });
  }
}

module.exports = SeriesService;

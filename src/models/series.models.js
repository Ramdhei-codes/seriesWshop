const mongoose = require('mongoose');

const serieSchema = mongoose.Schema({
  serie: {
    type: String,
    required: true,
    unique: true,
  },
  number_seasons: {
    type: Number,
    required: true,
  },
  original_lenguage: {
    type: String,
    required: true,
  },
  features_seasons: {
    type: Object,
    required: true,
    season_number: {
      type: Number,
      required: true,
    },
    season_name: {
      type: String,
      required: true,
    },
    premier_date: {
      type: String,
      required: true,
    },
    cast: {
      type: Array,
      required: true,
    },
    episodes: {
      type: Object,
      required: true,
      episode_name: {
        type: String,
        required: true,
      },
      time_duration: {
        type: Number,
        required: true,
      },
    },
  },
});
module.exports = mongoose.model('seriesCollection', serieSchema);

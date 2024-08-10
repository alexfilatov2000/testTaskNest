import 'dotenv/config';
import config from '../config/configuration';

// This type of export is required by sequelize-cli
module.exports = config().database;

/**
 * Database Service/Wrapper
 */

const MainService = require('./MainService');
const dbServiceProvider = require('mongoose');

module.exports = class DbService extends MainService {
  constructor(options) {
    super('DB Service');
    const self = this;
    self._dbProvider = dbServiceProvider;
    self._dbProvider.Promise = global.Promise;
    self._options = options;
    self.connection = false;

    if (!(self._options && self._options.connectionString)) {
      super.throwError('database connection string is not provided');
    }
  }

  static getDataTypes() {
    return dbServiceProvider.Schema.Types;
  }

  static getSchemaTypes() {
    return dbServiceProvider.Schema.Types;
  }

  static createSchema(schemaData, options) {
    return new dbServiceProvider.Schema(schemaData, options);
  }

  static createModel(modelName, schema) {
    dbServiceProvider.Promise = global.Promise;
    return dbServiceProvider.model(modelName, schema);
  }


  static models(modelName) {
    if (modelName) {
      return dbServiceProvider.models[modelName];
    }
    return dbServiceProvider.models;
  }

  static dropDatabase() {
    return dbServiceProvider.connection.dropDatabase();
  }

  connect() {
    return this._dbProvider.connect(this._options.connectionString, { useNewUrlParser: true });
  }
};

import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Subscription from '../app/models/Subscription';
import databaseConfig from '../config/database';

const models = [User, File, Meetup, Subscription];

class Database {
  constructor() {
    this.init();
    this.associate();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    /**
     * Connect the models
     */
    models.map(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }

  /**
   * Connection mongoDB
   */
  mongo() {
    this.mongo.connection = mongoose.connect(
      'mongodb://localhost:27017/meetapp',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();

const { logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
        console.log("body data in crud repo", data)
      const response = await this.model.create(data);
      console.log("what is the response ", response)
      return response ;
    } catch (error) {
        console.log('error is yaha tak nakli', error )
      logger.error("Something went wrong in the CRUD Repo : create");
      throw error;
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },

      });
      return response
    } catch (error) {
      logger.error("Something went wrong in the CRUD Repo : create");
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response ;
    } catch (error) {
      logger.error("Something went wrong in the CRUD Repo : create");
      throw error;
    }
  }

  async getAll(data) {
    try {
      const response = await this.model.findAll(data);
      return response ;
    } catch (error) {
      logger.error("Something went wrong in the CRUD Repo : create");
      throw error;
    }
  }

  async update(id, data) {
    // here data variable is object (having key and value pair )
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response ;
    } catch (error) {
      logger.error("Something went wrong in the CRUD Repo : create");
      throw error;
    }
  }
}

module.exports = CrudRepository;

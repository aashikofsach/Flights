const { logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
    } catch (error) {
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
    } catch (error) {
      logger.error("Something went wrong in the CRUD Repo : create");
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
    } catch (error) {
      logger.error("Something went wrong in the CRUD Repo : create");
      throw error;
    }
  }

  async getAll(data) {
    try {
      const response = await this.model.findAll(data);
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
    } catch (error) {
      logger.error("Something went wrong in the CRUD Repo : create");
      throw error;
    }
  }
}

module.exports = CrudRepository;

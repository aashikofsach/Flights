const { logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    console.log("body data in crud repo", data);
    const response = await this.model.create(data);
    console.log("what is the response ", response);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    return response;
  }

  async getAll(data) {
    const response = await this.model.findAll(data);
    return response;
  }

  async update(id, data) {
    // here data variable is object (having key and value pair )

    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }
}

module.exports = CrudRepository;

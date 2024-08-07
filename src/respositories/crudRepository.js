class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response
    };

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async get(data) {
        const response = await this.model.findByPk(data);
        return response;
    }

    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id: id,
            },
        });
        return response;
    }

    async update(id, data) {
        const response = await this.model.update(data, {
            where: {
                id: id,
            },
        });
        const updatedAirplane = await this.model.findByPk(id);
        return updatedAirplane;
    }

}

module.exports = CrudRepository;
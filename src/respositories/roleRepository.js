const CrudRepository = require('./crudRepository');
const { Role } = require('../models');


class RoleRepository extends CrudRepository {
    constructor() {
        super(Role);
    }

    async getRoleByName(name) {
        console.log('name', name);
        
        const role = await Role.findOne({ where: { name: name } });
        return role;
    }
}

module.exports = RoleRepository;
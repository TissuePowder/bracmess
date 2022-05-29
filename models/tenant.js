const BaseModel = require('./basemodel');

class Tenant extends BaseModel {

    static get tableName() {
        return 'tenant';
    }


    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 6, maxLength: 127 },
                phone: { type: 'string' },
                role: { type: 'string', enum: ['regular', 'guest', 'manager'] },
                password: {type: 'string', minLength: 6, maxLength: 128}

            }
        };
    }

    static get relationMappings() {
        return {
            bazars: {
                relation: BaseModel.HasManyRelation,
                modelClass: require('./bazar'),
                join: {
                    from: 'tenant.id',
                    to: 'bazar.tenantId'
                }
            },
            meals: {
                relation: BaseModel.HasManyRelation,
                modelClass: require('./meal'),
                join: {
                    from: 'tenant.id',
                    to: 'meal.tenantId'
                }
            }

        };
    }
}

module.exports = Tenant;

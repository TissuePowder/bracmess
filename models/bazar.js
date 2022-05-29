const BaseModel = require('./basemodel');

class Bazar extends BaseModel {

    static get tableName() {
        return 'bazar';
    }


    static get jsonSchema() {
        return {
            type: 'object',
            required: ['date', 'amount'],

            properties: {
                date: { type: 'string' },
                expense: { type: 'number' },
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

module.exports = Bazar;

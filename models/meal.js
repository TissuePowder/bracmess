const BaseModel = require('./basemodel');

class Meal extends BaseModel {

    static get tableName() {
        return 'meal';
    }


    static get jsonSchema() {
        return {
            type: 'object',
            required: ['date'],

            properties: {
                date: { type: 'string' },
                quantity: {type: 'integer'}
            }
        };
    }

    static get relationMappings() {
        return {
            tenant: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: require('./tenant'),
                join: {
                    from: 'meal.tenantId',
                    to: 'tenant.id'
                }
            },

            mealType: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: require('./mealtype'),
                join: {
                    from: 'meal.mealTypeId',
                    to: 'mealType.id'
                }
            }

        };
    }
}

module.exports = Meal;

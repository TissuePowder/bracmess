const BaseModel = require('./basemodel');

class MealType extends BaseModel {

    static get tableName() {
        return 'mealType';
    }


    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                description: { type: 'string', minLength: 1, maxLength: 255 },
            }
        };
    }

    static get relationMappings() {
        return {
            meals: {
                relation: BaseModel.HasManyRelation,
                modelClass: require('./meal'),
                join: {
                    from: 'mealType.id',
                    to: 'meal.mealTypeId'
                }
            }

        };
    }
}

module.exports = MealType;

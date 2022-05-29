const { defineAbility } = require("@casl/ability");
const acl = (user, resource, action, body, opts, relation) => {

  return defineAbility((can, cannot) => {

    if (user.role === 'manager') {
      can('manage', 'all');
    }

    switch (resource.constructor.name) {

      case 'Tenant':
        can('manage', 'Tenant');
        break;

      case 'Bazar':
        can('manage', 'Bazar');
        break;

      case 'MealType':
        can('manage', 'MealType');
        break;

      case 'Meal':
        can('manage', 'Meal');
        break;
    }
  });
};

module.exports = acl;

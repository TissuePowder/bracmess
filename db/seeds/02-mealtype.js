// seeds are for testing, do not use them in production

exports.seed = async function (knex) {
    await knex('mealType').del();
    await knex('mealType').insert([
      {
        id: 1,
        name: 'Breakfast',
        description: 'What you eat in the morning'
      },
      {
        id: 2,
        name: 'Lunch',
        description: 'What you eat at noon'
      },
      {
        id: 3,
        name: 'Supper',
        description: 'What you eat at night'
      },
      {
        id: 4,
        name: 'Feast',
        description: "It's time to eat!"
      }
    ]);
  };

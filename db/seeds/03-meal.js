// seeds are for testing, do not use them in production

const date = require("date-and-time");

exports.seed = async function (knex) {
  await knex("meal").del();
  await knex("meal").insert([
    {
      date: date.format(new Date(), "YYYY-MM-DD"),
      tenantId: 1,
      mealTypeId: 2,
      quantity: 1,
    },
    {
      date: date.format(new Date(), "YYYY-MM-DD"),
      tenantId: 1,
      mealTypeId: 3,
      quantity: 1,
    },
    {
      date: date.format(new Date(), "YYYY-MM-DD"),
      tenantId: 2,
      mealTypeId: 2,
      quantity: 1,
    },
    {
      date: date.format(new Date(), "YYYY-MM-DD"),
      tenantId: 2,
      mealTypeId: 3,
      quantity: 1,
    },
    {
      date: date.format(new Date(), "YYYY-MM-DD"),
      tenantId: 3,
      mealTypeId: 2,
      quantity: 1,
    },
  ]);
};

// seeds are for testing, do not use them in production

exports.seed = async function (knex) {
  await knex("tenant").del();
  await knex("tenant").insert([
    {
      id: 1,
      name: "Ika",
    },
    {
      id: 2,
      name: "Mika",
    },
    {
      id: 3,
      name: "Jira",
    },
    {
      id: 4,
      name: "Kura",
    }
  ]);
};

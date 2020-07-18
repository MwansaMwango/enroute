const db = require("../../models");
const faker = require("faker/locale/en_AU");

async function seedData() {
  db.Route.collection.drop(); // delete existing data in collection
  console.log("Creating Routes");
  // for loop to generate X amount of records in my db
  for (let index = 0; index < 10; index++) {
    const route = new db.Route({
      from: faker.address.city(),
      to: faker.address.city(),
      via: faker.address.city(),
      pointsEarned: faker.random.number({ max: 50 }), // limit max number to 50
    });

    route.save().catch((err) => console.log(err));
  }
}

module.exports = seedData;

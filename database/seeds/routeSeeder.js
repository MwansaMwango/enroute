const db = require("../../models");
const faker = require("faker/locale/en_AU");

async function seedData() {
  db.Route.collection.deleteMany(); // delete everything inside db
  
  console.log("Creating Routes");
  // for loop to generate X amount of records in my db
  for (let index = 0; index < 10; index++) {
    const route = new db.Route({
      from: faker.random.arrayElement(["Port Hedland", "Mooka", "Redmont", "Yandi", "MAC","Newman", "Jimblebar"]),
      to: faker.random.arrayElement(["Port Hedland", "Mooka", "Redmont", "Yandi", "MAC","Newman", "Jimblebar"]),
      via: faker.random.arrayElement(["Port Hedland", "Mooka", "Redmont", "Yandi", "MAC","Newman", "Jimblebar"]),
      pointsEarned: faker.random.number({ max: 50 }), // limit max number to 50
    });

    await route.save().catch((err) => console.log(err));
  }
}

module.exports = seedData;

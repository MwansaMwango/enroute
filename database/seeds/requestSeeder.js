const db = require("../../models");
const faker = require("faker/locale/en_AU");
const getRandomModel = require("./helper/getRandomModel.js");

async function seedData() {

  db.Request.collection.deleteMany(); // delete existing data in collection
  console.log("Creating Requests");
  // for loop to generate X amount of records in my db
  for (let index = 0; index < 10; index++) {
    const randomUser = await getRandomModel("User");
    const randomRoute = await getRandomModel("Route");
    const randomTrip = await getRandomModel("Trip");
    const request = new db.Request({
      departTime: faker.date.future(),
      departDate: faker.date.future(),
      hasPackage: faker.random.boolean(),
      seatsRequired: faker.random.number( {min: 1, max: 3}),
      isTransportVehicle: faker.random.boolean(),
      requestNote: faker.lorem.sentence(),
      status: faker.random.arrayElement(["Draft", "Pending", "Confirmed", "Completed", "Expired"]),
      user_id: randomUser._id,
      route_id: randomRoute._id,
      trip_id: randomTrip._id,
    });

    await request.save().catch((err) => console.log(err));
  }
}

module.exports = seedData;

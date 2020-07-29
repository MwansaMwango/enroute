const db = require("../../models");
const faker = require("faker/locale/en_AU");
const getRandomModel = require("./helper/getRandomModel.js");

async function seedData() {

  db.Trip.collection.deleteMany(); // delete existing data in collection
  
  console.log("Creating Trips");
  // for loop to generate X amount of records in my db
  for (let index = 0; index < 10; index++) {
    let randomUser = await getRandomModel("User");
    // let randomRoute = await getRandomModel("Route");
    const trip = new db.Trip({
      user_id: randomUser._id,
      tripNote: faker.lorem.sentence(),
      carryPackage: faker.random.boolean(),
      freeSeats: faker.random.number( {min: 1, max: 2}),
      departTime: faker.date.future(),
      departDate: faker.date.future(),
      to: faker.random.arrayElement(["Stirling", "Mount Lawley", "Joondalup", "Victoria Park", "Nedlands"]),
      from: faker.random.arrayElement(["Perth", "Burswood", "Belmont", "Cannington", "Malaga"]),
    });
    // await db.Trip.create(trip);
    await trip.save().catch((err) => console.log(err));
  }
}

module.exports = seedData;

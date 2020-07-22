const db = require("../../models");
const faker = require("faker/locale/en_AU");

async function seedData() {

  db.User.collection.deleteMany(); // delete existing data in collection
  console.log("Creating Users");
  // for loop to generate X amount of records in my db
  for (let index = 0; index < 5; index++) {
    const user = new db.User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "222",
      phone: faker.phone.phoneNumber(),
      pointsBalance: faker.random.number({ max: 50 }), // limit max number to 50
      // avatar: Faker.image.avatar(), ToDo
    });
    //User.create(user);
    await user.save().catch((err) => console.log(err));
  }
}
module.exports = seedData;

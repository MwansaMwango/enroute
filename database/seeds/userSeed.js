const User = require ("../../models/User");
const faker = require ("faker");
const connectDb = require ("../connection")

connectDb();

User.collection.drop(); // remove existing collection

for (let index = 0; index < 10; index++) {
    
    const user = new User(
        {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: "111",
            phone: faker.phone.phoneNumber(),
            pointsBalance: faker.random.number( {max: 50}), // limit max number to 50
            // avatar: Faker.image.avatar(), ToDo
        }
    )
    
    user.save().catch( (err) => console.log(err));
}

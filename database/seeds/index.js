const connectDb = require('./../../config/database');
const userSeeder = require('./userSeeder');
const tripSeeder = require('./tripSeeder');
const requestSeeder = require('./requestSeeder');
const routeSeeder = require('./routeSeeder');
const bookSeeder = require('./bookSeeder');

// connected to DB
connectDb();


async function seed(){
    // will run all the seeder files

    await userSeeder();
    await routeSeeder();
    await tripSeeder();
    await requestSeeder();
    await bookSeeder();
 
}

seed()
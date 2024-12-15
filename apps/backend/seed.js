const mongoose = require('mongoose');
const Stock = require('./src/shared/schemas/stock.schema');

const seedData = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 10,
    price: 150,
    userId: 'user123',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 5,
    price: 2800,
    userId: 'user123',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/stock-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');

    await Stock.deleteMany({});
    console.log('Cleared existing data');

    await Stock.insertMany(seedData);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();

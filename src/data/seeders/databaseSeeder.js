require('dotenv').config();
const mongoose = require('mongoose');
const { validateData } = require('./dataValidator');
const { loadCharacters, loadItems } = require('./dataLoader');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔌 Conectado a MongoDB');

    await validateData();

    await loadCharacters();
    await loadItems();

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
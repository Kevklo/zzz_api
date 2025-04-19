require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app')
const { loadCharacters, loadItems, updateData } = require('./data/seeders/dataLoader');

const PORT = process.env.PORT || 3005;

async function initializeServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Conected to MongoDB');

    await loadCharacters();
    await loadItems();
    await updateData();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      
    })} catch (error) {
      console.error(`Server initialization failed`, error);
      process.exit(1);
    }
}

initializeServer();
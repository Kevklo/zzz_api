const Character = require('../../models/Character');
const charactersData = require('../characters.json');
const Item = require('../../models/Item');
const itemsData = require('../items.json')

async function loadCharacters() {
  const count = await Character.countDocuments();
  
  if(count === 0){
  const charactersArray = Object.values(charactersData);
    
  await Character.insertMany(charactersArray);
  console.log(`${result.length} characters loaded`);
  } else {
    console.log('Characters already exist in database');
    
  }
}

async function loadItems() {
  const count = await Item.countDocuments();
  
  if (count === 0) {
    console.log('Loading items...');
    await Item.insertMany(itemsData);
    console.log(`Loaded ${itemsData.length} items`);
  } else {
    console.log('Items already exist in database');
  }
}

async function updateData() {
  console.log('Updating existing data...');
  
  await Character.deleteMany({});
  await Item.deleteMany({});
  
  await Character.insertMany(Object.values(charactersData));
  await Item.insertMany(itemsData);
  
  console.log('Database updated successfully');
}


module.exports = { loadCharacters, loadItems, updateData };
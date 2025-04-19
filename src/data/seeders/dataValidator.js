const charactersData = require('../characters.json');
const itemData = require('../items.json');

async function validateData() {
  const charactersArray = Object.values(charactersData);

  const characterNames = charactersArray.map(c => c.name);
  if (new Set(characterNames).size !== characterNames.length) {
    throw new Error('Duplicate character names found')
  }

  const itemNames = itemData.map(i => i.name);
  if (new Set(itemNames).size !== itemNames.length) {
    throw new Error('Duplicate item names found');
  }

  console.log('Data validation passed');
  
}

module.exports = { validateData };
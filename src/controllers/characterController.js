const Character = require('../models/Character');

exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    
    const charactersIndexed = characters.reduce((acc, character) => {
      acc[character.name] = character;
      return acc;
    }, {});
    
    res.json({
      success: true,
      count: characters.length,
      data: charactersIndexed,
      lastUpdated: new Date().toISOString()
    });
  } catch(error) {
    res.status(500).json({ 
      error: 'Error getting characters',
      details: error.message 
    });
  }
};

exports.getCharacterByName = async (req, res) => {
  try {
    const allCharacters = await Character.find();
    const character = allCharacters.find(c => 
      c.name.toLowerCase() === req.params.name.toLowerCase()
    );
    
    if(!character) {
      return res.status(404).json({ 
        error: `Character '${req.params.name}' not found`,
        suggestions: allCharacters.map(c => c.name)
      });
    }
    
    res.json({
      success: true,
      data: {
        [character.name]: character
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error finding character',
      details: error.message 
    });
  }
};

exports.getCharactersByAttribute = async (req, res) => {
  try {
    const validAttributes = ["Fire", "Electric", "Ice", "Ether", "Physical"];
    const requestedAttr = req.params.attribute;
    
    if (!validAttributes.some(attr => 
      attr.toLowerCase() === requestedAttr.toLowerCase()
    )) {
      return res.status(400).json({ 
        error: 'Invalid attribute',
        validAttributes,
        received: requestedAttr
      });
    }

    const characters = await Character.find({ 
      attribute: { $regex: new RegExp(`^${requestedAttr}$`, 'i') }
    });

    if(characters.length === 0) {
      return res.status(404).json({ 
        error: `No characters found with attribute '${requestedAttr}'`,
        suggestion: 'Check the attribute spelling or try another one',
        validAttributes
      });
    }

    const result = characters.reduce((acc, char) => {
      acc[char.name] = char;
      return acc;
    }, {});

    res.json({
      success: true,
      count: characters.length,
      attribute: requestedAttr,
      data: result,
      matchedNames: Object.keys(result)
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error searching characters',
      details: error.message 
    });
  }
};

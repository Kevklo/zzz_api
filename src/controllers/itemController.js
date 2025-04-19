const Item = require('../models/Item');

const buildItemImageUrl = (req, item) => {
  const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/static/images/items/${item.img}`;
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    
    const itemsWithImages = items.map(item => ({
      ...item.toObject(),
      imageUrl: buildItemImageUrl(req, item)
    }));

    res.json({
      success: true,
      count: items.length,
      data: itemsWithImages,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error getting items',
      details: error.message 
    });
  }
};

exports.getItemByName = async (req, res) => {
  try {
    const item = await Item.findOne({ name: req.params.name });
    
    if(!item) {
      return res.status(404).json({ 
        error: `Item '${req.params.name}' not found`,
        suggestions: await Item.distinct('name')
      });
    }

    const itemWithImage = {
      ...item.toObject(),
      imageUrl: buildItemImageUrl(req, item)
    };

    res.json({
      success: true,
      data: itemWithImage
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error getting item',
      details: error.message 
    });
  }
};
const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error getting items' });
  }
};

exports.getItemByName = async (req, res) => {
  try{
    const item = await Item.findOne({name: req.params.name});
    if(!item){
      return res.status(404).json({ error: 'Item not found'})
    }
    res.json(item);
  }
  catch (error) {
    res.status(500).json({ error: 'Error getting items' });
  }
}
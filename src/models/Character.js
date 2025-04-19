const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  attribute: {
    type: String,
    required: true,
    enum: ["Fire", "Electric", "Ice", "Ether", "Physical"],
    default: "Physical"
  },
  type: {
    type: String,
    enum: ["Attack", "Stun", "Anomaly", "Support", "Defense"]
  },
  smallImg: {
    type: String,
    required: true,
    default: "placeholder"
  }, 
  bigImg: {
    type: String,
    required: true,
    default: "placeholder"
  },
  coreSkillMaterials: {
  type:{  
    denny: {
      type: Number,
      required: true,
      default: 405000,
    },
    bossMat: {
      type: String,
      required: true,
    },
    weeklyMat: {
      type: String,
      required: true,
    },
  },
    required: true,
  }
})

module.exports = mongoose.model("Character", characterSchema);
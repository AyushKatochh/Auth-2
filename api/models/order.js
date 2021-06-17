const mongoose  = require('mongoose');

// Creating Schema
const orderSchema = mongoose.Schema({
    // format of mongoose Schema
    _id: mongoose.Schema.Types.ObjectId,
   // DETAIL CONFIGURATION
   // Which product is ordered
   // ref helps to connect two models
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    // Default quantity will be 1
    quantity: {type: Number, default: 1}
});

// model function takes two arguments name schema
module.exports = mongoose.model('Order', orderSchema);
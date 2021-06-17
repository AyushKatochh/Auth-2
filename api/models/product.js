const mongoose  = require('mongoose');

// Creating Schema
const productSchema = mongoose.Schema({
    // format of mongoose Schema
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: { type: Number, required: true},
    productImage: {type: String, required: true}
    // DETAIL CONFIGURATION
});

// model function takes two arguments name schema
module.exports = mongoose.model('Product', productSchema);
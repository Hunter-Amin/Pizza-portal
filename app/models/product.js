var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema= new mongoose.Schema({
	productname : { type: String, lowercase: true, required: true, unique: true },
	prize : { type: String, required: true, unique: true },
	//language : { type: String, lowercase: true, required: true, unique: true }
	
});

module.exports = mongoose.model('Product', productSchema);

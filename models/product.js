import mongoose, { Schema, models, model } from 'mongoose';

const ProductSchema = new Schema({
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
		required: [true, 'Title is required!'],
		unique: [true, 'Title must be unique!'],
	},
	type: {
		type: String,
		required: [true, 'Type is required!'],
	},
	image: {
		type: String,
		required: [true, 'Image is required!'],
	},
	signature: {
		type: String,
		required: [true, 'Signature is required!'],
	},
	price: {
		type: String,
		required: [true, 'Price is required!'],
	},
});

const Product =
	models.Product || model('Product', ProductSchema);

export default Product;

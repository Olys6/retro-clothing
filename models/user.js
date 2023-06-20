import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
	email: {
		type: String,
		unique: [true, 'Email already exists!'],
		required: [true, 'Email is required!'],
	},
	username: {
		type: String,
		required: [true, 'Username is required!'],
	},
	image: {
		type: String,
	},
	cart: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
	},
	favourite: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
			},
		],
	},
	purchaseHistory: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
			},
		],
	},
});

const User = models.User || model('User', userSchema);

export default User;

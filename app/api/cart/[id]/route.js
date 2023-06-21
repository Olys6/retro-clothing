import User from '@models/user';
import { connectToDB } from '@utils/database';

export const DELETE = async (req, { params }) => {
	try {
		await connectToDB();

		const productId = params.id; // Get the ID of the item to be deleted from the route parameter

		// Find the user based on the provided email
		const user = await User.findOne({
			email: req.url.split('email=')[1],
		});

		if (!user) {
			return new Response('User not found', {
				status: 404,
			});
		}

		// Find the index of the cart item with the matching product ID
		const itemIndex = user.cart.items.findIndex(
			item => item._id.toString() === productId
		);

		if (itemIndex === -1) {
			return new Response('Item not found in the cart', {
				status: 404,
			});
		}

		// Remove the cart item from the user's cart
		user.cart.items.splice(itemIndex, 1);

		// Save the updated user object
		await user.save();

		return new Response('Cart item deleted', {
			status: 200,
		});
	} catch (error) {
		return new Response('Server Error', {
			status: 500,
		});
	}
};

export const PATCH = async (request, { params }) => {
	const { quantity } = await request.json();
	try {
		await connectToDB();

		const user = await User.findOne({
			email: request.url.split('email=')[1],
		});

		if (!user) {
			return new Response('User not found', {
				status: 404,
			});
		}

		const cartItemIndex = user.cart.items.findIndex(
			item => item._id.toString() === params.id
		);

		if (cartItemIndex === -1) {
			return new Response('Item not found in the cart', {
				status: 404,
			});
		}

		user.cart.items[cartItemIndex].quantity = quantity;

		await user.save();

		return new Response('Cart item updated', {
			status: 200,
		});
	} catch (error) {
		return new Response('Failed to update cart item', {
			status: 500,
		});
	}
};

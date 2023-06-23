import User from '@models/user';
import Product from '@models/product';
import { connectToDB } from '@utils/database';

export const DELETE = async (req, { params }) => {
	const url = new URL(req.url);
	const searchParams = url.searchParams;
	const userId = searchParams.get('id');
	try {
		if (!userId) {
			return new Response('User ID not provided', {
				status: 400,
			});
		}
		await connectToDB();

		const productId = params.id; // Get the ID of the item to be deleted from the route parameter

		// Find the user based on the provided email
		const user = await User.findOne({
			_id: userId,
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

export const PATCH = async (req, { params }) => {
	const { quantity } = await req.json();
	const url = new URL(req.url);
	const searchParams = url.searchParams;
	const userId = searchParams.get('id');

	try {
		if (!userId) {
			return new Response('User ID not provided', {
				status: 400,
			});
		}

		await connectToDB();

		const user = await User.findOne({
			_id: userId,
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
		console.log(error);
		return new Response('Failed to update cart item', {
			status: 500,
		});
	}
};

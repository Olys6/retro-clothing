import User from '@models/user';

export const POST = async request => {
	const { userId, productId, quantity } =
		await request.json();

	try {
		console.log(userId);
		const user = await User.findById(userId);
		console.log('USER ', user);

		if (!user) {
			return new Response('User not found', {
				status: 404,
			});
		}

		// Check if the product is already in the user's cart
		const existingCartItem = user.cart.items.find(
			item => item.productId.toString() === productId
		);

		if (existingCartItem) {
			// If the product is already in the cart, update the quantity
			existingCartItem.quantity += quantity;
		} else {
			// If the product is not in the cart, add it as a new item
			user.cart.items.push({ productId, quantity });
		}

		await user.save();

		return new Response(JSON.stringify(user), {
			status: 200,
		});
	} catch (error) {
		return new Response(
			`Failed to add item to cart: ${error}`,
			{
				status: 500,
			}
		);
	}
};

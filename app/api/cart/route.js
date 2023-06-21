import User from '@models/user';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
	// console.log('REQUEST EMAIL => ', req.url.split('=')[1]);
	try {
		await connectToDB();

		// console.log('REQUEST EMAIL => ', req);
		// Get the user's email from the request session or query parameters
		const userEmail = req.url.split('email=')[1]; // Example: ?email=user@example.com

		// console.log('USER EMAIL => ', userEmail);

		// Find the user based on the provided email
		const user = await User.findOne({
			email: userEmail,
		}).populate('cart.items.productId');

		if (!user) {
			return new Response('User not found', {
				status: 404,
			});

			// res.status(404).json({ message: 'User not found' });
			// return;
		}

		// Return the user's cart items
		return new Response(JSON.stringify(user.cart.items), {
			status: 200,
		});

		// res.status(200).json({ cartItems: user.cart.items });
	} catch (error) {
		// console.error('CART ERROR => ', error);

		return new Response('Server Error', {
			status: 500,
		});
		// res.status(500).json({ message: 'Server Error' });
	}
};

import User from '@models/user';
import { connectToDB } from '@utils/database';

export const revalidate = 0;

export const GET = async (req, { params }) => {
	// console.log('REQUEST EMAIL => ', req.url.split('=')[1]);
	try {
		await connectToDB();

		// Get the user's email from the request session or query parameters (that's would should be done)
		const userEmail = req.url.split('?email=')[1];

		console.log('USER EMAIL => ', userEmail);

		// Find the user based on the provided email
		const user = await User.findOne({
			email: userEmail,
		}).populate('cart.items.productId');

		console.log('HITTING');

		console.log('USER => ', user.cart.items);

		if (!user) {
			return new Response('User not found', {
				status: 404,
			});
		}
		const headers = {
			'Content-Type': 'application/json',
			'Cache-Control':
				'no-cache, no-cache, must-revalidate, proxy-revalidate',
			Expires: '0',
			Pragma: 'no-cache',
		};

		// Return the user's cart items
		return new Response(JSON.stringify(user.cart.items), {
			status: 200,
			headers,
		});
	} catch (error) {
		return new Response('Server Error', {
			status: 500,
		});
	}
};

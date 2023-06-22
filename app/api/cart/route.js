import User from '@models/user';
import Product from '@models/product';
import { connectToDB } from '@utils/database';

export const revalidate = 0;

export const GET = async req => {
	const url = new URL(req.url);
	const searchParams = url.searchParams;
	const userId = searchParams.get('id') || '';
	try {
		await connectToDB();
		// Get the user's email from the request session or query parameters (that's would should be done)

		// Find the user based on the provided email
		const user = await User.findOne({
			id: userId,
		}).populate('cart.items.productId');

		if (!user) {
			// console.log(user);
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
		console.log(error);
		return new Response(`Server Error ${error}`, {
			status: 500,
		});
	}
};

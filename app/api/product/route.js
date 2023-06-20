import Product from '@models/product';
import { connectToDB } from '@utils/database';

export const GET = async request => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const search = searchParams.get('search') || '';
	const regex = new RegExp(search, 'i');

	try {
		await connectToDB();

		const type = searchParams.get('type') || ''; // Get the value of the 'type' query parameter

		const filter = {
			product: { $regex: regex },
		};

		if (type) {
			filter.type = type; // Add a filter for type if provided
		}

		const products = await Product.find(filter).populate(
			'creator'
		);

		const headers = {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache, must-revalidate',
			Expires: '0',
			Pragma: 'no-cache',
		};

		return new Response(JSON.stringify(products), {
			status: 200,
			headers,
		});
	} catch (error) {
		return new Response(
			`Failed to fetch products: ${error}`,
			{
				status: 500,
			}
		);
	}
};

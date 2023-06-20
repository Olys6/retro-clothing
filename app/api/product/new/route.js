import Product from '@models/product';
import { connectToDB } from '@utils/database';

export const POST = async request => {
	const { userId, title, type, image, signature, price } =
		await request.json();

	try {
		await connectToDB();
		const newProduct = new Product({
			creator: userId,
			title,
			type,
			image,
			signature,
			price,
		});

		await newProduct.save();
		return new Response(JSON.stringify(newProduct), {
			status: 200,
		});
	} catch (error) {
		return new Response(
			`Failed to create new product: ${error}`,
			{ status: 500 }
		);
	}
};

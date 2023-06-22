'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Products = ({ type }) => {
	const { data: session } = useSession();
	const [search, setSearch] = useState('');
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [addedToCart, setAddedToCart] = useState('');

	useEffect(() => {
		const typeOfProduct = type;
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`/api/product${
						typeOfProduct && `?type=${typeOfProduct}`
					}`,
					{
						method: 'GET',
						headers: { 'Cache-Control': 'no-store' },
					}
				);
				const data = await response.json();

				setProducts(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProducts();
	}, [type]);

	// useEffect(() => {
	// 	console.log('PRODUCTS => ', products);
	// }, [products, setProducts]);

	const filteredProducts = () => {
		const regexSearch = new RegExp(`\\b${search}`, 'i');

		return products?.filter(
			product =>
				regexSearch.exec(product.title) ||
				regexSearch.exec(product.signature) ||
				regexSearch.exec(product.price) ||
				regexSearch.exec(product.signature) ||
				regexSearch.exec(product.type)
		);
	};

	// Function to handle adding items to the cart
	const handleAddToCart = async product => {
		try {
			const response = await fetch('/api/cart/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: session.user.id, // Replace with the actual user ID
					productId: product._id,
					quantity: 1, // You can modify this to add a specific quantity
				}),
			});

			if (response.ok) {
				console.log('Item added to cart');
				setAddedToCart(product._id);
				// Handle any additional logic or state updates
			} else {
				console.error(
					'Failed to add item to cart:',
					response.status
				);
			}
		} catch (error) {
			console.error('Failed to add item to cart:', error);
		} finally {
			setTimeout(() => {
				setAddedToCart('');
			}, 1000);
		}
	};

	// useEffect(() => {
	// 	console.log('CART ITEMS', cartItems);
	// }, [cartItems]);

	return (
		<div className='pt-32 h-screen container mx-auto flex flex-col gap-10 items-center'>
			<input
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder='Search'
				className='text-black px-2 text-x py-1'
			/>
			<div className='flex gap-10 justify-center flex-wrap'>
				{filteredProducts()?.map(product => (
					<div
						key={product._id}
						className='bg-white p-3 relative w-60 flex flex-col items-left'>
						<p className='w-full text-black h-12'>
							{product.title}{' '}
						</p>
						<div className='w-full flex justify-center'>
							<Image
								src={product.image}
								alt={product.title}
								width={200}
								height={200}
							/>
						</div>

						<p className='text-black font-retroSign text-5xl flex justify-between items-center pr-2 absolute bottom-9'>
							{product.signature}{' '}
						</p>
						<div className='flex gap-2 items-end mt-5'>
							<button
								onClick={() => handleAddToCart(product)}
								className='pl-1 w-36 h-6 bg-black flex items-center gap-2 cursor-pointer hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
								{product._id !== addedToCart ? (
									<>
										Add to cart{' '}
										<Image
											width={20}
											height={20}
											src='/icons/cartWhite.svg'
											alt='cart'
											className='mr-2'
										/>
									</>
								) : (
									<>Added!</>
								)}
							</button>

							<div className='flex flex-col gap-1 h-14 justify-end w-16'>
								{type === 'Shoes' && (
									<del className='text-black font-vcr text-base flex px-1'>
										£{product.price}
									</del>
								)}
								<p className='text-white bg-red-500 font-vcr text-base flex justify-center px-1'>
									£
									{type === 'Shoes'
										? (
												product.price -
												product.price * 0.7
										  ).toFixed()
										: product.price}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;

'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Cart = () => {
	const { data: session } = useSession();
	const [cartItems, setCartItems] = useState([]);
	const [isDataPulled, setIsDataPulled] = useState(false);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await fetch(
					`/api/cart?id=${session.user.id}`,
					{
						method: 'GET',
					}
				);

				const data = await response.json();
				// console.log('DATA => ', data);
				setCartItems(data);
				setIsDataPulled(true);
			} catch (error) {
				console.error('Failed to fetch cart items:', error);
			}
		};

		if (session?.user.id) {
			fetchCartItems();
		}
	}, [session?.user.id]);

	const handleItemDelete = async itemId => {
		try {
			const response = await fetch(
				`/api/cart/${itemId}?` +
					new URLSearchParams({
						userId: session.user.id,
					}).toString(),
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				// Item deletion successful
				console.log('Item deleted from cart');
				// Update the cartItems state by removing the deleted item
				setCartItems(prevCartItems =>
					prevCartItems.filter(item => item._id !== itemId)
				);

				// Perform any additional actions after item deletion
			} else {
				console.error(
					'Failed to delete item from cart:',
					response.status,
					response.statusText
				);
				// Handle the error and display an appropriate message to the user
			}
		} catch (error) {
			console.error(
				'Failed to delete item from cart:',
				error
			);
			// Handle the error and display an appropriate message to the user
		}
	};

	const handleQuantityChange = async (
		itemId,
		newQuantity
	) => {
		console.log('ITEM ID => ', itemId);
		console.log('USER ID => ', session.user.id);
		try {
			const response = await fetch(
				`/api/cart/${itemId}?id=${session?.user.id}`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						quantity: newQuantity,
						userId: session.user.id,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.ok) {
				// Item quantity update successful
				console.log('Item quantity updated in cart');

				// Update the cartItems state by replacing the item with the updated quantity
				setCartItems(prevCartItems =>
					prevCartItems.map(item =>
						item._id === itemId
							? { ...item, quantity: newQuantity }
							: item
					)
				);

				// Perform any additional actions after item quantity update
			} else {
				console.log('HITTING');
				console.error(
					'Failed to update item quantity in cart:',
					response.status,
					response
				);
				// Handle the error and display an appropriate message to the user
			}
		} catch (error) {
			console.log('HITTING');
			console.error(
				'Failed to update item quantity in cart:',
				error
			);
			// Handle the error and display an appropriate message to the user
		}
	};

	const calculateTotal = () => {
		let total = 0;
		for (const item of cartItems) {
			if (item.productId.type === 'Shoes') {
				total +=
					parseFloat(
						(
							item.productId.price -
							item.productId.price * 0.7
						).toFixed(2)
					) * item.quantity;
			} else {
				total += parseFloat(
					(item.productId.price * item.quantity).toFixed(2)
				);
			}
		}
		return total;
	};

	return (
		<div className='pt-32 h-screen container mx-auto'>
			<p className='text-7xl font-retroSign m-10 '>
				Weclome to your cart{' '}
				{session?.user?.name.split(' ')[0]}
			</p>

			<div className='w-full flex items-start gap-2 flex-col'>
				{!isDataPulled
					? [...Array(3)].map((item, i) => (
							<div
								key={i}
								className='animate-pulse bg-white w-full flex justify-between text-black p-2'>
								<div>
									<p className='text-xl flex items-center w-72 gap-2 bg-gray-500 h-6'></p>
									<div className='flex items-center gap-2'>
										{/* IMAGE */}
										<div className='w-20 h-20 bg-gray-500 mt-1'></div>
										<p className='font-retroSign text-6xl w-24 h-10 mt-5 ml-3 bg-gray-500'>
											{/* SIGNATURE */}
										</p>
									</div>
								</div>
								<div className='pr-5 flex items-center gap-10'>
									<div className='flex gap-2 text-xl w-20 h-5 bg-gray-500'></div>
								</div>
							</div>
					  ))
					: cartItems?.map((item, index) => (
							<div
								key={item._id}
								className='bg-white w-full flex justify-between text-black p-2'>
								<div>
									<p className='text-xl flex items-center gap-2'>
										{item.productId.title}{' '}
										<span className='bg-red-500 text-white w-fit px-1 text-base'>
											£
											{item.productId.type !== 'Shoes'
												? item.productId.price *
												  item.quantity
												: (
														item.productId.price -
														item.productId.price * 0.7
												  ).toFixed() * item.quantity}
										</span>
										{item.productId.type === 'Shoes' && (
											<del className='text-base flex'>
												{' '}
												{item.productId.price}
											</del>
										)}
									</p>
									<div className='flex items-center gap-2'>
										<Image
											src={item.productId.image}
											alt={item.productId.title}
											width={80}
											height={80}
										/>
										<p className='font-retroSign text-6xl'>
											{item.productId.signature}
										</p>
									</div>
								</div>
								<div className='pr-5 flex items-center gap-10'>
									<div className='flex gap-2 text-xl'>
										<button
											onClick={() =>
												handleQuantityChange(
													item._id,
													item.quantity - 1
												)
											}
											className='hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
											-
										</button>
										<p>{item.quantity}</p>
										<button
											onClick={() =>
												handleQuantityChange(
													item._id,
													item.quantity + 1
												)
											}
											className='hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
											+
										</button>
									</div>
									<button
										onClick={() =>
											handleItemDelete(item._id)
										}
										className='bg-red-500 px-1 text-white hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
										Remove
									</button>
								</div>
							</div>
					  ))}
			</div>
			{isDataPulled && (
				<p className='bg-white text-black mt-10 flex gap-1 pl-2'>
					<Image
						src='/icons/cartBlack.svg'
						alt='black cart'
						width={17}
						height={17}
					/>{' '}
					Total: £{calculateTotal()}{' '}
				</p>
			)}
		</div>
	);
};

export default Cart;

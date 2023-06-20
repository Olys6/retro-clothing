'use client';

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const Cart = () => {
	const { data: session } = useSession();
	const [cartItems, setCartItems] = useState([]);

	// Retrieve cart data from local storage on component mount
	const updateCartItems = () => {
		try {
			const storedCartItems =
				localStorage.getItem('cartItems');
			if (storedCartItems) {
				setCartItems(JSON.parse(storedCartItems));
			}
		} catch (error) {
			// Handle the parsing error
			console.log('Error parsing cart items:', error);
		}
		console.log(cartItems);
	};

	useEffect(() => {
		updateCartItems();
	}, []);

	return (
		<div className='pt-32 h-screen container mx-auto'>
			<p className='text-7xl font-retroSign m-10 '>
				Weclome to your cart{' '}
				{session?.user?.name.split(' ')[0]}
			</p>

			<div className='w-full flex items-center bg-gray-900'>
				{cartItems.map((item, index) => (
					<div
						key={index}
						className='w-full'>
						<p>{item.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Cart;

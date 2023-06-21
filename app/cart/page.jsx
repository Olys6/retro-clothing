'use client';

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const Cart = () => {
	const { data: session } = useSession();
	const [cartItems, setCartItems] = useState([]);

	// useEffect(() => {
	// console.log(session.user.email);

	const fetchCartItems = async () => {
		try {
			const response = await fetch(
				`/api/cart?email=${session?.user?.email}`
			);

			if (response.ok) {
				const data = await response.json();
				console.log('DATA => ', data);
				setCartItems(data.cartItems);
			} else {
				console.error(
					'Failed to fetch cart items:',
					response.status
				);
			}
		} catch (error) {
			console.error('Failed to fetch cart items:', error);
		}
	};

	// fetchCartItems();
	// }, [session?.user?.email]);

	return (
		<div className='pt-32 h-screen container mx-auto'>
			<p className='text-7xl font-retroSign m-10 '>
				Weclome to your cart{' '}
				{session?.user?.name.split(' ')[0]}
			</p>

			<div className='w-full flex items-center bg-gray-900'>
				{/* {cartItems.map((item, index) => (
					<div
						key={index}
						className='w-full'>
						<p>{item.name}</p>
					</div>
				))} */}
			</div>
			<button onClick={fetchCartItems}>Pull Data</button>
		</div>
	);
};

export default Cart;

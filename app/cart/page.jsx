'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Cart = () => {
	const { data: session } = useSession();
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		// console.log(session.user.email);

		const fetchCartItems = async () => {
			try {
				const response = await fetch(
					`/api/cart?email=${session?.user?.email}`
				);

				if (response.ok) {
					const data = await response.json();
					console.log('DATA => ', data);
					setCartItems(data);
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

		fetchCartItems();
	}, [session?.user?.email]);

	return (
		<div className='pt-32 h-screen container mx-auto'>
			<p className='text-7xl font-retroSign m-10 '>
				Weclome to your cart{' '}
				{session?.user?.name.split(' ')[0]}
			</p>

			<div className='w-full flex items-start gap-2 flex-col'>
				{cartItems?.map((item, index) => (
					<div
						key={index}
						className='bg-white w-full flex justify-between text-black p-2'>
						{console.log('ITEM => ', item)}
						<div>
							<p className='text-lg'>
								{item.productId.title}{' '}
								<span className='bg-red-500 text-white w-fit px-1 py-1'>
									{item.productId.price}£
								</span>
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
								<button className='hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
									-
								</button>
								<p>{item.quantity}</p>
								<button className='hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
									+
								</button>
							</div>
							<button className='bg-red-500 px-1 text-white hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
								Remove
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Cart;

'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

const Cart = () => {
	const { data: session } = useSession();

	return (
		<div className='pt-32 h-screen container mx-auto'>
			<p className='text-7xl font-retroSign m-10 '>
				Weclome to your cart{' '}
				{session?.user?.name.split(' ')[0]}
			</p>

			<div className='w-full flex items-center bg-gray-300'>
				hello
			</div>
		</div>
	);
};

export default Cart;

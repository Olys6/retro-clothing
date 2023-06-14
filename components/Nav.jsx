import Image from 'next/image';
import React from 'react';

const Nav = () => {
	return (
		<div className='absolute p-3 px-20'>
			<div className='flex items-center gap-5'>
				<Image
					src='/assets/OliverS_a_logo_for_an_80s_retro_clothing_store_916c1aa7-ae74-4c72-a866-97a87d279f8a.png'
					alt='80s retro clothing brand logo'
					width={60}
					height={60}
					className='rounded-full'
				/>
				<p className='text-4xl font-lazer'>
					Retro Clothing
				</p>
			</div>
		</div>
	);
};

export default Nav;

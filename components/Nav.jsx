'use client';

import Image from 'next/image';
import {
	signIn,
	signOut,
	useSession,
	getProviders,
} from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Nav = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [tglDropdwn, setTglDropdwn] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};

		setUpProviders();
	}, []);

	const cart = [];

	return (
		<div className='absolute p-3 md:px-20 flex w-full justify-between'>
			<Link
				href='/'
				className='flex items-center gap-5 cursor-pointer'>
				<Image
					src='/assets/OliverS_a_logo_for_an_80s_retro_clothing_store_e2a723c8-0773-4e3f-aa96-d1c08816b0e1.png'
					alt='80s retro clothing brand logo'
					width={60}
					height={60}
					priority
					className='rounded-full'
				/>
				<p className='text-3xl font-lazer'>
					Retro Clothing
				</p>
			</Link>
			<div className='flex items-center justify-center gap-5'>
				{providers &&
					!session?.user &&
					Object.values(providers).map((provider, i) => (
						<button
							key={i}
							onClick={() => signIn(provider.id)}
							type='button'
							className='hover:bg-black text-lg hover:text-white px-5 bg-white text-black duration-300 h-10'>
							Sign in with {provider.name}
						</button>
					))}

				{session?.user ? (
					<div className='relative'>
						<Image
							src={session?.user.image}
							alt='profile picture'
							height={45}
							width={45}
							className='rounded-full cursor-pointer hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'
							onClick={() => setTglDropdwn(prev => !prev)}
						/>
						{tglDropdwn ? (
							<div className='absolute right-2 flex flex-col justify-end items-end'>
								<div className='relative right-0 flex flex-col justify-end items-end gap-1 mt-2 z-10'>
									<Link
										href='/profile'
										onClick={() => setTglDropdwn(false)}
										className='dropdownItem flex justify-end w-36 items-center gap-2'>
										My Profile{' '}
										<Image
											src='/icons/profile.png'
											alt='profile icon'
											width={17}
											height={17}
										/>
									</Link>
									<Link
										href={`/cart?id=${session.user.id}`}
										onClick={() => setTglDropdwn(false)}
										className='dropdownItem w-28 flex justify-end gap-2 relative'>
										<p>My Cart</p>
										<Image
											src='/icons/cartBlack.svg'
											alt=''
											width={20}
											height={20}
											className='rounded-full'
										/>
										{cart.length > 0 ? (
											<div className='absolute top-0.5 right-0.5 bg-red-500 w-3.5 h-3.5 rounded-full text-xs flex items-center justify-center text-white'>
												{cart.length}
											</div>
										) : (
											<></>
										)}
									</Link>
									<Link
										href='/'
										onClick={() => (
											signOut(), setTglDropdwn(false)
										)}
										className='dropdownItem w-32 flex justify-end items-center'>
										Sign Out{' '}
										<Image
											src='/icons/logout.png'
											alt='logout icon'
											width={22}
											height={22}
											className='rounded-full'
										/>
									</Link>
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				) : null}
				{/* <Link
					href='/cart'
					className='bg-black rounded-full w-12 p-2 relative hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
					<Image
						src='/icons/cart.svg'
						alt='cart'
						width={36}
						height={36}
						className='w-auto h-auto'
					/>
					{cart.length > 0 ? (
						<div className='absolute top-0 right-0 bg-red-500 w-3.5 h-3.5 rounded-full text-xs flex items-center justify-center text-white'>
							{cart.length}
						</div>
					) : (
						<></>
					)}
				</Link> */}
			</div>
		</div>
	);
};

export default Nav;

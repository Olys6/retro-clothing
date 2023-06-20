'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Products = ({ type }) => {
	const [search, setSearch] = useState('');
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`/api/product${type && `?type=${type}`}`,
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
	}, []);

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
						className='bg-white p-3 relative'>
						<div className='text-black flex justify-between'>
							<p>{product.title} </p>
						</div>
						<Image
							src={product.image}
							alt={product.title}
							width={200}
							height={200}
						/>

						<p className='text-black font-retroSign text-5xl flex justify-between items-center pr-2 absolute bottom-8'>
							{product.signature}{' '}
						</p>
						<div className='flex gap-2 items-end mt-5'>
							<p className='pl-1 w-36 bg-black flex gap-2 cursor-pointer hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
								Add to cart{' '}
								<Image
									width={20}
									height={20}
									src='/icons/cart.svg'
									alt='cart'
									className='mr-2'
								/>
							</p>
							<div className='flex flex-col gap-1 h-14 justify-end w-16'>
								{type === 'Shoes' && (
									<del className='text-black font-vcr text-base flex px-1'>
										{product.price}£
									</del>
								)}
								<p className='text-white bg-red-500 font-vcr text-base flex justify-center px-1'>
									{type === 'Shoes'
										? (
												product.price -
												product.price * 0.7
										  ).toFixed()
										: product.price}
									£
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

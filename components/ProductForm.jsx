'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductForm = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [attemptSubmit, setAttemptSubmit] = useState(false);
	const [imageBase64, setImageBase64] = useState('');
	const [selectedImage, setSelectedImage] = useState({
		isSelected: false,
		image: null,
	});
	const [productData, setProductData] = useState({
		userId: session?.user?.id,
		title: '',
		type: '',
		image: imageBase64,
		signature: '',
		price: '',
	});

	const handleImageChange = event => {
		const file = event.target.files[0];
		convertImageToBase64(file);
	};

	const convertImageToBase64 = file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const base64Data = reader.result;
			setImageBase64(base64Data);
			setProductData({
				...productData,
				image: base64Data,
			});
		};
	};

	const handleData = async event => {
		setAttemptSubmit(true);
		event.preventDefault();

		if (
			!productData.title ||
			!productData.type ||
			!productData.image ||
			!productData.signature ||
			!productData.price
		) {
			// setAttemptSubmit(false);
			return;
		}

		try {
			const response = await fetch('/api/product/new', {
				method: 'POST',
				body: JSON.stringify({ ...productData }),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log('ERROR!', error);
		}
	};

	return (
		<div className='h-screen container mx-auto flex flex-col sm:items-start items-center'>
			<p className='text-7xl font-retroSign'>
				Welcome back{' '}
				<span className='text-7xl font-retroSign'>
					{session?.user?.name.split(' ')[0]}
				</span>
			</p>

			<div className='mt-20'>
				<p className='text-2xl'>
					Want to create a product?
				</p>
				<div className='mt-5'>
					<p className='text-lg'>
						Title<span className='text-red-500'>*</span>{' '}
						{attemptSubmit && !productData.title && (
							<span className='text-red-500'>
								You need a title
							</span>
						)}
					</p>
					<input
						value={productData.title}
						onChange={e =>
							setProductData({
								...productData,
								title: e.target.value,
							})
						}
						placeholder='ex: Retrowave'
						className='text-black pl-1'
					/>
				</div>
				<div className='mt-2'>
					<p className='text-lg'>
						Type<span className='text-red-500'>*</span>{' '}
						{attemptSubmit && productData.type === '' && (
							<span className='text-red-500'>
								You need a type
							</span>
						)}
					</p>
					<select
						value={productData.type}
						onChange={e =>
							setProductData({
								...productData,
								type: e.target.value,
							})
						}
						className='bg-white text-black p-1'>
						<option value=''></option>
						<option value='Shirts'>Shirts</option>
						<option value='Jeans'>Jeans</option>
						<option value='Shoes'>Shoes</option>
					</select>
				</div>
				<div className='mt-2'>
					<p className='text-lg'>
						Image<span className='text-red-500'>*</span>{' '}
						{attemptSubmit && !productData.image && (
							<span className='text-red-500'>
								You need an image
							</span>
						)}
					</p>
					<input
						type='file'
						accept='image/*'
						onChange={handleImageChange}
					/>
				</div>
				<div className='mt-2'>
					<p className='text-lg'>
						Signature<span className='text-red-500'>*</span>{' '}
						{attemptSubmit && !productData.image && (
							<span className='text-red-500'>
								You need a signature
							</span>
						)}
					</p>
					<input
						value={productData.signature}
						onChange={e =>
							setProductData({
								...productData,
								signature: e.target.value,
							})
						}
						placeholder='Oliver'
						className='text-black font-retroSign text-5xl pl-1'
					/>
				</div>
				<div className='mt-2'>
					<p className='text-lg'>
						Price<span className='text-red-500'>*</span>{' '}
						{attemptSubmit && !productData.title && (
							<span className='text-red-500'>
								You need a price
							</span>
						)}
					</p>
					<input
						value={productData.price}
						onChange={e =>
							setProductData({
								...productData,
								price: e.target.value,
							})
						}
						type='number'
						placeholder='9.99'
						className='text-black pl-1 mr-2'
						pattern='[0-9]*' // Only allows numeric input
					/>
					<span>£</span>
				</div>
				<button
					type='submit'
					onClick={handleData}
					className='mt-5 bg-white text-black px-4 py-1 hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
					Create
				</button>
			</div>
		</div>
	);
};

export default ProductForm;

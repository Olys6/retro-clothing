'use client';

import ProductForm from '@components/ProductForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Profile = () => {
	const router = useRouter();
	const { data: session } = useSession();

	return (
		<div className='h-screen pt-32 container mx-auto flex flex-col sm:items-start items-center'>
			<ProductForm />
		</div>
	);
};

export default Profile;

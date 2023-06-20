import Image from 'next/image';

const instaPics = [
	'OliverS_retro_80s_photoshoot',
	'OliverS_retro_80s_photoshoot2',
	'OliverS_retro_80s_photoshoot3',
	'OliverS_retro_80s_photoshoot_clothing_ad4',
	'OliverS_retro_80s_photoshoot_clothing_models_ad',
	'OliverS_retro_80s_photoshoot_clothing_models_ad2',
	'OliverS_retro_80s_photoshoot_clothing_models_ad_shoes',
	'OliverS_retro_80s_photoshoot_clothing_models_ad_shoes2',
	'OliverS_retro_80s_photoshoot_clothing_models_ad_jeans',
];

const SocialMediaSec = () => {
	return (
		<div className='w-full flex justify-center mt-14 flex-col container mx-auto'>
			<h1 className='text-4xl text-center text-white bg-black bg-opacity-10 p-5 mb-5'>
				Find out what real people think of our clothing
			</h1>
			<div className='flex sm:flex-row flex-col sm:gap-0 gap-10 justify-around items-center'>
				<div className='grid grid-cols-3 gap-2 sm:w-2/5 w-4/5'>
					{instaPics.map((item, i) => (
						<Image
							key={i}
							alt='Midjourney photoshoot images'
							src={`/assets/instagramPics/${item}.png`}
							width={130}
							height={130}
							className=''
						/>
					))}
				</div>
				<div className='flex flex-col gap-5'>
					<button className='flex w-48 justify-between items-center text-lg rounded-full pl-2 pr-5 py-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:scale-110 duration-300'>
						<Image
							src='/icons/instagram-round-svgrepo-com.svg'
							alt='instagram logo'
							width={50}
							height={50}
						/>
						<p>Instagram</p>
					</button>
					<button className='flex w-48 justify-between items-center text-lg rounded-full pl-2 pr-5 py-2 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500 hover:scale-110 duration-300'>
						<Image
							src='/icons/facebook-svgrepo-com.svg'
							alt='facebook logo'
							width={50}
							height={50}
							className='scale-110'
						/>
						<p>Facebook</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SocialMediaSec;

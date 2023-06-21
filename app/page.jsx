import SocialMediaSec from '@components/SocialMediaSec';
import Image from 'next/image';
import Link from 'next/link';

const productTypes = ['shirt', 'jean', 'shoe'];

export default function Home() {
	return (
		<main className='h-full pb-20 container mx-auto'>
			{/* Banner  */}
			<div className=' flex items-center justify-around px-5 pt-20'>
				<div className='bannerImg w-2/6 relative'>
					<p className='font-retroSign text-5xl absolute bottom-2 right-1/3 text-black'>
						Midjourney
					</p>
				</div>
				<div className='bannerText px-12 py-3 flex justify-center flex-col gap-5 font-bold md:relative absolute md:bg-opacity-20 bg-opacity-70 bg-black rounded-xl'>
					<h1 className='font-vcr text-4xl'>
						ALL SHOES ARE{' '}
						<span className='text-red-500'>70%</span> OFF
					</h1>
					<Link
						href='/shoes'
						className='flex justify-center font-vcr ml-9 w-40 hover:bg-purple-600 hover:text-cyan-400 p-3 bg-cyan-400 text-purple-600 text-xl hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
						SHOP NOW!
					</Link>
				</div>
			</div>

			<div className='w-full flex justify-center items-center mt-32'>
				<div className='sm:w-4/6 w-full h-64 flex justify-center items-center gap-5'>
					{productTypes.map((item, i) => (
						<Link
							href={`/${item.toLowerCase()}s`}
							key={i}
							className='relative cursor-pointer'>
							<Image
								src={`/assets/productImages/${item}.png`}
								alt={item}
								width={1000}
								height={1000}
							/>
							<button className='bg-black text-white p-2 absolute top-1 left-1 hover:translate-y-[-2px] transition-transform duration-100 ease-in-out'>
								{item.charAt(0).toUpperCase() +
									item.slice(1)}
								s
							</button>
						</Link>
					))}
				</div>
			</div>

			<SocialMediaSec />
		</main>
	);
}

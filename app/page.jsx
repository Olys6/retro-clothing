export default function Home() {
	return (
		<main className='h-screen'>
			{/* Banner  */}
			<div className='banner bg-white flex items-center justify-around px-5 pt-20'>
				<div className='bannerImg' />
				<div className='flex justify-center flex-col gap-5 font-bold'>
					<h1 className='font-vcr text-4xl'>
						ALL SHOES ARE{' '}
						<span className='text-red-500'>70%</span> OFF
					</h1>
					<button className='font-vcr ml-9 w-40 hover:bg-purple-600 hover:text-cyan-400 rounded-full p-3 bg-cyan-400 text-purple-600 transition-all duration-300 text-xl'>
						SHOP NOW!
					</button>
				</div>
			</div>
		</main>
	);
}

import './globals.css';
import '@styles/style.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
	title: 'Retro Clothing',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Provider>
					<Nav />
					<div className='main'>{children}</div>
				</Provider>
			</body>
		</html>
	);
}

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from '@utils/database';

connectToDB();

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],

	callbacks: {
		async session({ session }) {
			try {
				const sessionUser = await User.findOne({
					email: session.user.email,
				});

				if (sessionUser) {
					session.user.id = sessionUser._id.toString();
				}

				return session;
			} catch (error) {
				console.log(error);
			}
		},

		async signIn({ profile }) {
			try {
				let user = await User.findOne({
					email: profile.email,
				});

				if (!user) {
					user = await User.create({
						email: profile.email,
						username: profile.name
							.replace(' ', '')
							.toLowerCase(),
						image: profile.picture,
						cart: { items: [] },
					});
				}

				// Fetch the user data from the database after creating a new user
				user = await User.findOne({ email: profile.email });

				return true;
			} catch (error) {
				console.log(error);
			}
			return true;
		},
	},
});

export { handler as GET, handler as POST };

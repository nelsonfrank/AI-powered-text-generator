import './globals.css'
import { poppins, inter } from "./fonts";
import Preloader from "@/components/preloader";
import StoreProvider from "@/components/store-provider";

export const metadata = {
	title: "OpenAI Text Generator App",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Preloader />
			<StoreProvider>
				<html
					lang='en'
					className={`${poppins.variable} ${inter.variable} font-poppins`}
				>
					<body className='max-w-full mx-auto relative h-screen'>
						{children}
					</body>
				</html>
			</StoreProvider>
		</>
	);
}

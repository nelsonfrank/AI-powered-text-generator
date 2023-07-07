import './globals.css'
import { poppins, inter } from "./fonts";

export const metadata = {
	title: "OpenAI Text Generator App",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={`${poppins.variable} ${inter.variable} font-poppins`}
		>
			<body className='max-w-full mx-auto relative h-screen'>{children}</body>
		</html>
	);
}

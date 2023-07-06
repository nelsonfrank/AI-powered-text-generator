import './globals.css'
import { Poppins, Open_Sans } from "next/font/google";

const poppins = Poppins({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-poppins",
});

export const metadata = {
	title: "OpenAI Text Generator App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${poppins.variable} font-poppins`}>{children}</body>
		</html>
	);
}

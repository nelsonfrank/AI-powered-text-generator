import Image from "next/image";
import LogoImage from "../../../public/assets/distributed-logo.svg";

const AppLogo = () => {
	return (
		<div className='flex gap-4'>
			<Image src={LogoImage} alt='logo' />
			<div>
				<p className='text-primary'>Elastic Team </p>
				<p className='text-lg font-semibold'>Open AI - Text Generator</p>
			</div>
		</div>
	);
};

export default AppLogo;

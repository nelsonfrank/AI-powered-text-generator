import AppLogo from "../app-logo/app-logo";
import { SignOutIcon } from "../icons";

const Header = () => {
	return (
		<div className='py-4'>
			<div className='flex justify-between items-center w-11/12 mx-auto '>
				<div>
					<AppLogo />
				</div>
				<div>
					<SignOutIcon />
				</div>
			</div>
		</div>
	);
};

export default Header;

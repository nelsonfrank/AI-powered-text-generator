"use client";
import AppLogo from "../app-logo/app-logo";
import { SignOutIcon } from "../icons";
import { signOut } from "next-auth/react";

const Header = () => {
	return (
		<div>
			<div className=' fixed top-0 left-0 right-0 bg-white z-20'>
				<div className='flex justify-between items-center w-11/12 mx-auto py-4'>
					<div>
						<AppLogo />
					</div>
					<div onClick={() => signOut()}>
						<SignOutIcon />
					</div>
				</div>
				<div className='h-1 w-full mb-4 border-b-2 bg-white'></div>
			</div>
		</div>
	);
};

export default Header;

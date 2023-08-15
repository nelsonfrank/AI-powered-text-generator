import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// Components
import SigninForm from "./form";

const Signin = async () => {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/");
	}

	return (
		<>
			<SigninForm />
		</>
	);
};

export default Signin;

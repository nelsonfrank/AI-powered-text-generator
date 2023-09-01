"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

// Components
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AppLogo from "@/components/app-logo";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const formSchema = z.object({
	name: z.string(),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(6, { message: "Password must be of atleast 6 characters" }),
});

const SigninForm = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>();

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		// setLoading(true);

		// const res = await signIn("credentials", {
		// 	redirect: false,
		// 	email: values.email,
		// 	password: values.password,
		// 	callbackUrl,
		// }).catch((error) => {
		// 	setLoading(false);
		// 	setError("Invalid email or password");
		// });

		// setLoading(false);

		// if (res?.error) {
		// 	setError("Invalid email or password");
		// 	return;
		// }

		// router.push(callbackUrl);
	}

	return (
		<div className='flex flex-col relative mt-40 items-center min-h-screen'>
			<div className='w-full  px-4 sm:w-3/4 md:w-1/2 md:mx-auto 2xl:w-1/4'>
				<div className='mb-8'>
					<AppLogo />
				</div>
				<div className='mb-8'>
					<p className='font-bold leading-7 text-xl'>Create a new account</p>
				</div>
				{error && (
					<div className='mb-4'>
						<p className='text-red-500 py-3 px-3 bg-red-200 rounded-sm'>
							{error}
						</p>
					</div>
				)}
				<div className=''>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-slate leading-7 [&:not(:first-child)]:mt-6'>
											Username
										</FormLabel>
										<FormControl>
											<Input placeholder='Username' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-slate leading-7 [&:not(:first-child)]:mt-6'>
											Email Address
										</FormLabel>
										<FormControl>
											<Input placeholder='Email' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-slate-800 leading-7 [&:not(:first-child)]:mt-6'>
											Password
										</FormLabel>
										<FormControl>
											<Input
												placeholder='Password'
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-slate-800 leading-7 [&:not(:first-child)]:mt-6'>
											Confirm Password
										</FormLabel>
										<FormControl>
											<Input
												placeholder='Confirm Password'
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit'>Sign up</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default SigninForm;

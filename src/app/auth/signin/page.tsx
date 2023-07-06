"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import LogoImage from "../../../../public/assets/distributed-logo.svg";

const formSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(6, { message: "Password must be of atleast 6 characters" }),
});

const Signin = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<div className='flex flex-col relative mt-40 items-center min-h-screen'>
			<div className='w-full  px-4 sm:w-3/4 md:w-1/2 md:mx-auto 2xl:w-1/4'>
				<div className='flex gap-4 mb-8'>
					<Image src={LogoImage} alt='logo' />
					<div>
						<p className='text-primary'>Elastic Team </p>
						<p className='text-lg font-semibold'>Open AI - Text Generator</p>
					</div>
				</div>
				<div className='mb-8'>
					<p className='font-bold leading-7 text-xl'>
						Please log in to continue
					</p>
				</div>
				<div className=''>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
												placeholder='password'
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit'>Log In</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Signin;

"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

// Components
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const formSchema = z.object({
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
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);

		const res = await signIn("credentials", {
			redirect: false,
			email: values.email,
			password: values.password,
			callbackUrl,
		}).catch((error: any) => {
			setLoading(false);
			setError("Invalid email or password");
		});

		setLoading(false);

		if (res?.error) {
			setError("Invalid email or password");
			return;
		}

		router.push(callbackUrl);
		setError("");
	}
	return (
		<div className='flex flex-col relative mt-40 items-center min-h-screen'>
			<div className='w-full  px-4 sm:w-3/4 md:w-1/2 md:mx-auto 2xl:w-1/4'>
				<Card>
					<CardHeader className='space-y-1'>
						<CardTitle className='text-2xl'>Login to your account</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>

					<CardContent className='grid gap-4'>
						{error && (
							<div className='mb-4'>
								<p className='text-red-500 py-3 px-3 bg-red-100 rounded-sm'>
									{error}
								</p>
							</div>
						)}
						<div className='grid grid-cols-2 gap-6'>
							<Button variant='outline'>
								<Icons.gitHub className='mr-2 h-4 w-4' />
								Github
							</Button>
							<Button
								variant='outline'
								onClick={() => signIn("google", { callbackUrl })}
							>
								<Icons.google className='mr-2 h-4 w-4' />
								Google
							</Button>
						</div>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-background px-2 text-muted-foreground'>
									Or continue with
								</span>
							</div>
						</div>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-8'
							>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-slate leading-7 [&:not(:first-child)]:mt-6'>
												Email Address
											</FormLabel>
											<FormControl>
												<Input
													placeholder='Email'
													onFocus={() => setError("")}
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
												Password
											</FormLabel>
											<FormControl>
												<Input
													placeholder='password'
													type='password'
													onFocus={() => setError("")}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button className='w-full mt-4' disabled={loading}>
									{loading ? (
										<>
											<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
											Login...
										</>
									) : (
										<span>Login</span>
									)}
								</Button>
							</form>
						</Form>
					</CardContent>
					<CardFooter>
						{"Don't have an account? "}
						<Link
							href={"/auth/signup"}
							className={cn(
								buttonVariants({ variant: "ghost" }),
								"hover:bg-transparent hover:underline",
								"justify-start"
							)}
						>
							Register here
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default SigninForm;

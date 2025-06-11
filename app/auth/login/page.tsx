"use client";

import { AuthForm, type AuthFormSchema } from "@/components/auth/auth-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth/sign-in";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { z } from "zod";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values: AuthFormSchema) => {
		setLoading(true);
		setError("");

		try {
			const { data, error: signInError } = await signIn({
				email: values.email,
				password: values.password,
			});

			if (signInError) {
				setError(
					signInError.message ||
						"Login failed. Please check your email and password.",
				);
			} else if (data) {
				router.push(callbackUrl);
			}
		} catch (error) {
			console.error("Login error:", error);
			setError("An error occurred during login. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex  flex-col items-center py-24 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						Sign in to your account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AuthForm
						type="login"
						onSubmit={handleSubmit}
						error={error}
						loading={loading}
					/>

					<div className="mt-6 space-y-4">
						<div className="text-center text-sm">
							<Link
								href="/auth/reset-password"
								className="font-medium text-primary hover:text-primary/90"
							>
								Forgot password?
							</Link>
						</div>

						<div className="text-center text-sm">
							Don't have an account?{" "}
							<Link
								href="/auth/register"
								className="font-medium text-md text-primary hover:text-primary/90"
							>
								Register
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

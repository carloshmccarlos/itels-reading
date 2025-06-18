"use client";

import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { RequestResetForm } from "@/components/auth/ResetPasswordForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const [message, setMessage] = useState("");

	const isResetForm = !!token;

	const handleRequestReset = async (values: { email: string }) => {
		if (loading) return;

		setLoading(true);
		setStatus("idle");
		setMessage("");

		try {
			const { data, error } = await authClient.requestPasswordReset({
				email: values.email,
				redirectTo: "/auth/reset-password",
			});

			console.log(data);

			if (error) {
				setStatus("error");
				setMessage(
					error.message || "Failed to send reset link. Please try again.",
				);
				console.error("Reset password request failed:", error);
				return;
			}

			setStatus("success");
			setMessage("Reset password link has been sent to your email!");
		} catch (error) {
			console.error("Reset password request exception:", error);
			setStatus("error");

			// More specific error handling based on error type
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to send reset link. Please try again later.";

			setMessage(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleChangePassword = async (values: {
		password: string;
		confirmPassword: string;
	}) => {
		if (loading) return;
		
		setLoading(true);
		setStatus("idle");
		setMessage("");
		const { password, confirmPassword } = values;

		if (password !== confirmPassword) {
			setStatus("error");
			setMessage("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			const { data, error } = await authClient.resetPassword({
				newPassword: password,
				token: token || undefined,
			});

			if (error) {
				setStatus("error");
				setMessage(error.message || "Failed to reset password. Please try again.");
				console.error("Reset password failed:", error);
				return;
			}

			setStatus("success");
			setMessage("Password has been reset successfully!");
		} catch (error) {
			console.error("Reset password exception:", error);
			setStatus("error");
			
			// More specific error handling based on error type
			const errorMessage = 
				error instanceof Error
					? error.message
					: "Failed to reset password. Please try again later.";
					
			setMessage(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center  py-24 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						{isResetForm ? "Reset Your Password" : "Forgot Password"}
					</CardTitle>
					<CardDescription className="text-center">
						{isResetForm
							? "Enter your new password below"
							: "Enter your email to receive a reset link"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{status === "success" ? (
						<div className="text-center">
							<p className="text-green-600 font-semibold">{message}</p>
							<div className="mt-4">
								<Link
									href="/auth/login"
									className="font-medium text-primary hover:text-primary/90"
								>
									Back to Login
								</Link>
							</div>
						</div>
					) : isResetForm ? (
						<ChangePasswordForm
							onSubmit={handleChangePassword}
							error={status === "error" ? message : undefined}
							loading={loading}
						/>
					) : (
						<RequestResetForm
							onSubmit={handleRequestReset}
							error={status === "error" ? message : undefined}
							loading={loading}
						/>
					)}

					{status !== "success" && (
						<div className="mt-6 text-center text-sm">
							<Link
								href="/auth/login"
								className="font-medium text-primary hover:text-primary/90"
							>
								Back to Login
							</Link>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

"use client";

import {
	RequestResetForm,
	ResetPasswordForm,
} from "@/components/auth/reset-password-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
		setLoading(true);
		setStatus("idle");

		try {
			// Add logic to send reset password email
			setStatus("success");
			setMessage("Reset password link has been sent to your email!");
		} catch (error) {
			setStatus("error");
			setMessage("Failed to send reset link. Please try again later.");
			console.error("Reset password request failed:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleResetPassword = async (values: {
		password: string;
		confirmPassword: string;
	}) => {
		setLoading(true);
		setStatus("idle");

		try {
			// Add logic to reset password using token
			setStatus("success");
			setMessage("Password has been reset successfully!");
		} catch (error) {
			setStatus("error");
			setMessage("Failed to reset password. Please try again later.");
			console.error("Reset password failed:", error);
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
						<ResetPasswordForm
							onSubmit={handleResetPassword}
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

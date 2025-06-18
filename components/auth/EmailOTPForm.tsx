"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { authClient } from "@/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Schema for email OTP request form
const emailRequestSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

type EmailRequestSchema = z.infer<typeof emailRequestSchema>;

// Schema for OTP verification form
const otpVerificationSchema = z.object({
	otp: z.string().min(6, "OTP must be at least 6 characters"),
});

type OtpVerificationSchema = z.infer<typeof otpVerificationSchema>;

interface EmailOTPFormProps {
	callbackUrl?: string;
}

export function EmailOTPForm({ callbackUrl = "/" }: EmailOTPFormProps) {
	const router = useRouter();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<"request" | "verify">("request");
	const [userEmail, setUserEmail] = useState("");

	// Email request form
	const emailForm = useForm<EmailRequestSchema>({
		resolver: zodResolver(emailRequestSchema),
		defaultValues: {
			email: "",
		},
	});

	// OTP verification form
	const otpForm = useForm<OtpVerificationSchema>({
		resolver: zodResolver(otpVerificationSchema),
		defaultValues: {
			otp: "",
		},
	});

	// Handle email request submission
	const handleEmailRequest = async (values: EmailRequestSchema) => {
		setLoading(true);
		setError("");

		try {
			const { data, error: requestError } =
				await authClient.emailOtp.sendVerificationOtp({
					email: values.email,
					type: "sign-in",
				});

			if (requestError) {
				setError(
					requestError.message ||
						"Failed to send verification code. Please try again.",
				);
			} else {
				toast.success("We have sent a verification code to your email.");
				setUserEmail(values.email);
				setStep("verify");
			}
		} catch (err) {
			console.error("Email OTP request error:", err);
			setError("An error occurred. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	// Handle OTP verification submission
	const handleOTPVerification = async (values: OtpVerificationSchema) => {
		setLoading(true);
		setError("");

		try {
			const { data, error: verifyError } = await authClient.signIn.emailOtp(
				{
					email: userEmail,
					otp: values.otp,
				},
				{
					onSuccess: () => {
						router.push(callbackUrl);
					},
				},
			);

			if (verifyError) {
				setError(
					verifyError.message || "Invalid verification code. Please try again.",
				);
			}
		} catch (err) {
			console.error("OTP verification error:", err);
			setError("An error occurred. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	// Handle resend OTP
	const handleResendOTP = async () => {
		setLoading(true);
		setError("");

		try {
			const { data, error: resendError } =
				await authClient.emailOtp.sendVerificationOtp({
					email: userEmail,
					type: "sign-in",
				});

			if (resendError) {
				setError(
					resendError.message ||
						"Failed to resend verification code. Please try again.",
				);
			} else {
				toast.success("Verification code sent successfully!");
			}
		} catch (err) {
			console.error("Resend OTP error:", err);
			setError("An error occurred. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			{error && (
				<Alert variant="destructive">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{step === "request" ? (
				// Email Request Form
				<Form {...emailForm}>
					<form
						onSubmit={emailForm.handleSubmit(handleEmailRequest)}
						className="space-y-4"
					>
						<FormField
							control={emailForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your email"
											type="email"
											autoComplete="email"
											disabled={loading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Sending code..." : "Send verification code"}
						</Button>
					</form>
				</Form>
			) : (
				// OTP Verification Form
				<Form {...otpForm}>
					<form
						onSubmit={otpForm.handleSubmit(handleOTPVerification)}
						className="space-y-4"
					>
						<div className="text-center mb-4">
							<p className="text-md text-green-600">
								We have sent a verification code to your email.
							</p>
						</div>

						<FormField
							control={otpForm.control}
							name="otp"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Verification Code</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter 6-digit code"
											type="text"
											maxLength={6}
											disabled={loading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Verifying..." : "Verify and Login"}
						</Button>

						<div className="flex justify-between items-center text-sm mt-4">
							<button
								type="button"
								onClick={handleResendOTP}
								className=" hover:underline"
								disabled={loading}
							>
								Resend code
							</button>
							<button
								type="button"
								onClick={() => setStep("request")}
								className=" hover:underline"
								disabled={loading}
							>
								Change email
							</button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
}

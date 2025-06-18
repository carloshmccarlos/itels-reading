import { authClient } from "@/lib/auth/auth-client";

export async function signIn({
	email,
	password,
}: { email: string; password: string }) {
	const { data, error } = await authClient.signIn.email(
		{
			/**
			 * The user email
			 */
			email,
			/**
			 * The user password
			 */
			password,
			/**
			 * A URL to redirect to after the user verifies their email (optional)
			 */
			callbackURL: "/",
			/**
			 * remember the user session after the browser is closed.
			 * @default true
			 */
			rememberMe: true,
		},
		{
			onError: (ctx) => {
				// Handle the error
				if (ctx.error.status === 403) {
					alert("Please verify your email address");
				}

				//you can also show the original error message
			},
		},
	);

	return { data, error };
}

export async function signInWithEmailOTP({
	email,
	otp,
}: { 
	email: string; 
	otp: string;
}) {
	const { data, error } = await authClient.signIn.emailOtp({
		email,
		otp,
	});

	return { data, error };
}

export async function sendEmailOTP({
	email,
}: {
	email: string;
}) {
	const { data, error } = await authClient.emailOtp.sendVerificationOtp({
		email,
		type: "sign-in",
	});

	return { data, error };
}

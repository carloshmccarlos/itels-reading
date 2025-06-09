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
			//callbacks
		},
	);

	return { data, error };
}

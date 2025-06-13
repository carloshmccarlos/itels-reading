import { authClient } from "@/lib/auth/auth-client";

import { toast } from "sonner";

export async function signUp({
	email,
	password,
	name,
	image,
}: {
	email: string;
	password: string;
	name: string;
	image?: string;
}) {
	const { data, error } = await authClient.signUp.email(
		{
			email,
			password,
			name,
			image,
			callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
		},
		{
			onRequest: (ctx) => {
				//show loading
			},
			onSuccess: (ctx) => {
				toast.success("Verification email has been sent!");
			},
			onError: (ctx) => {
				// display the error message
				alert(ctx.error.message);
			},
		},
	);

	return { data, error };
}

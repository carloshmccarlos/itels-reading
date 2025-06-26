import {
	customSessionClient,
	emailOTPClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const authClient = createAuthClient({
	fetchOptions: {
		onError: async (context) => {
			const { response } = context;
			if (response.status === 429) {
				const retryAfter = response.headers.get("X-Retry-After");
				console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
			}
		},
	},
	plugins: [emailOTPClient(), customSessionClient<typeof auth>()],
});

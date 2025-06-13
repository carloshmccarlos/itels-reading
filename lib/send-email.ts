import { Resend } from "resend";

interface Props {
	to: string;
	subject: string;
	text: string;
}

// Make sure to use a default value or throw a clear error if the API key is missing
export async function sendEmail({ to, subject, text }: Props) {
	const resendAPI = process.env.RESEND_API || "";

	if (!resendAPI) {
		console.error("Error: RESEND_API environment variable is not set");
		// You might want to throw an error here depending on your requirements
	}

	console.log(
		"RESEND_API value:",
		resendAPI ? "API key is set" : "API key is missing",
	);

	const resend = new Resend(resendAPI);

	// Only send the email if we have a valid API key
	if (resendAPI) {
		await resend.emails
			.send({
				from: "email@ielts-read.space",
				to: to,
				subject: subject,
				html: text,
			})
			.then((response) => console.log("Email sent:", response))
			.catch((error) => console.error("Failed to send email:", error));
	}
}

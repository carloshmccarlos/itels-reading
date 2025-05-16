import { Button } from "@/components/ui/button";

function LoginButton() {
	const buttonBaseStyles = "text-lg font-bold rounded-none cursor-pointer";
	return (
		<Button
			size="lg"
			variant="ghost"
			className={`${buttonBaseStyles} bg-white text-black hover:bg-black hover:text-white`}
		>
			Sign In
		</Button>
	);
}

export default LoginButton;

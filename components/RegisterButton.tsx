import { Button } from "@/components/ui/button";

function RegisterButton() {
	const buttonBaseStyles = "text-lg font-bold rounded-none cursor-pointer";
	return (
		<Button
			size="lg"
			className={`${buttonBaseStyles} border-black  bg-black text-white hover:text-black hover:bg-gray-100 hover:border-2`}
		>
			Register
		</Button>
	);
}

export default RegisterButton;

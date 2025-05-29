import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateToPath(name: string): string {
	return name.toLowerCase().replaceAll(" ", "-");
}

// transform category name from string-string to String String
export function transformCategoryName(name: string): string {
	return name
		.split("-")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

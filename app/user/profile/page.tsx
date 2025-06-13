"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserWithCounts {
	id: string;
	name: string | null;
	email: string;
	image: string | null;
	createdAt: string;
	_count: {
		MarkedArticles: number;
		ReadedTimeCount: number;
	};
}

interface ProfileData {
	user: UserWithCounts;
	totalReadTimes: number;
	session: {
		user: {
			id: string;
			name: string;
			email: string;
			image?: string;
		};
	};
}

export default function ProfilePage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [profileData, setProfileData] = useState<ProfileData | null>(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await fetch("/api/user/profile");

				if (!response.ok) {
					if (response.status === 401) {
						router.push("/auth/login");
						return;
					}
					throw new Error(`Error ${response.status}: ${response.statusText}`);
				}

				const data = await response.json();
				setProfileData(data);
			} catch (err) {
				console.error("Failed to fetch profile data:", err);
				setError(
					err instanceof Error ? err.message : "Failed to load profile data",
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfileData().then();
	}, [router]);

	// Show loading state
	if (isLoading) {
		return (
			<div className="container mx-auto py-10 px-4 md:px-8 flex justify-center">
				<p>Loading profile...</p>
			</div>
		);
	}

	// Show error state
	if (error || !profileData) {
		return (
			<div className="container mx-auto py-10 px-4 md:px-8">
				<h1 className="text-3xl font-bold mb-8">Error</h1>
				<p className="text-red-500">{error || "Failed to load profile data"}</p>
				<Button onClick={() => router.refresh()} className="mt-4">
					Try Again
				</Button>
			</div>
		);
	}

	const { user, totalReadTimes } = profileData;

	// Get user initials for avatar fallback
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((part) => part[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const userInitials = getInitials(user.name || "User");
	const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="container mx-auto py-10 px-4 md:px-8">
			<h1 className="text-3xl font-bold mb-8">My Profile</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Profile Card */}
				<Card className="col-span-1">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Avatar className="h-24 w-24">
								<AvatarImage src={user.image || ""} alt={user.name || "User"} />
								<AvatarFallback className="text-2xl">
									{userInitials}
								</AvatarFallback>
							</Avatar>
						</div>
						<CardTitle className="text-xl">{user.name}</CardTitle>
						<CardDescription>{user.email}</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex justify-between">
							<span className="text-sm text-gray-500">Member since</span>
							<span className="text-sm font-medium">{joinDate}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-gray-500">Marked articles</span>
							<span className="text-sm font-medium">
								{user._count.MarkedArticles}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-gray-500">Articles read</span>
							<span className="text-sm font-medium">
								{user._count.ReadedTimeCount}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-gray-500">Total read times</span>
							<span className="text-sm font-medium">{totalReadTimes}</span>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							onClick={() =>
								authClient.signOut({
									fetchOptions: {
										onSuccess: () => {
											router.push("/");
										},
									},
								})
							}
							variant="outline"
							className="w-full cursor-pointer"
							type="submit"
						>
							Sign Out
						</Button>
					</CardFooter>
				</Card>

				{/* Settings Card */}
				<Card className="col-span-1 md:col-span-2">
					<CardHeader>
						<CardTitle>Account Settings</CardTitle>
						<CardDescription>Update your profile information</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="name">Display Name</Label>
							<Input id="name" defaultValue={user.name || ""} disabled />
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								defaultValue={user.email}
								disabled
							/>
							<p className="text-xs text-gray-500 mt-1">
								Email cannot be changed
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="avatar">Profile Picture</Label>
							<div className="flex items-center gap-4">
								<Avatar>
									<AvatarImage
										src={user.image || ""}
										alt={user.name || "User"}
									/>
									<AvatarFallback>{userInitials}</AvatarFallback>
								</Avatar>
								{/*<Button variant="outline" disabled>
									Change Avatar
								</Button>*/}
							</div>
							<p className="text-xs text-gray-500 mt-1">
								Avatar is managed by your authentication provider
							</p>
						</div>
					</CardContent>
					{/*<CardFooter className="flex justify-between">
						<Button variant="outline" disabled>
							Cancel
						</Button>
						<Button disabled>Save Changes</Button>
					</CardFooter>*/}
				</Card>
			</div>
		</div>
	);
}

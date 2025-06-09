"use client";

import { signIn } from "@/lib/auth/sign-in";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { data, error: signInError } = await signIn({ email, password });

			if (signInError) {
				setError(signInError.message || "登录失败，请检查您的邮箱和密码");
			} else if (data) {
				// 登录成功，重定向到回调URL或仪表板
				router.push(callbackUrl);
			}
		} catch (error) {
			console.error("登录失败:", error);
			setError("登录过程中发生错误，请稍后再试");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
						登录您的账户
					</h2>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className="rounded-md bg-red-50 p-4">
							<div className="text-sm text-red-700">{error}</div>
						</div>
					)}

					<div className="-space-y-px rounded-md shadow-sm">
						<div>
							<label htmlFor="email" className="sr-only">
								电子邮箱
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
								placeholder="电子邮箱"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								密码
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
								placeholder="密码"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm">
							<Link
								href="/auth/reset-password"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								忘记密码?
							</Link>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
						>
							{loading ? "登录中..." : "登录"}
						</button>
					</div>
				</form>

				<div className="text-center">
					<p className="text-sm text-gray-600">
						没有账户？{" "}
						<Link
							href="/auth/register"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							注册
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

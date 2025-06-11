"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [status, setStatus] = useState<"loading" | "success" | "error">(
		"loading",
	);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!token) {
			setStatus("error");
			setMessage("验证令牌缺失");
			return;
		}

		// 这里添加验证邮箱的逻辑
		// 模拟验证过程
		setTimeout(() => {
			setStatus("success");
			setMessage("邮箱验证成功！");
		}, 1500);
	}, [token]);

	return (
		<div className="flex min-h-screen flex-col items-center  py-24 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
						邮箱验证
					</h2>
				</div>

				<div className="text-center">
					{status === "loading" && (
						<p className="text-gray-600">正在验证您的邮箱...</p>
					)}

					{status === "success" && (
						<>
							<p className="text-green-600 font-semibold">{message}</p>
							<div className="mt-4">
								<Link
									href="/auth/login"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									前往登录
								</Link>
							</div>
						</>
					)}

					{status === "error" && (
						<>
							<p className="text-red-600 font-semibold">{message}</p>
							<div className="mt-4">
								<Link
									href="/"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									返回首页
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

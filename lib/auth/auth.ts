import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { useRouter } from 'next/router'

// 创建认证处理程序
export const auth = betterAuth({
	// 数据库适配器
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	
	// 邮箱密码认证配置
	emailAndPassword: {
		enabled: true,
		verification: {
			required: true,
			expiresIn: 86400, // 24小时（秒）
		},
	},
	
	// 社交登录提供商
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
			scope: ["user:email"],
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			scope: ["profile", "email"],
		},
	},
	
	// 会话配置
	session: {
		maxAge: 30 * 24 * 60 * 60, // 30天（秒）
		updateAge: 24 * 60 * 60, // 24小时（秒）
		cookieName: "auth.session",
		cookieOptions: {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			secure: process.env.NODE_ENV === "production",
		},
	},
	
	// 页面和路由配置
	pages: {
		signIn: "/auth/login",
		signUp: "/auth/register",
		error: "/auth/error",
		verifyEmail: "/auth/verify-email",
		resetPassword: "/auth/reset-password",
	},
});


